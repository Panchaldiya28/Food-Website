
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";

import { FaInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SlSocialYoutube, SlLocationPin } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let result;

      if (isLogin) {
        // LOGIN
        result = await signInWithEmailAndPassword(auth, email, password);
      } else {
        // SIGNUP
        result = await createUserWithEmailAndPassword(auth, email, password);
      }

      console.log("🔥 Firebase User:", result.user);

      navigate("/");

    } catch (err) {
      console.error("Auth Error:", err);
      setError(err.message.replace("Firebase:", ""));
    }
  };
  // console.log("Hello for git")
  // new branch
  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white shadow-lg rounded-lg w-96 p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 rounded w-full outline-none"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded w-full outline-none"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
{/* hello */}

          <p
            className="text-center mt-4 text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>

      <div className="bg-black text-white h-64 p-12 w-full mt-12">
        <div className="flex justify-between">

          <div className="w-1/3 pl-12">
            <h1 className="font-bold text-xl mt-2">Contact Us</h1>
            <p className="text-lg mt-2 flex items-center gap-2">
              <SlLocationPin /> location
            </p>
            <p className="text-lg mt-2 flex items-center gap-2">
              <FiPhoneCall /> Call +01 1234567890
            </p>
            <p className="text-lg mt-2 flex items-center gap-2">
              <MdOutlineMailOutline /> demo@gmail.com
            </p>
          </div>

          <div className="w-1/3">
            <h1 className="text-center text-xl font-bold">Feane</h1>
            <p className="mt-2 text-center">
              Necessary, making this the first true generator
              <br />
              on the Internet. It uses a dictionary of over 200
              <br />
              Latin words, combined with.
            </p>
            <div className="flex justify-center gap-3 mt-2">
              <FaInstagram className="text-2xl" />
              <BsLinkedin className="text-2xl" />
              <BiLogoFacebookCircle className="text-3xl" />
              <AiFillTwitterCircle className="text-3xl" />
              <SlSocialYoutube className="text-3xl" />
            </div>
          </div>

          <div className="w-1/3 pl-12">
            <h1 className="font-bold text-xl mt-2">Opening Hours</h1>
            <p className="text-lg mt-2">Everyday</p>
            <p className="text-lg">10.00 Am -10.00 Pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
