// import React,{useState} from 'react'
// import contact from './pictures/contact.png';
// import mk from './pictures/mk.png';
// import { FaInstagram } from "react-icons/fa6";
// import { BsLinkedin } from "react-icons/bs";
// import { BiLogoFacebookCircle } from "react-icons/bi";
// import { AiFillTwitterCircle } from "react-icons/ai";
// import { SlSocialYoutube } from "react-icons/sl";
// import { SlLocationPin } from "react-icons/sl";
// import { FiPhoneCall } from "react-icons/fi";
// import { MdOutlineMailOutline } from "react-icons/md";
// import {useFormik} from 'formik';
// import * as Yup from "yup";
// function Contact() {
//   const [submitted, setSubmitted] = useState(false);  
//   const [email, setEmail] = useState("");
//    const [submittedNewsletter, setSubmittedNewsletter] = useState(false);
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       name: "",
//       message: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//       name: Yup.string()
//         .min(2, "Name must be at least 2 characters")
//         .required("Name is required"),
//       message: Yup.string()
//         .min(10, "Message must be at least 10 characters")
//         .required("Message is required"),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       console.log("Form Submitted", values);
//       setSubmitted(true);
//       setTimeout(() => {
//         setSubmitted(false);
//       }, 3000);

//       resetForm();
//     },
//   });
//   const newsletterFormik = useFormik({
//     initialValues: {
//       newsletterEmail: "",
//     },
//     validationSchema: Yup.object({
//       newsletterEmail: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       console.log("Newsletter Email Submitted:", values.newsletterEmail);
//       setSubmittedNewsletter(true);
//       setTimeout(() => {
//         setSubmittedNewsletter(false);
//       }, 3000);

//       resetForm();
//     },
//   });
//   return (
//     <div>
//       <div>
//       <img src={contact}/>
//       </div>
//        <div>
//         <h1 className='text-6xl text-center font-bold p-4'>Have any questions</h1>
//         <p className='text-center text-2xl'>Want to know about any of our ingredients or suppliers? Or maybe you just want to say <br/>Aloha? Send us a message below and we'll get right back to you. </p>
//         <br/>
    
//         <div className="flex flex-col items-center justify-center">
//       <form
//         className="space-y-4 w-full max-w-2xl"
//         onSubmit={formik.handleSubmit}
//       >
//         <div className="flex space-x-4">
//           <div className="flex flex-col flex-1">
//             <label className="font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter a valid email address"
//               className="w-full border rounded px-3 py-2 bg-gray-100"
//               {...formik.getFieldProps("email")}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-red-500 text-sm">{formik.errors.email}</p>
//             )}
//           </div>
//           <div className="flex flex-col flex-1">
//             <label className="font-medium">Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your Name"
//               className="w-full border rounded px-3 py-2 bg-gray-100"
//               {...formik.getFieldProps("name")}
//             />
//             {formik.touched.name && formik.errors.name && (
//               <p className="text-red-500 text-sm">{formik.errors.name}</p>
//             )}
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <label className="font-medium">Message</label>
//           <textarea
//             name="message"
//             placeholder="Enter your message"
//             className="w-full border rounded px-3 py-2 h-28 bg-gray-100 resize-none"
//             {...formik.getFieldProps("message")}
//           />
//           {formik.touched.message && formik.errors.message && (
//             <p className="text-red-500 text-sm">{formik.errors.message}</p>
//           )}
//         </div>
//         <div className="flex justify-center">
//          <button
//                 type="submit"
//                 className={`px-6 py-2 rounded font-semibold text-white ${
//                   submitted ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
//                 }`}
//                 disabled={formik.isSubmitting}
//               >
//                 {submitted ? "Thank you! Your message has been sent" : "SUBMIT"}
//               </button>
//         </div>
//       </form>
//     </div>
//       </div> 
//       <br/>
//       <div className=' bg-green-100' >
//         <h1 className='text-center text-6xl font-bold'>we are open</h1>
//         <p className='text-center text-xl mt-4'>we bring you the flavour of the ocean, but are loacated in the heart of downtown</p>
//         <p className='text-center text-xl font-bold'>Delivery within 25km in any direction</p>
//         <br/>
//         <p className='text-center text-xl'>Mon - Wed 9:00 am - 5:00 pm</p>
//         <p className='text-center text-xl'>Thu - Fri 9:00 am - 8:30 pm</p>
//         <p className='text-center text-xl'>Saturday 9:00 am - 10:00 pm</p>
//         <p className='text-center text-xl'>Sunday Closed</p>
//         <br/>
//       </div>
//         <div className="px-24 py-12">
//       <h1 className="text-3xl font-bold mb-8 text-center">CONTACTS</h1>

