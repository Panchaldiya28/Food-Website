
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
