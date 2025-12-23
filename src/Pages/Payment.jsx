
import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { SiPhonepe, SiGooglepay, SiPaytm, SiUpwork } from "react-icons/si";
import { MdOutlineAccountBalance } from "react-icons/md";

function Payment() {
  const [selected, setSelected] = useState("upi");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    
const upiId = "panchaldiya28@okicici"; 

    const name = "FoodApp"; 
    const amount = "99.00"; 
    const upiString = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;


    QRCode.toDataURL(upiString)
      .then((url) => {
        setQrUrl(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white w-[750px] rounded-2xl shadow-lg flex">

        <div className="w-1/3 bg-green-50 p-6 rounded-l-2xl border-r">
          <h2 className="text-lg font-semibold mb-6">Payment Options</h2>

          <div className="space-y-4">
            <div
              onClick={() => setSelected("upi")}
              className={`p-3 rounded-xl cursor-pointer flex items-center justify-between ${
                selected === "upi" ? "bg-green-200" : "hover:bg-green-100"
              }`}
            >
              <span className="font-medium">UPI</span>
              <div className="flex space-x-1">
                <SiPhonepe className="text-purple-500" />
                <SiGooglepay className="text-blue-600" />
                <SiPaytm className="text-sky-500" />
              </div>
            </div>

            <div
              onClick={() => setSelected("cards")}
              className={`p-3 rounded-xl cursor-pointer flex items-center justify-between ${
                selected === "cards" ? "bg-green-200" : "hover:bg-green-100"
              }`}
            >
              <span className="font-medium">Cards</span>
              <div className="flex space-x-1">
                <FaCcVisa className="text-blue-600" />
                <FaCcMastercard className="text-orange-500" />
                <FaCcAmex className="text-blue-400" />
              </div>
            </div>

            <div
              onClick={() => setSelected("netbanking")}
              className={`p-3 rounded-xl cursor-pointer flex items-center justify-between ${
                selected === "netbanking" ? "bg-green-200" : "hover:bg-green-100"
              }`}
            >
              <span className="font-medium">Netbanking</span>
              <MdOutlineAccountBalance className="text-gray-600" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-6">
          {selected === "upi" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">UPI QR</h3>
              <div className="flex items-center justify-between bg-green-50 border rounded-xl p-5">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 flex items-center justify-center rounded-lg border overflow-hidden bg-white">
                    {qrUrl ? (
                      <img
                        src={qrUrl}
                        alt="UPI QR"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">Generating QR...</span>
                    )}
                  </div>
                  <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg">
                    Show QR
                  </button>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-gray-700 mb-3">
                    Scan the QR using any UPI App
                  </p>
                  <div className="flex space-x-4 text-3xl">
                    <SiPhonepe className="text-purple-500" />
                    <SiGooglepay className="text-blue-600" />
                    <SiPaytm className="text-sky-500" />
                    <SiUpwork className="text-green-500" />
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-6 text-center">
                By proceeding, I agree to Razorpay’s{" "}
                <span className="text-blue-500 underline cursor-pointer">
                  Privacy Notice
                </span>{" "}
                •{" "}
                <span className="text-blue-500 underline cursor-pointer">
                  Edit Preferences
                </span>
               </p>
              {/* <div className="text-center text-xs text-orange-600 mt-2">
                ⚠️ This page will timeout in 9:58 minutes
              </div> */}
            </div>
          )}

          {selected === "cards" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-3 border rounded-lg mb-3"
              />
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 p-3 border rounded-lg"
                />
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Pay Now
              </button>
            </div>
          )}

          {selected === "netbanking" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Bank</h3>
              <select className="w-full p-3 border rounded-lg mb-4">
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Proceed to Pay
              </button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Payment;

