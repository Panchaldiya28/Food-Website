// import React, { useState, useEffect } from 'react';
// import cartfood from './pictures/cartfood.png';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { MdDelete } from "react-icons/md";
// import { FaInstagram } from "react-icons/fa6";
// import { BsLinkedin } from "react-icons/bs";
// import { BiLogoFacebookCircle } from "react-icons/bi";
// import { AiFillTwitterCircle } from "react-icons/ai";
// import { SlSocialYoutube, SlLocationPin } from "react-icons/sl";
// import { FiPhoneCall } from "react-icons/fi";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase"; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Cart() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [cart, setCart] = useState(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     return location.state?.cart || savedCart;
//   });

//   const [grandTotal, setGrandTotal] = useState(0);
//   const [saving, setSaving] = useState(0);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   const getItemPrice = (item) => Number(item.sp ?? item.price ?? 0);
//   const getItemMRP = (item) => Number(item.MRP ?? item.mrp ?? item.price ?? 0);
//   const getItemQuantity = (item) => Number(item.quantity ?? 1);

//   const calculateTotals = (items) => {
//     let total = 0;
//     let saving = 0;
//     items.forEach(item => {
//       const price = getItemPrice(item);
//       const mrp = getItemMRP(item);
//       const quantity = getItemQuantity(item);
//       total += price * quantity;
//       const itemSaving = mrp - price;
//       saving += itemSaving > 0 ? itemSaving * quantity : 0;
//     });
//     return { total, saving };
//   };

