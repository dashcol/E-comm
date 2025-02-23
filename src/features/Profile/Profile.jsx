import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../Users/redux/user.redux";

function Profile() {
  const isDark = useSelector((state) => state.theme.isDark);
  const { data } = useSelector(userSelector);
  const { name, email } = data || {};

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

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
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl font-bold">
            {initials}
          </div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-400">{email}</p>
        </div>
      </div>

      <div className="mt-10"></div>
    </div>
  );
}

export default Profile;
