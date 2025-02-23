import React from "react";
import { useSelector } from "react-redux";

export default function TermsOfService() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div
      className={`mt-8 min-h-screen p-10 transition-all duration-300 flex flex-col items-center text-center 
      ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="max-w-3xl text-lg leading-relaxed">
        Welcome to <span className="font-semibold">BUYit</span>. By using our
        platform, you agree to the following terms and conditions.
      </p>

      <div className="mt-10 max-w-4xl text-left space-y-6">
        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using BUYit, you agree to comply with these terms.
            If you do not agree, please do not use our services.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">2. User Accounts</h2>
          <p>
            To access certain features, you may be required to create an
            account. You are responsible for maintaining the security of your
            account.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">
            3. Purchases & Payments
          </h2>
          <p>
            All transactions made on BUYit must be legitimate. We use secure
            payment gateways to ensure the safety of your financial information.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">
            4. Prohibited Activities
          </h2>
          <p>
            Users must not engage in fraudulent activities, unauthorized
            reselling, or misuse of the platform in any way.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">
            5. Limitation of Liability
          </h2>
          <p>
            BUYit is not responsible for any damages resulting from the use or
            inability to use our services.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">6. Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Continued
            use of BUYit after changes means acceptance of the new terms.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-sm text-gray-400">Last Updated: February 2025</p>
      </div>
    </div>
  );
}