//       <div className="flex space-x-16">

//         <div className="w-1/2">
//           <img
//             src={mk}
//             alt="Food"
//             className="w-72 h-72 object-cover rounded-full mx-12"
//           />
//           <p className="mt-6 text-gray-700 text-xl">
//             Use our contact form for all information requests or contact<br/> us
//             directly using the contact information below.
//           </p>
//           <p className="mt-4 text-gray-700 text-xl">
//             Feel free to get in touch with us via email or phone.
//           </p>
//         </div>

// <div className="w-1/2">
//   <h2 className=" font-bold mb-2 text-xl">SIGN UP FOR THE NEWSLETTER</h2>
//   <p className="text-gray-600 mb-4 text-xl">
//     Want to be the first to read our news? Subscribe to the,<br/> newsletter
//     to keep abreast of all events.
//   </p>

//   <form onSubmit={newsletterFormik.handleSubmit} className="mt-6">
//     <div className="flex">
//       <input
//         type="email"
//         name="newsletterEmail"
//         autoComplete='tel'
//         placeholder="Enter a valid email address"
//         className="w-80 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
//         {...newsletterFormik.getFieldProps("newsletterEmail")}
//       />
//       <button
//         type="submit"
//         className={`px-6 py-2 rounded font-semibold text-white ${
//           submittedNewsletter
//             ? "bg-green-700"
//             : "bg-green-600 hover:bg-green-700"
//         }`}
//         disabled={newsletterFormik.isSubmitting}
//       >
//         {submittedNewsletter
//           ? "Thank you for subscribing!"
//           : "SUBSCRIBE"}
//       </button>
//     </div>

//     {newsletterFormik.touched.newsletterEmail &&
//       newsletterFormik.errors.newsletterEmail && (
//         <p className="text-red-500 text-sm mt-2">
//           {newsletterFormik.errors.newsletterEmail}
//         </p>
//       )}
//   </form>
// </div>

//       </div>
//     </div>
//      <div className="bg-black">
//     <div className='bg-black text-white h-56 p-12 w-full m-0'>
//       <div className='flex justify-between '>
//          <div className='w-1/3 pl-60'>
//           <h1 className='font-bold text-xl mt-2'>Contact Us</h1>
//          <p className='text-lg mt-2 flex items-center gap-2'><SlLocationPin/>location</p>
//                <p className='text-lg mt-2 flex items-center gap-2'><FiPhoneCall />Call +01 1234567890</p>
//                <p className='text-lg mt-2 flex items-center gap-2'><MdOutlineMailOutline />
//          demo@gmail.com</p>
//         </div>
//         <div className='w-1/3'>
//           <h1 className='text-center text-xl font-bold'>Feane</h1>
//           <p className='mt-2 text-center'>
//             Necessary, making this the first true generator<br />
//             on the Internet. It uses a dictionary of over 200<br />
//             Latin words, combined with.
//           </p>
//           <div className='flex justify-center gap-3'>
//             <FaInstagram className='mt-2 text-2xl' />
//             <BsLinkedin className='mt-2 text-2xl' />
//             <BiLogoFacebookCircle className='mt-1 text-3xl' />
//             <AiFillTwitterCircle className='mt-1 text-3xl' />
//             <SlSocialYoutube className='mt-1 text-3xl' />
//           </div>
//         </div>
//         <div className='w-1/3 pl-12'>
//           <h1 className='font-bold text-xl mt-2'>Opening Hours</h1>
//           <p className='text-lg mt-2'>Everyday</p>
//           <p className='text-lg'>10.00 Am -10.00 Pm</p>
//         </div>
//       </div>
//     </div>
//     </div>
//     </div>                                                                                                           
//   )
// }

