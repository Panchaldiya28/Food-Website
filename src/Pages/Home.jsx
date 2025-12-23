import React,{useState} from 'react'
import food from './pictures/food.png';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import bg from './pictures/bg.png';
import pl from './pictures/pl.png'
import fries from './pictures/fries.png'
import Homedata from './Homedata';
import { TiShoppingCart } from "react-icons/ti";
import girl from './pictures/girl.png';
import boy from './pictures/boy.png';
import { FaInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SlSocialYoutube } from "react-icons/sl";
import { SlLocationPin } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function Home() {
   const [dish, setDish] = useState(Homedata);
  const [item, setItem] = useState(false);
  const navigate = useNavigate();
 function filterCategory(category) {
  if (category === "All") {
    setDish(Homedata); 
  } else {
    const finaldish = Homedata.filter((val) => val.cat === category);
    setDish(finaldish);
  }
}
  return (
    <div className='relative'>
      <div>
        <img src={food} className='w-full rounded-lg h-screen'/>
      </div>
      <div className='absolute top-40 right-14 '>
        <h1 className='text-white lg:text-5xl text-center font-semibold   '>welcome to food heaven where<br/> flavour meet an excellence</h1>
      </div>
      <div className='absolute top-72 right-72 max-sm:top-60 max-sm:right-6  bg-white rounded-2xl'>
        <button 
          className='text-black text-2xl text-center w-48 font-bold max-sm:top-32 max-sm:right-6  ' 
          onClick={() => navigate("/menu")}  
        >
          view menu
        </button>
        <MdOutlineRestaurantMenu className='absolute top-2 left-40 text-xl'/>
      </div>
       <div className="flex flex-wrap gap-6 justify-center p-4">
  
  <div className="bg-black w-96  p-4 rounded-lg relative h-40">
    <img 
      src={bg} 
      className="h-32 w-36 object-cover rounded-full border-4 border-amber-500 mx-auto absolute left-10" 
    />
    <h1 className="text-white text-xl font-semibold mt-4 absolute left-48">Tasty Thursday</h1>
    <h1 className="text-white text-xl font-bold  absolute left-48 top-14">20% Off</h1>
    <p className="text-white text-xl bg-amber-500 rounded-2xl w-28 mx-auto text-center font-semibold mt-2 cursor-pointer absolute left-48 top-20">
      Order Now
    </p>
  </div>

  
  <div className="bg-black w-96 p-4 rounded-lg relative h-40">
    <img 
      src={pl} 
      className="h-32 w-36 object-cover rounded-full border-4 border-amber-500 mx-auto absolute left-10" 
    />
    <h1 className="text-white text-xl font-semibold mt-4 absolute left-48">pizza days</h1>
    <h1 className="text-white text-xl font-bold absolute left-48 top-14">15% Off</h1>
    <p className="text-white text-xl bg-amber-500 rounded-2xl w-28 mx-auto text-center font-semibold mt-2 cursor-pointer  absolute left-48 top-20">
      Order Now
    </p>
  </div>

  <div className="bg-black w-96 p-4 rounded-lg relative h-40">
    <img 
      src={fries} 
      className="h-32 w-36 object-cover rounded-full border-4 border-amber-500 mx-auto absolute left-10" 
    />
    <h1 className="text-white text-xl font-semibold mt-4 absolute left-48">french fries</h1>
    <h1 className="text-white text-xl font-bold absolute left-48 top-14">10% Off</h1>
    <p className="text-white text-xl bg-amber-500 rounded-2xl w-28 mx-auto text-center font-semibold mt-2 cursor-pointer absolute left-48 top-20">
      Order Now
    </p>
  </div>
</div>

      <div>
  <h1 className='text-center text-2xl font-bold'>special featured dishes</h1>
</div>
 <div className='flex justify-center gap-4 p-4'>
        <button className='px-4 py-2  text-xl rounded-lg bg-amber-500 text-white' onClick={() => filterCategory('All')}>All</button>
        <button className='px-4 py-2  text-xl rounded-lg  bg-amber-500 text-white' onClick={() => filterCategory('Pizza')}>Pizza</button>
        <button className='px-4 py-2 text-xl rounded-lg   bg-amber-500 text-white' onClick={() => filterCategory('Burger')}>Burger</button>
        <button className='px-4 py-2 text-xl rounded-lg   bg-amber-500 text-white' onClick={() => filterCategory
          ('French fries')}>French fries</button>
      </div> 

<div className='flex gap-x-8 gap-y-8 flex-wrap justify-center'>
  {dish.map((Home, index) => (
    <div 
      key={index} 
      className='bg-white rounded-2xl shadow-md p-4 relative w-96'
    >
      <img className='h-72  w-full object-cover rounded-bl-3xl' src={Home.img}  />

      <p className='text-xl font-bold mt-2'>{Home.title}</p>
      <p className='text-xl font-semibold mt-2'>
        Veniam debitis quaerat officiis quasi<br/> 
        cupiditate quo, quisquam velit, <br/>
        voluptatem repellendus sed eaque
      </p>
      <p className='text-xl font-semibold mt-2 pl-1'>{Home.price}</p>

   <TiShoppingCart
      className="absolute bottom-4 right-4 mt-2 text-3xl text-white bg-orange-300 rounded-2xl cursor-pointer"
    />
      
      
    </div>
  ))}
</div>
<div className='text-center p-4'>
  <button
    className='text-xl bg-pink-400 rounded-xl w-32 text-white font-bold'
    onClick={() => navigate("/menu")}  
  >
    view more
  </button>
</div>
<div className="flex w-full p-10 gap-10 bg-slate-300">
  
  <div className="w-1/2">
    <h1 className="text-xl font-bold mb-4">Book A Table</h1>

    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter your name"
        className="bg-slate-100 w-full p-2"
      />
      <input
        type="number"
        placeholder="Enter your phone no"
        className="bg-slate-100 w-full p-2"
      />
      <input
        type="email"
        placeholder="Enter your email"
        className="bg-slate-100 w-full p-2"
      />
      <select className="bg-slate-100 w-full p-2" defaultValue="">
        <option value="" disabled>
          How many persons
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <input type="date" className="bg-slate-100 w-full p-2" />
<button
  type="button"
  onClick={() => {
    console.log("Button clicked ");
    window.location.href = "/";  
  }}
  className="bg-white text-black rounded-2xl w-32 font-bold p-2 mt-2 border border-gray-400"
>
  Book Now
</button>
    </div>
  </div>


<div className="w-1/2" style={{ marginTop: "20px" }}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.006960963797!2d72.55118737509297!3d23.06020637914729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85e158a956eb%3A0xda7182b3a96e7130!2sRasthal%20Restaurant!5e0!3m2!1sen!2sin!4v1692378400000!5m2!1sen!2sin"
    width="100%"
    height="350"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
</div>  
<div className="flex flex-col items-center w-full">
  <h1 className="text-3xl font-bold text-center p-4">
    What our customer says
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full max-w-5xl">
    
    {/* ---- Card 1 ---- */}
    <div className="flex flex-col items-center">
      
      {/* Black Box */}
      <div className="bg-black text-white shadow-lg rounded-2xl p-4 w-96 max-w-sm text-center">
        <p className="font-semibold">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem ratione totam neque,
          animi iusto sunt eiduispca vengiesua edusacla.
        </p>
        <h1 className="mt-2 text-lg font-semibold">Moana Michell</h1>
        <p className="font-semibold">magna aliqua</p>
      </div>

      {/* Image BELOW */}
      <img
        src={girl}
        className=" max-w-xs rounded-xl mt-2"
        alt="girl"
      />
    </div>

    {/* ---- Card 2 ---- */}
    <div className="flex flex-col items-center">
      
      {/* Black Box */}
      <div className="bg-black text-white shadow-lg rounded-2xl p-4 w-96 max-w-sm text-center">
        <p className="font-semibold">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem ratione totam neque,
          animi iusto sunt eiduispca vengiesua edusacla.
        </p>
        <h1 className="mt-2 text-lg font-semibold">Moana Michell</h1>
        <p className="font-semibold">magna aliqua</p>
      </div>

      {/* Image BELOW */}
      <img
        src={boy}
        className=" max-w-xs rounded-xl mt-2"
        alt="boy"
      />
    </div>

  </div>
</div>
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
  )
}
export default Home 