//   useEffect(() => {
//     const { total, saving } = calculateTotals(cart);
//     setGrandTotal(total);
//     setSaving(saving);
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const handleSizeChange = (id, newSize) => {
//     const updatedCart = cart.map(item =>
//       item.id === id
//         ? {
//             ...item,
//             size: newSize,
//             sp: Number(item.priceOptions?.[newSize] ?? item.sp ?? 0),
//             MRP: Number(item.mrpOptions?.[newSize] ?? item.priceOptions?.[newSize] ?? item.MRP ?? 0)
//           }
//         : item
//     );
//     setCart(updatedCart);
//   };

//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return; 
//     const updatedCart = cart.map(item =>
//       item.id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(updatedCart);
//   };

//   const deleteItem = (id) => {
//     const updatedCart = cart.filter(item => item.id !== id);
//     setCart(updatedCart);
//   };

//   const handleCheckout = () => {
//     if (!user) {
//       toast.warning(" Please login first!", {
//         position: "top-center",
//         autoClose: 2500,
//         theme: "colored"
//       });
//       setTimeout(() => navigate("/sign"), 2800);
//       return;
//     }
//     navigate('/checkout', { state: { cart } });
//   };

//   return (
//     <div className="bg-slate-200 min-h-screen">
//       <ToastContainer />

//       <div className="p-6">
//         {cart.length === 0 ? (
//           <div className="text-center">
//             <img src={cartfood} alt="Empty Cart" className="mx-auto h-96" />
//             <h1 className="text-2xl font-bold mt-4">No items in your cart</h1>
//             <p className="text-xl">
//               Browse from our wide variety <br /> of products and exciting offers
//             </p>
//             <button
//               className="bg-slate-400 text-white w-32 mt-4 font-bold text-lg rounded"
//               onClick={() => navigate('/menu')}
//             > Add menu </button>
//           </div>
//         ) : (
//           <div className="flex flex-col md:flex-row md:justify-between gap-6">
//             <div className="flex-1 space-y-4">
//               {cart.map(item => {
//                 const itemPrice = (item.sp ?? item.price ?? 0) * getItemQuantity(item);
//                 const itemMRP = (item.MRP ?? item.mrp ?? item.price ?? 0) * getItemQuantity(item);
//                 const itemSaving = itemMRP > itemPrice ? itemMRP - itemPrice : 0;

//                 return (
//                   <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
//                     <div className="flex items-center gap-4">
//                       <img src={item.img} alt={item.des} className="h-40 w-40 object-cover rounded" />
//                       <div className="border rounded p-4 mb-4 flex-1">
//                         <div className="flex justify-between items-start gap-6">
//                           <div className="flex flex-col gap-2 flex-1">
//                             <h2 className="font-bold text-lg">{item.des}</h2>
//                             <select
//                               value={item.size || ""}
//                               onChange={(e) => handleSizeChange(item.id, e.target.value)}
//                               className="border rounded px-2 py-1 w-28"
//                             >
//                               {item.priceOptions
//                                 ? Object.keys(item.priceOptions).map(size => (
//                                     <option key={size} value={size}>{size}</option>
//                                   ))
//                                 : <option value="">Default</option>}
//                             </select>
//                           </div>
//                           <div className="flex flex-col items-center gap-2">
//                             <p className="text-lg font-bold">No of items:</p>
//                             <div className="flex items-center gap-2">
//                               <button
//                                 className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 disabled={item.quantity <= 1}
//                               >-</button>
//                               <span className="font-semibold">{item.quantity}</span>
//                               <button
//                                 className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               >+</button>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-4">
//                             <p className="text-lg font-semibold">
//                               You Pay: <br /> ₹{itemPrice}
//                             </p>
//                             {itemSaving > 0 && (
//                               <p className="font-semibold text-lg text-green-600">
//                                 You Save: <br />₹{itemSaving}
//                               </p>
//                             )}
//                             <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700">
//                               <MdDelete size={24} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="w-full md:w-80 p-4 bg-white rounded shadow border-l-4 h-fit flex flex-col">
//               <h1 className="font-bold text-xl mb-3">Price Summary</h1>
//               <div className="border-b-2 border-gray-400 mb-2"></div>

//               <div className="flex justify-between mb-2">
//                 <span className="text-lg">Items</span>
//                 <span className="text-lg font-bold">{cart.length}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-lg font-bold">Total cart</span>
//                 <span className="text-lg font-bold text-blue-600">₹{grandTotal}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-lg font-bold">Saving</span>
//                 <span className="text-lg font-bold text-green-600">₹{saving}</span>
//               </div>

//               <button
//                 className="bg-blue-600 text-white text-lg font-bold rounded w-full py-2 hover:bg-blue-700 transition mt-4"
//                 onClick={handleCheckout}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="bg-black text-white h-64 p-12 w-full mt-12">
//         <div className="flex justify-between">
//           <div className="w-1/3 pl-12">
//             <h1 className="font-bold text-xl mt-2">Contact Us</h1>
//             <p className="text-lg mt-2 flex items-center gap-2">
//               <SlLocationPin /> location
//             </p>
//             <p className="text-lg mt-2 flex items-center gap-2">
//               <FiPhoneCall /> Call +01 1234567890
//             </p>
//             <p className="text-lg mt-2 flex items-center gap-2">
//               <MdOutlineMailOutline /> demo@gmail.com
//             </p>
//           </div>
//           <div className="w-1/3">
//             <h1 className="text-center text-xl font-bold">Feane</h1>
//             <p className="mt-2 text-center">
//               Necessary, making this the first true generator
//               <br />
//               on the Internet. It uses a dictionary of over 200
//               <br />
//               Latin words, combined with.
//             </p>
//             <div className="flex justify-center gap-3 mt-2">
//               <FaInstagram className="text-2xl" />
//               <BsLinkedin className="text-2xl" />
//               <BiLogoFacebookCircle className="text-3xl" />
//               <AiFillTwitterCircle className="text-3xl" />
//               <SlSocialYoutube className="text-3xl" />
//             </div>
//           </div>
//           <div className="w-1/3 pl-12">
//             <h1 className="font-bold text-xl mt-2">Opening Hours</h1>
//             <p className="text-lg mt-2">Everyday</p>
//             <p className="text-lg">10.00 Am -10.00 Pm</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;
import React, { useState, useEffect } from "react";
import cartfood from "./pictures/cartfood.png";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SlSocialYoutube, SlLocationPin } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return location.state?.cart || savedCart;
  });

  const [grandTotal, setGrandTotal] = useState(0);
  const [saving, setSaving] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const calculateTotals = (items) => {
    let total = 0;
    let save = 0;
    items.forEach((item) => {
      const price = Number(item.sp ?? item.price ?? 0);
      const mrp = Number(item.MRP ?? item.mrp ?? item.price ?? 0);
      const qty = Number(item.quantity ?? 1);
      total += price * qty;
      if (mrp > price) save += (mrp - price) * qty;
    });
    return { total, save };
  };

  useEffect(() => {
    const { total, save } = calculateTotals(cart);
    setGrandTotal(total);
    setSaving(save);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const deleteItem = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const handleCheckout = () => {
    if (!user) {
      toast.warning("Please login first!", { position: "top-center" });
      setTimeout(() => navigate("/sign"), 2500);
      return;
    }
    navigate("/checkout", { state: { cart } });
  };

  return (
    <div className="bg-slate-200 min-h-screen w-full overflow-x-hidden">
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {cart.length === 0 ? (
          <div className="text-center">
            <img
              src={cartfood}
              className="mx-auto h-52 sm:h-72 md:h-96"
              alt="empty"
            />
            <h1 className="text-xl sm:text-2xl font-bold mt-4">
              No items in your cart
            </h1>
            <p className="text-sm sm:text-lg">
              Browse from our wide variety of products
            </p>
            <button
              className="bg-slate-500 text-white px-6 py-2 mt-4 rounded"
              onClick={() => navigate("/menu")}
            >
              Add Menu
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* CART ITEMS */}
            <div className="flex-1 space-y-4">
              {cart.map((item) => {
                const price = (item.sp ?? item.price) * item.quantity;
                const mrp = (item.MRP ?? item.mrp ?? item.price) * item.quantity;
                const save = mrp > price ? mrp - price : 0;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded shadow p-4 flex flex-col sm:flex-row gap-4"
                  >
                    <img
                      src={item.img}
                      className="h-28 w-28 sm:h-32 sm:w-32 rounded object-cover mx-auto sm:mx-0"
                      alt=""
                    />

                    <div className="flex-1">
                      <h2 className="font-bold text-lg">{item.des}</h2>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          className="px-3 py-1 bg-gray-300 rounded"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-1 bg-gray-300 rounded"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <p className="font-semibold">₹{price}</p>
                          {save > 0 && (
                            <p className="text-green-600 text-sm">
                              You save ₹{save}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-500"
                        >
                          <MdDelete size={22} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PRICE SUMMARY */}
            <div className="w-full lg:w-80 bg-white rounded shadow p-4 h-fit">
              <h1 className="font-bold text-xl mb-3">Price Summary</h1>
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Total</span>
                <span className="text-blue-600">₹{grandTotal}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Savings</span>
                <span className="text-green-600">₹{saving}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="bg-black text-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h1 className="font-bold">Contact Us</h1>
            <p className="flex justify-center md:justify-start gap-2 mt-2">
              <SlLocationPin /> Location
            </p>
            <p className="flex justify-center md:justify-start gap-2">
              <FiPhoneCall /> +01 1234567890
            </p>
            <p className="flex justify-center md:justify-start gap-2">
              <MdOutlineMailOutline /> demo@gmail.com
            </p>
          </div>

          <div>
            <h1 className="font-bold">Feane</h1>
            <p className="text-sm mt-2">
              Necessary, making this the first true generator.
            </p>
            <div className="flex justify-center gap-3 mt-3 text-xl">
              <FaInstagram />
              <BsLinkedin />
              <BiLogoFacebookCircle />
              <AiFillTwitterCircle />
              <SlSocialYoutube />
            </div>
          </div>

          <div>
            <h1 className="font-bold">Opening Hours</h1>
            <p>Everyday</p>
            <p>10:00 AM – 10:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