// export default Contact;
import React, { useState } from "react";
import contact from "./pictures/contact.png";
import mk from "./pictures/mk.png";
import { FaInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SlSocialYoutube, SlLocationPin } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedNewsletter, setSubmittedNewsletter] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", name: "", message: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email required"),
      name: Yup.string().min(2).required("Name required"),
      message: Yup.string().min(10).required("Message required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      resetForm();
    },
  });

  const newsletterFormik = useFormik({
    initialValues: { newsletterEmail: "" },
    validationSchema: Yup.object({
      newsletterEmail: Yup.string()
        .email("Invalid email")
        .required("Email required"),
    }),
    onSubmit: (_, { resetForm }) => {
      setSubmittedNewsletter(true);
      setTimeout(() => setSubmittedNewsletter(false), 3000);
      resetForm();
    },
  });

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO */}
      <img
        src={contact}
        className="w-full h-[180px] sm:h-[260px] md:h-[380px] object-cover"
      />

      {/* HEADER */}
      <div className="text-center px-4 max-w-4xl mx-auto mt-6">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">
          Have any questions?
        </h1>
        <p className="text-sm sm:text-lg mt-3">
          Want to know about our ingredients or suppliers?  
          Send us a message and we’ll get right back to you.
        </p>
      </div>

      {/* CONTACT FORM */}
      <div className="flex justify-center px-4 mt-8">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-2xl space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border px-3 py-2 bg-gray-100 rounded"
              {...formik.getFieldProps("email")}
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full border px-3 py-2 bg-gray-100 rounded"
              {...formik.getFieldProps("name")}
            />
          </div>

          <textarea
            placeholder="Message"
            className="w-full border px-3 py-2 bg-gray-100 rounded h-28 resize-none"
            {...formik.getFieldProps("message")}
          />

          <div className="text-center">
            <button
              type="submit"
              className={`px-6 py-2 text-white rounded ${
                submitted ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {submitted ? "Message Sent ✔" : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>

      {/* OPEN HOURS */}
      <div className="bg-green-100 py-8 mt-10 text-center px-4">
        <h1 className="text-3xl sm:text-5xl font-bold">We Are Open</h1>
        <p className="mt-3 text-sm sm:text-lg">
          Delivery within 25km in any direction
        </p>
        <p className="mt-2">Mon–Wed: 9am – 5pm</p>
        <p>Thu–Fri: 9am – 8:30pm</p>
        <p>Saturday: 9am – 10pm</p>
        <p>Sunday: Closed</p>
      </div>

      {/* CONTACT + NEWSLETTER */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <img
            src={mk}
            className="w-52 h-52 rounded-full mx-auto md:mx-0"
          />
          <p className="mt-4">
            Use our contact form or reach us directly via phone or email.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-xl">Newsletter</h2>
          <form onSubmit={newsletterFormik.handleSubmit} className="mt-4 flex">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-3 py-2 border rounded-l"
              {...newsletterFormik.getFieldProps("newsletterEmail")}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-r"
            >
              {submittedNewsletter ? "Subscribed ✔" : "SUBSCRIBE"}
            </button>
          </form>
        </div>
      </div>
      {/* FOOTER */}
      <div className="bg-black text-white py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
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
              The first true generator on the internet.
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

export default Contact;
