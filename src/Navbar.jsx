



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Pages/firebase";
import axios from "axios";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const getUserName = (email) => {
    if (!email) return "";
    return email.split("@")[0];
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="bg-white px-4 py-3 w-full shadow">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-amber-700 tracking-wide">
          foodieweb
        </h1>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="text-amber-700 text-3xl md:hidden"
        >
          {openMenu ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">

          <Link className="text-amber-700 text-2xl font-bold hover:text-amber-800" to="/">
            Home
          </Link>

          <Link className="text-amber-700 text-2xl font-bold hover:text-amber-800" to="/menu">
            Menu
          </Link>

          <Link className="text-amber-700 text-2xl font-bold hover:text-amber-800" to="/about">
            About
          </Link>

          <Link className="text-amber-700 text-2xl font-bold hover:text-amber-800" to="/contact">
            Contact
          </Link>

          {!loading && (
            user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full shadow-sm">
                  <FaUserLarge className="text-amber-700" size={20} />
                  <span className="text-amber-700 font-bold text-lg">
                    {getUserName(user.email)}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white text-lg font-semibold px-4 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/sign"
                className="flex items-center gap-2 bg-amber-700 text-white text-lg font-semibold px-4 py-1.5 rounded-lg shadow hover:bg-amber-800 transition"
              >
                <FaUserLarge size={20} />
                Login
              </Link>
            )
          )}

        </div>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="flex flex-col mt-4 space-y-3 md:hidden">

          <Link className="text-amber-700 text-lg font-semibold" to="/" onClick={() => setOpenMenu(false)}>
            Home
          </Link>

          <Link className="text-amber-700 text-lg font-semibold" to="/menu" onClick={() => setOpenMenu(false)}>
            Menu
          </Link>

          <Link className="text-amber-700 text-lg font-semibold" to="/about" onClick={() => setOpenMenu(false)}>
            About
          </Link>

          <Link className="text-amber-700 text-lg font-semibold" to="/contact" onClick={() => setOpenMenu(false)}>
            Contact
          </Link>

          {!loading && (
            user ? (
              <div className="flex flex-col gap-3">

                <div className="flex items-center gap-2 px-3 py-2 bg-amber-100 rounded-lg">
                  <FaUserLarge className="text-amber-700" size={20} />
                  <span className="text-amber-700 font-bold text-lg">
                    {getUserName(user.email)}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                >
                  Logout
                </button>

              </div>
            ) : (
              <Link
                to="/sign"
                className="flex items-center gap-2 bg-amber-700 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow hover:bg-amber-800 transition"
              >
                <FaUserLarge size={20} />
                Login
              </Link>
            )
          )}

        </div>
      )}
    </div>
  );
}

export default Navbar;
