import React from "react";
import { useSelector } from "react-redux";

export default function PrivacyPolicy() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div
      className={`mt-8 min-h-screen p-10 transition-all duration-300 flex flex-col items-center text-center 
      ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="max-w-3xl text-lg leading-relaxed">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information.
      </p>

      <div className="mt-10 max-w-4xl text-left space-y-6">
        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information such as your name, email, and
            contact details when you register, make a purchase, or contact us.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to provide services, process orders, improve
            our platform, and send promotional offers (if opted in).
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">3. Data Protection</h2>
          <p>
            We implement strict security measures to protect your data. Your
            personal information is encrypted and stored securely.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">
            4. Third-Party Services
          </h2>
          <p>
            We may use third-party services for payments and analytics. Your
            data is shared only when necessary for service functionality.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information. Contact us at{" "}
            <a href="mailto:support@buyit.com" className="text-blue-500">
              support@buyit.com
            </a>{" "}
            for assistance.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-sm text-gray-400">Last Updated: February 2025</p>
      </div>
    </div>
  );
}
