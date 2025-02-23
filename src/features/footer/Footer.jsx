import React from "react";
import { useSelector } from "react-redux";

export default function Footer() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <footer
      className={`py-8 transition-all ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold">BUYit</h2>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Your go-to platform for the best shopping experience.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 text-center md:text-left">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </div>

        <div className="flex space-x-4 mt-6 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
              alt="Facebook"
              className="h-6 w-6"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/733/733579.png"
              alt="Twitter"
              className="h-6 w-6"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/733/733558.png"
              alt="Instagram"
              className="h-6 w-6"
            />
          </a>
        </div>
      </div>

      <div
        className={`text-center text-sm mt-6 transition-all ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        &copy; {new Date().getFullYear()} BUYit. All rights reserved.
      </div>
    </footer>
  );
}
