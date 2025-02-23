import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ContactUs() {
  const isDark = useSelector((state) => state.theme.isDark);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className={`mt-8 min-h-screen p-10 transition-all duration-300 flex flex-col items-center text-center 
      ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="max-w-3xl text-lg leading-relaxed">
        Have questions? Need support? Reach out to us, and our team will be
        happy to assist you!
      </p>

      <div className="mt-10 w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <div className="mb-4">
            <label className="block text-left font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 rounded border border-gray-400 bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-left font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 rounded border border-gray-400 bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-left font-semibold">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 rounded border border-gray-400 bg-transparent h-28"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md transition font-semibold ${
              isDark
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-blue-500 hover:bg-blue-400"
            }`}
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-2">Customer Support</h2>
        <p>
          Email:{" "}
          <a href="mailto:support@buyit.com" className="text-blue-500">
            support@buyit.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+1234567890" className="text-blue-500">
            +1 234 567 890
          </a>
        </p>
        <p>Working Hours: Mon-Fri, 9AM - 6PM</p>
      </div>
    </div>
  );
}
