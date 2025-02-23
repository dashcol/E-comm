import React from "react";
import { useSelector } from "react-redux";

export default function AboutUs() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div
      className={`mt-8 min-h-screen p-10 transition-all duration-300 flex flex-col items-center text-center 
      ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h1 className="text-4xl font-bold mb-6">About BUYit</h1>
      <p className="max-w-3xl text-lg leading-relaxed">
        Welcome to <span className="font-semibold">BUYit</span>, your go-to
        marketplace for high-quality products at the best prices. Our mission is
        to provide a seamless shopping experience, combining affordability with
        convenience.
      </p>

      <div className="mt-10 max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
          <p>
            At BUYit, we aim to connect buyers with top-rated products while
            ensuring quality and affordability.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-3">Why Choose Us?</h3>
          <p>
            We prioritize customer satisfaction by offering secure transactions,
            fast delivery, and excellent customer service.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-3">Our Commitment</h3>
          <p>
            We are committed to continuously improving our platform and
            providing the best online shopping experience.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
        <p className="max-w-2xl">
          Whether you're a buyer looking for amazing deals or a seller aiming to
          reach a broader audience, BUYit is the place for you.
        </p>
      </div>
    </div>
  );
}
