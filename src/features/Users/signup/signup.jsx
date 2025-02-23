import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSignupThunk } from "../redux/user.redux";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.isDark);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user.password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    const result = await dispatch(userSignupThunk(user));

    if (result) {
      navigate("/signin");
    }
  };

  return (
    <div
      className={`mt-8 flex justify-center items-center min-h-screen ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-sm p-6 rounded-lg shadow-md ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={user.email}
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          />

          <input
            type="text"
            placeholder="Username"
            value={user.name}
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          />

          {/* Password Input with Toggle */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={user.password}
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className={`w-full p-3 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-gray-900 border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-gray-900 border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
          >
            Signup
          </button>

          <Link
            to="/signin"
            className="text-sm text-center block text-blue-400 hover:text-blue-500"
          >
            <h4>Already have an account? Login</h4>
          </Link>
        </form>
      </div>
    </div>
  );
}
