import React, { useState, useEffect } from "react";
import ResData from "./ResData";
import fl from "./pictures/fl.png";
import bg from "./pictures/bg.png";
import pl from "./pictures/pl.png";
import { FaInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SlSocialYoutube, SlLocationPin } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline, MdDelete } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

function Menu() {
  const navigate = useNavigate();
  const [dish, setDish] = useState(ResData);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [grandtotal, setGrandTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWeight, setSelectedWeight] = useState({});
  const [selectedVolumes, setSelectedVolumes] = useState({});   
  const soupPrices = {
    1: { 1: { mrp: 80, sp: 70 }, 2: { mrp: 130, sp: 110 }, 4: { mrp: 250, sp: 120 } },
    2: { 1: { mrp: 70, sp: 55 }, 2: { mrp: 130, sp: 100 }, 4: { mrp: 250, sp: 180 } },
    3: { 1: { mrp: 60, sp: 50 }, 2: { mrp: 110, sp: 90 }, 4: { mrp: 210, sp: 160 } },
  };

  const weightPrice = {
    maindish: { 500: { mrp: 300, sp: 280 }, 1000: { mrp: 450, sp: 380 } },
    sweet: { 500: { mrp: 300, sp: 280 }, 1000: { mrp: 500, sp: 420 } },
    pizza: { 500: { mrp: 200, sp: 180 }, 1000: { mrp: 350, sp: 300 } },
    burger: { 300: { mrp: 160, sp: 140 }, 400: { mrp: 200, sp: 150 } },
    "french fries": { 200: { mrp: 110, sp: 90 }, 400: { mrp: 200, sp: 160 } },
  };
  const defaultWeight = {
    maindish: 500,
    sweet: 500,
    pizza: 500,
    burger: 300,
    "french fries": 200,
  };
  const weightOptions = {
    maindish: [
      { value: 500, label: "500 g" },
      { value: 1000, label: "1 kg" },
    ],
    sweet: [
      { value: 500, label: "500 g" },
      { value: 1000, label: "1 kg" },
    ],
    pizza: [
      { value: 500, label: "500 g" },
      { value: 1000, label: "1 kg" },
    ],
    burger: [
      { value: 300, label: "300 g" },
      { value: 400, label: "400 g" },
    ],
    "french fries": [
      { value: 200, label: "200 g" },
      { value: 400, label: "400 g" },
    ],
  };

  useEffect(() => {
    const initialWeights = {};
    ResData.forEach((item) => {
      if (item.cat?.toLowerCase() !== "soup") {
        initialWeights[item.id] = defaultWeight[item.cat?.toLowerCase()] || 250;
      }
    });
    setSelectedWeight(initialWeights);
  }, []);
  const filteredDishes =
    selectedCategory === "All"
      ? dish
      : dish.filter((dish) => dish.cat.toLowerCase() === selectedCategory.toLowerCase());

  const saveToFirebase = async (item) => {
    const discount = Math.max(0, item.mrp - item.sp);
    try {
      await setDoc(doc(db, "cartItems", item.id.toString()), {
        id: item.id,
        name: item.des,
        category: item.cat,
        quantity: item.quantity,
        mrp: item.mrp,
        sp: item.sp,
        discount: discount,
        totalSP: item.sp * item.quantity,
        totalDiscount: discount * item.quantity,
        weight: item.weight || null,
        volume: item.volume || null,
        image: item.img,
        timestamp: new Date().toISOString(),
      });
      console.log(" Item saved to Firestore");
    } catch (err) {
      console.error(" Firestore save error:", err);
    }
  };


  const handleAdd = (res) => {
    const isSoup = res.cat.toLowerCase() === "soup";
    const volume = selectedVolumes[res.id] || 1;
    const weight = selectedWeight[res.id] || 250;
    const priceData = isSoup
      ? soupPrices[res.id]?.[volume]
      : weightPrice[res.cat.toLowerCase()]?.[weight];

    const mrp = priceData?.mrp || res.MRP;
    const sp = priceData?.sp || res.sp;

    const existingItem = cart.find((item) => item.id === res.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === res.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...res, quantity: 1, mrp, sp, weight, volume }];
    }

    setCart(updatedCart);
    setQuantities((prev) => ({ ...prev, [res.id]: (prev[res.id] || 0) + 1 }));

    saveToFirebase({
      ...res,
      quantity: (quantities[res.id] || 0) + 1,
      mrp,
      sp,
      weight: isSoup ? null : weight,
      volume: isSoup ? volume : null,
    });
  };

  const handleDecrement = async (res) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === res.id);
      if (!existingItem) return prevCart;

      if (existingItem.quantity > 1) {
        const updated = prevCart.map((item) =>
          item.id === res.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        saveToFirebase({ ...existingItem, quantity: existingItem.quantity - 1 });
        return updated;
      } else {
        deleteDoc(doc(db, "cartItems", res.id.toString()));
        return prevCart.filter((item) => item.id !== res.id);
      }
    });

    setQuantities((prev) => {
      const currentQty = prev[res.id] || 0;
      if (currentQty <= 1) {
        const { [res.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [res.id]: currentQty - 1 };
    });
  };

  const handleIncrement = (res) => {
    const isSoup = res.cat.toLowerCase() === "soup";
    const volume = selectedVolumes[res.id] || 1;
    const weight = selectedWeight[res.id] || 250;
    const priceData = isSoup
      ? soupPrices[res.id]?.[volume]
      : weightPrice[res.cat.toLowerCase()]?.[weight];

    const mrp = priceData?.mrp || res.MRP;
    const sp = priceData?.sp || res.sp;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === res.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    setQuantities((prev) => ({ ...prev, [res.id]: (prev[res.id] || 0) + 1 }));

    saveToFirebase({
      ...res,
      quantity: (quantities[res.id] || 0) + 1,
      mrp,
      sp,
      weight: isSoup ? null : weight,
      volume: isSoup ? volume : null,
    });
  };

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.sp * item.quantity, 0);
    setGrandTotal(total);
  }, [cart]);

  const handleVolumeChange = (id, value) => {
    setSelectedVolumes((prev) => ({ ...prev, [id]: Number(value) }));
  };

  return (
    <div className=" bg-pink-200 h-auto">
  
<div className="relative p-3 sm:p-4">

  {/* Cart + Price */}
  <div className="absolute top-3 right-3 flex items-center gap-3 
                  sm:top-5 sm:right-5
                  md:top-8 md:right-10">

    <IoCart
      className="text-xl sm:text-2xl md:text-3xl cursor-pointer"
      onClick={() => navigate("/cart", { state: { cart, grandtotal } })}
    />

    <span className="bg-white px-1.5 py-0.5 text-xs sm:text-sm md:text-lg 
                     font-bold rounded shadow">
      ₹{grandtotal}
    </span>
  </div>

  {/* Title */}
  <h1 className="text-center text-xl sm:text-2xl md:text-3xl 
                 font-bold mt-10 sm:mt-12">
    Special / Featured Dishes
  </h1>

  {/* Subtitle */}
  <p className="text-center mt-2 text-sm sm:text-base md:text-xl">
    Chef creation — unique flavour and culinary delight awaits!
  </p>

</div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
  {["All", "Soup", "Maindish", "Sweet", "Pizza", "Burger", "French Fries"].map(
    (cat) => (
      <button
        key={cat}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold 
        text-sm sm:text-lg transition-all duration-300
        ${
          selectedCategory.toLowerCase() === cat.toLowerCase()
            ? "bg-white text-black"
            : "bg-white text-black hover:bg-pink-400 hover:text-white"
        }`}
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </button>
    )
  )}
</div>

      <div className="flex flex-wrap gap-8 justify-center mt-4">
        {filteredDishes.map((res) => {
          const isSoup = res.cat?.toLowerCase() === "soup";
          const selectedVolume = selectedVolumes[res.id] || 1;
          const selectedW = selectedWeight[res.id] || 250;
          const priceData = isSoup
            ? soupPrices[res.id]?.[selectedVolume]
            : weightPrice[res.cat?.toLowerCase()]?.[selectedW];
          const sp = priceData?.sp || res.sp;
          const mrp = priceData?.mrp || res.MRP;
          const discount = Math.max(0, mrp - sp);

          return (
            <div key={res.id} className="bg-white rounded-2xl shadow-md p-4 w-80 flex flex-col items-center">
              <img className="h-48 w-full object-cover rounded-md" src={res.img} alt="" />
              <p className="text-base font-semibold mt-2">Description: {res.des}</p>

              {isSoup ? (
                <p className="text-lg font-semibold text-gray-700">Volume: {selectedVolume}L</p>
              ) : (
                <p className="text-lg font-semibold text-gray-700">Gram: {selectedW} g</p>
              )}

              <div className="flex mt-2">
                <p className="mt-4 pr-12 font-semibold">
                  MRP <br />
                  <span className="line-through text-gray-400">₹{mrp}</span>
                </p>
                <p className="mt-4 font-semibold text-gray-700">
                  SP <br /> ₹{sp}
                </p>
                <div className="mt-4 pt-2 ml-12 bg-green-100 text-center font-bold rounded w-14 text-sm">
                  <p>{discount}</p>
                  <p>off</p>
                </div>
              </div>
              {isSoup ? (
                <select
                  className="mt-3 bg-slate-100 p-2 rounded w-44"
                  value={selectedVolume}
                  onChange={(e) => handleVolumeChange(res.id, e.target.value)}
                >
                  {[1, 2, 4].map((vol) => (
                    <option key={vol} value={vol}>
                      {vol} Litre (₹{soupPrices[res.id]?.[vol]?.sp})
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  className="mt-3 bg-slate-100 p-2 rounded w-44"
                  value={selectedWeight[res.id] || ""}
                  onChange={(e) =>
                    setSelectedWeight((prev) => ({
                      ...prev,
                      [res.id]: Number(e.target.value),
                    }))
                  }
                >
                  {(weightOptions[res.cat?.toLowerCase()] || []).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} (₹{weightPrice[res.cat?.toLowerCase()]?.[opt.value]?.sp})
                    </option>
                  ))}
                </select>
              )}
              {quantities[res.id] ? (
                <div className="mt-3 flex items-center gap-3">
                  {quantities[res.id] <= 1 ? (
                    <button
                      onClick={() => handleDecrement(res)}
                      className="bg-red-700 px-3 py-1 rounded text-white text-lg"
                    >
                      <MdDelete className="h-7" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDecrement(res)}
                      className="bg-red-500 px-3 py-1 rounded text-white text-lg"
                    >
                      -
                    </button>
                  )}
                  <span className="text-lg font-bold">{quantities[res.id]}</span>
                  <button
                    onClick={() => handleIncrement(res)}
                    className="bg-green-500 px-3 py-1 rounded text-white text-lg"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="mt-3 px-4 py-2 bg-pink-500 rounded hover:bg-pink-300 text-white font-bold"
                  onClick={() => handleAdd(res)}
                >
                  {/* {res.btn} */}
                  Add to cart
                </button>
              )}
            </div>
          );
        })}
      </div>
            <br/>
            <div className="bg-black text-white w-full py-10">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            
                {/* ---- Contact Us ---- */}
                <div className="text-center md:text-left">
                  <h1 className="font-bold text-xl">Contact Us</h1>
            
                  <p className="text-lg mt-3 flex justify-center md:justify-start items-center gap-2">
                    <SlLocationPin /> Location
                  </p>
            
                  <p className="text-lg mt-2 flex justify-center md:justify-start items-center gap-2">
                    <FiPhoneCall /> Call +01 1234567890
                  </p>
            
                  <p className="text-lg mt-2 flex justify-center md:justify-start items-center gap-2">
                    <MdOutlineMailOutline /> demo@gmail.com
                  </p>
                </div>
            
                {/* ---- Middle Branding ---- */}
                <div className="text-center">
                  <h1 className="text-xl font-bold">Feane</h1>
            
                  <p className="mt-3">
                    Necessary, making this the first true generator  
                    on the Internet. It uses a dictionary of over 200  
                    Latin words, combined with.
                  </p>
            
                  <div className="flex justify-center gap-4 mt-4">
                    <FaInstagram className="text-2xl" />
                    <BsLinkedin className="text-2xl" />
                    <BiLogoFacebookCircle className="text-3xl" />
                    <AiFillTwitterCircle className="text-3xl" />
                    <SlSocialYoutube className="text-3xl" />
                  </div>
                </div>
            
                {/* ---- Opening Hours ---- */}
                <div className="text-center md:text-left ">
                  <h1 className="font-bold text-xl">Opening Hours</h1>
                  <p className="text-lg mt-3">Everyday</p>
                  <p className="text-lg">10.00 AM - 10.00 PM</p>
                </div>
              </div>
            </div>
    </div>
  );
}

export default Menu;
