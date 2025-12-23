import React, { useState, useEffect } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import delivery from "./pictures/delivery.png";
import home from "./pictures/home.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return location.state?.cart || savedCart;
  });

  const [totalMRP, setTotalMRP] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);

  useEffect(() => {
    let mrp = 0;
    let total = 0;

    cart.forEach((item) => {
      const quantity = Number(item.quantity ?? 1);
      const price = Number(item.MRP ?? item.mrp ?? item.price ?? 0);
      const sp = Number(item.sp ?? item.price ?? 0);
      mrp += price * quantity;
      total += sp * quantity;
    });

    setTotalMRP(mrp);
    setTotalAmount(total);
    setTotalSaving(mrp - total);
    localStorage.setItem("cartGrandTotal", total);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [deliveryMode, setDeliveryMode] = useState("pickup");
  const [pickupPoint, setPickupPoint] = useState(1);
  const [confirmedPickup, setConfirmedPickup] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);
  const [finalConfirmation, setFinalConfirmation] = useState(null);
  const [showCODModal, setShowCODModal] = useState(false);

  const pickupPoints = [
    {
      id: 1,
      title: "Balaram Mhatre Complex, Vichumbe Village Road - Panvel",
      address:
        "Shop No. 10, Ground Floor, Balaram Mhatre Complex, Vichumbe Village Road, Panvel, Maharashtra - 410206",
    },
    {
      id: 2,
      title: "Sky Oasis CHSL, Sector 9 - Ulwe",
      address:
        "Shop No.15, Sky Oasis CHSL, Sector 9, Jai Bhavani Rd, Ulwe, Navi Mumbai, Maharashtra - 410206",
    },
    {
      id: 3,
      title: "Suyash Park CHSL, Sector 23 - Ulwe",
      address:
        "Shop No. 31, Suyash Park CHSL, Sector 23, Ulwe, Navi Mumbai, Maharashtra - 410206",
    },
    {
      id: 4,
      title: "Narayan Enclave, Sector 5 - Ulwe",
      address:
        "Shop No. 1, Narayan Enclave, Sector 5, Ulwe, Navi Mumbai, Maharashtra - 410206",
    },
  ];

  const timeSlots = ["9 AM - 11 AM", "11 AM - 1 PM", "1 PM - 3 PM", "3 PM - 5 PM"];

  const handleConfirmAddress = () => setConfirmedPickup(pickupPoint);

  const handleConfirmTimeSlot = () => {
    if (timeSlot)
      setFinalConfirmation({
        pincode: "410209",
        slot: `Tomorrow 15th Oct, ${timeSlot}`,
      });
  };

  const handleConfirmOrder = () => {
    toast.success("Order confirmed! It will be delivered soon.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    setShowCODModal(false);

    setTimeout(() => {
      navigate("/Ordersummary");
    }, 3000);
  };

 
  const handlePrepaidPayment = () => {
    navigate("/payment", { state: { totalAmount, cart } });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 bg-gray-50 min-h-screen">
      <ToastContainer />

      {/* Left Section */}
      <div className="flex-1 max-w-3xl bg-white p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>

        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-md">
          <HiOutlineLocationMarker className="text-green-600 text-2xl" />
          <span className="text-gray-800 font-medium">Selected Pincode: 410209</span>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-gray-700">1. Select a delivery mode</p>
          <div className="flex flex-wrap gap-4">
            {/* Pickup */}
            <div
              className={`flex items-center gap-4 p-4 w-80 border rounded-lg shadow hover:shadow-lg cursor-pointer transition ${
                deliveryMode === "pickup" ? "ring-2 ring-green-500" : ""
              }`}
              onClick={() => {
                setDeliveryMode("pickup");
                setConfirmedPickup(null);
                setTimeSlot(null);
                setFinalConfirmation(null);
              }}
            >
              <input
                type="radio"
                name="deliveryMode"
                checked={deliveryMode === "pickup"}
                onChange={() => setDeliveryMode("pickup")}
              />
              <img src={delivery} className="w-12 h-12" alt="Pickup" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Pickup Point</p>
                <span className="text-green-600 text-sm">Free delivery</span>
              </div>
            </div>

         
            <div
              className={`flex items gap-4 p-4 w-80 border rounded-lg shadow hover:shadow-lg cursor-pointer transition ${
                deliveryMode === "home" ? "ring-2 ring-green-500" : ""
              }`}
              onClick={() => {
                setDeliveryMode("home");
                setConfirmedPickup(null);
                setTimeSlot(null);
                setFinalConfirmation(null);
              }}
            >
              <input
                type="radio"
                name="deliveryMode"
                checked={deliveryMode === "home"}
                onChange={() => setDeliveryMode("home")}
              />
              <img src={home} className="w-12 h-12" alt="Home" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Home Delivery</p>
                <span className="text-green-600 text-sm">₹0</span>
              </div>
            </div>
          </div>
        </div>


        {deliveryMode === "pickup" && (
          <>
            <div className="flex items-center justify-between p-3">
              <p className="font-semibold text-gray-700">Pickup Points near you</p>
            </div>
            <div className="space-y-3 h-80 overflow-y-auto border rounded-lg p-2">
              {pickupPoints.map((point) => (
                <div
                  key={point.id}
                  className={`flex items-start gap-3 p-4 border rounded-lg shadow hover:shadow-md cursor-pointer transition ${
                    pickupPoint === point.id ? "ring-2 ring-green-500" : ""
                  }`}
                  onClick={() => setPickupPoint(point.id)}
                >
                  <input
                    type="radio"
                    name="pickupPoint"
                    checked={pickupPoint === point.id}
                    onChange={() => setPickupPoint(point.id)}
                    className="mt-1"
                  />
                  <div className="flex flex-col w-full">
                    <p className="font-medium text-gray-800">{point.title}</p>
                    <div className="flex justify-between mt-1 items-start">
                      <p className="text-sm text-gray-500">{point.address}</p>
                      <div className="flex items-center gap-1 text-blue-500 cursor-pointer">
                        <IoLocationOutline />
                        <span className="text-sm">View map</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg shadow"
                onClick={handleConfirmAddress}
              >
                Confirm Address
              </button>
            </div>

            {confirmedPickup && (
              <div className="mt-6 space-y-3">
                <p className="font-semibold text-gray-700">Select a time slot</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      className={`border rounded-lg p-3 text-gray-700 font-medium hover:bg-green-50 transition ${
                        timeSlot === slot ? "ring-2 ring-green-500" : ""
                      }`}
                      onClick={() => setTimeSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!timeSlot}
                    className={`px-6 py-2 rounded-lg font-medium shadow text-white ${
                      timeSlot
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handleConfirmTimeSlot}
                  >
                    Confirm Time Slot
                  </button>
                </div>

                {finalConfirmation && (
                  <p className="text-green-600 font-medium">
                    Selected Pincode: {finalConfirmation.pincode} | Time Slot:{" "}
                    {finalConfirmation.slot}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>

     
      <div className="w-full lg:w-96 bg-white p-6 rounded-xl shadow-lg sticky top-4 h-fit space-y-4">
        <h2 className="font-semibold text-gray-800 text-xl">
          Bill Summary{" "}
          <span className="text-sm text-gray-500">{cart.length} products</span>
        </h2>

        <div className="flex justify-between text-gray-700 font-medium border-t pt-2">
          <span>MRP</span>
          <span>₹{totalMRP.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center bg-green-50 p-3 rounded font-medium text-green-700">
          <span>💡 Total Savings</span>
          <span>₹{totalSaving.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center bg-blue-50 p-3 rounded font-bold">
          <div>
            <span className="text-gray-800">Total Amount to Pay</span>
          </div>
          <span className="text-lg text-gray-900">₹{totalAmount.toFixed(2)}</span>
        </div>

        <div className="space-y-3">
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
            onClick={() => setShowCODModal(true)}
          >
            PAY ON DELIVERY (COD)
          </button>
          <div className="flex items-center gap-2 text-gray-400 text-sm w-full">
            <span className="flex-1 h-px bg-gray-300"></span>
            <span>OR</span>
            <span className="flex-1 h-px bg-gray-300"></span>
          </div>
          <button
            className="w-full border border-green-600 text-green-600 font-medium py-2 rounded-lg hover:bg-green-50 transition"
            onClick={handlePrepaidPayment}
          >
            PAY NOW (PREPAID)
          </button>
        </div>

     
        {showCODModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Payment on Delivery
              </h2>
              <p className="text-gray-700 text-base">
                You can pay by <strong>Card, Cash, or UPI</strong> at the time of
                delivery.
              </p>
              <p className="text-gray-800 font-medium text-lg">
                Amount to be paid: <strong>₹{totalAmount.toFixed(2)}</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </button>
                <button
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors duration-200"
                  onClick={() => setShowCODModal(false)}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
