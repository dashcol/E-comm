import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../theme/theme.reducers/theme.reducers";

function Settings() {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("English");

  return (
    <div
      className={`mt-20 p-6 max-w-md mx-auto rounded-lg shadow-md ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg">Theme</h4>
        <button
          className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition ${
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

      <div className="flex justify-between items-center">
        <h4 className="text-lg">Language</h4>
        <select
          className={`p-2 border rounded-md ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option
            className={
              isDark ? "bg-gray-800 text-white" : "bg-white text-black"
            }
          >
            English
          </option>
          <option
            className={
              isDark ? "bg-gray-800 text-white" : "bg-white text-black"
            }
          >
            Spanish
          </option>
          <option
            className={
              isDark ? "bg-gray-800 text-white" : "bg-white text-black"
            }
          >
            French
          </option>
          <option
            className={
              isDark ? "bg-gray-800 text-white" : "bg-white text-black"
            }
          >
            German
          </option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
