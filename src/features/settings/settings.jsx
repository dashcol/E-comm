import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../theme/theme.reducers/theme.reducers";

function Settings() {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("English");

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-md transition-all ${
          isDark ? "bg-gray-800" : "bg-white border border-gray-300"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Settings</h1>

        {/* Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg">Theme</h4>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              isDark ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => dispatch(toggleTheme())}
          >
            <div
              className={`w-5 h-5 bg-black rounded-full shadow-md transform transition ${
                isDark ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex justify-between items-center">
          <h4 className="text-lg">Language</h4>
          <select
            className={`p-2 border rounded-md transition ${
              isDark
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {["English", "Spanish", "French", "German"].map((lang) => (
              <option
                key={lang}
                className={
                  isDark ? "bg-gray-800 text-white" : "bg-white text-black"
                }
              >
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Spacer to prevent footer sticking */}
      <div className="mt-10"></div>
    </div>
  );
}

export default Settings;
