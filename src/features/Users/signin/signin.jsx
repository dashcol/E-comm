import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  resetState,
  setEmail,
  userAsyncThunk,
  userSelector,
} from "../redux/user.redux";

export default function Signin() {
  const [showError, setShowError] = useState(false);
  const [users, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { error, isAuthenticated } = useSelector(userSelector);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    await dispatch(userAsyncThunk(users));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
    const timer = setTimeout(() => {
      setShowError(false);
      dispatch(resetState());
    }, 3000);
    return () => clearTimeout(timer);
  }, [error]);

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
        {showError && (
          <p className="text-red-500 text-center">Invalid Credentials</p>
        )}
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form className="space-y-4">
          <input
            type="text"
            value={users.email}
            onChange={(e) => {
              setUser({ ...users, email: e.target.value });
              dispatch(setEmail(e.target.value));
            }}
            placeholder="Email"
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 transition-all ${
              isDark
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                : "bg-gray-200 text-gray-900 border-gray-400 focus:ring-blue-600"
            }`}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={users.password}
              onChange={(e) => setUser({ ...users, password: e.target.value })}
              className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 transition-all pr-10 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                  : "bg-gray-200 text-gray-900 border-gray-400 focus:ring-blue-600"
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
          <button
            onClick={handleClick}
            type="submit"
            className={`w-full p-3 rounded-md transition-all focus:outline-none ${
              isDark
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
          >
            Login
          </button>
          <Link
            to="forgot-password"
            className={`text-sm text-center block transition-all ${
              isDark
                ? "text-blue-400 hover:text-blue-500"
                : "text-blue-500 hover:text-blue-600"
            }`}
          >
            Forgot password?
          </Link>
          <Link
            to="/signup"
            className={`text-sm text-center block transition-all ${
              isDark
                ? "text-blue-400 hover:text-blue-500"
                : "text-blue-500 hover:text-blue-600"
            }`}
          >
            <h4>Signup</h4>
          </Link>
        </form>
      </div>
    </div>
  );
}
