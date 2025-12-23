import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SlSocialYoutube, SlLocationPin } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

function OrderSummary() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totalMRP, setTotalMRP] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    let mrp = 0;
    let total = 0;

    savedCart.forEach((item) => {
      const quantity = Number(item.quantity ?? 1);
      const price = Number(item.sp ?? item.price ?? 0);
      const itemMRP = Number(item.MRP ?? item.mrp ?? item.price ?? 0);
      total += price * quantity;
      mrp += itemMRP * quantity;
    });

    setTotalMRP(mrp);
    setTotalAmount(total);
    setTotalSaving(mrp - total);
  }, []);

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen gap-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Order Summary
      </h1>
      <div className="space-y-4">
        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => {
            const price = Number(item.sp ?? item.price ?? 0);
            const qty = Number(item.quantity ?? 1);
            const totalItemPrice = price * qty;

            return (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-white rounded-xl shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.des || "Product"}
                    className="w-28 h-28 rounded-lg object-cover border"
                    onError={(e) =>
                      (e.target.src = "/pictures/placeholder.png")
                    }
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {item.des || "Unnamed Product"}
                    </p>

                    {item.size && (
                      <p className="text-sm text-gray-500">
                        Size: <span className="font-semibold">{item.size}</span>
                      </p>
                    )}

                    <p className="text-sm text-gray-500">
                      Quantity:{" "}
                      <span className="font-semibold text-gray-800">{qty}</span>
                    </p>

                    <p className="text-sm text-gray-500">
                      Price per item: ₹{price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-gray-800 font-medium text-lg">
                  ₹{totalItemPrice.toFixed(2)}
                </div>
              </div>
            );
          })
        )}
      </div>
      {cart.length > 0 && (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-3 mt-6 self-center">
          <h2 className="font-semibold text-gray-800 text-xl text-center">
            Bill Summary
          </h2>
          <div className="flex justify-between text-gray-700 font-medium">
            <span>MRP</span>
            <span>₹{totalMRP.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-700 font-medium">
            <span>Total Savings</span>
            <span>₹{totalSaving.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-lg border-t pt-2">
            <span>Total Amount Paid</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
      <button
        className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition self-center mt-4"
        onClick={() => navigate("/menu")}
      >
        Choose Your Menu
      </button>
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
export default OrderSummary;
