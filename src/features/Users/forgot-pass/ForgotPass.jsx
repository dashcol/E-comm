import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk, userSelector } from "../redux/user.redux";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPass() {
  const { email } = useSelector(userSelector);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, newPassword);

    const result = await dispatch(resetPasswordThunk({ email, newPassword }));
    

    if (resetPasswordThunk.fulfilled.match(result)) {
      navigate("/signin");
    } else {
      setError(result.payload);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen transition-all ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-sm p-6 rounded-lg shadow-md transition-all ${
          isDark
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-900 border border-gray-300"
        }`}
      >
        {error && <div className=" text-center text-red-500">{error}</div>}
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>
        <p className="text-center mb-4 text-sm">
          Enter your new password to reset your account.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            readOnly
            className={`w-full p-3 rounded-md border focus:outline-none transition-all ${
              isDark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-200 text-gray-900 border-gray-400"
            }`}
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 transition-all ${
              isDark
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                : "bg-gray-200 text-gray-900 border-gray-400 focus:ring-blue-600"
            }`}
          />
          <button
            type="submit"
            className={`w-full p-3 rounded-md transition-all focus:outline-none ${
              isDark
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
          >
            Reset Password
          </button>
          <Link
            to="/signin"
            className={`text-sm text-center block transition-all ${
              isDark
                ? "text-blue-400 hover:text-blue-500"
                : "text-blue-500 hover:text-blue-600"
            }`}
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}
