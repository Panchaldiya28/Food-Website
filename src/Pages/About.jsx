
import React, { useState } from "react";
import about from "./pictures/about.png";
import mg from "./pictures/mg.png";
import dm from "./pictures/dm.png";
import fg from "./pictures/fg.png";
import chef from "./pictures/chef.png";
import bug from "./pictures/bug.png";
import { FaInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SlSocialYoutube, SlLocationPin } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function About() {
  const [showBurger, setShowBurger] = useState(false);
  const [showPizza, setShowPizza] = useState(false);
  const [showFries, setShowFries] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO */}
      <img
        src={about}
        alt="about"
        className="w-full h-[200px] sm:h-[280px] md:h-[380px] object-cover"
      />

      {/* STORY */}
      <div className="text-center px-4 mt-6 max-w-4xl mx-auto">
        <h1 className="text-base sm:text-lg">Tasty and crunchy</h1>
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
          Our Story
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi labore nemo consequuntur. Dolorum placeat quas provident voluptatibus incidunt nemo nesciunt, nihil, autem ad vitae exercitationem ab consequuntur veniam voluptas neque.          
        </p>
      </div>

      {/* FOOD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
        {/* Burger */}
        <div className="text-center">
          <img src={mg} className="mx-auto h-40 md:h-44" />
          <h1 className="text-xl font-bold mt-2">Burger</h1>
          <p className="text-sm px-3">
            A burger is a sandwich consisting of cooked patties.
            {showBurger && (
              <span> With cheese, lettuce, tomato and sauces.</span>
            )}
          </p>
          <button
            onClick={() => setShowBurger(!showBurger)}
            className="bg-amber-600 text-white px-4 py-1 rounded-lg mt-2"
          >
            {showBurger ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* Pizza */}
        <div className="text-center">
          <img src={dm} className="mx-auto h-40 md:h-44" />
          <h1 className="text-xl font-bold mt-2">Pizza</h1>
          <p className="text-sm px-3">
            Pizza is an Italian dish with bread base.
            {showPizza && (
              <span> Topped with cheese, veggies and meats.</span>
            )}
          </p>
          <button
            onClick={() => setShowPizza(!showPizza)}
            className="bg-amber-600 text-white px-4 py-1 rounded-lg mt-2"
          >
            {showPizza ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* Fries */}
        <div className="text-center">
          <img src={fg} className="mx-auto h-40 md:h-44" />
          <h1 className="text-xl font-bold mt-2">French Fries</h1>
          <p className="text-sm px-3">
            Fries are deep-fried potato strips.
            {showFries && <span> Served crispy with dips.</span>}
          </p>
          <button
            onClick={() => setShowFries(!showFries)}
            className="bg-amber-600 text-white px-4 py-1 rounded-lg mt-2"
          >
            {showFries ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* CHEF SECTION */}
      <div className="bg-gray-100 py-10">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto px-4">
          <div className="text-center md:text-left">
            <h1 className="text-lg">Tasty and crunchy</h1>
            <h1 className="text-3xl sm:text-4xl font-bold">Our Chef</h1>
            <p className="text-sm sm:text-base mt-3 max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, eos. Minima quo rem quidem explicabo et ipsa architecto sapiente similique sit saepe veniam voluptatem id aut, repellat nostrum quam. Voluptatibus!
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="bg-white shadow px-6 py-2 rounded-xl mt-4"
            >
              View Menu
            </button>
          </div>
          <img
            src={chef}
            className="h-52 sm:h-64 md:h-72 rounded-xl"
          />
        </div>
      </div>

      {/* SPECIAL MENU */}
      <div className="py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto px-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">Special Menu</h1>
            <p className="text-lg">Soup .......................... $20</p>
            <p className="text-lg">Main Course ................... $30</p>
            <p className="text-lg">Sweet .......................... $25</p>
            <p className="text-lg">Burger ........................ $30</p>
            <p className="text-lg">Fries ......................... $40</p>
          </div>
          <img
            src={bug}
            className="h-40 sm:h-48 md:h-52 rounded-xl"
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-black text-white py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 text-center md:text-left">
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
            <p className="mt-2 text-sm">
              Necessary, making this the first true generator.
            </p>
            <div className="flex justify-center md:justify-start gap-3 mt-3 text-xl">
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
            <p>10:00 AM - 10:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

