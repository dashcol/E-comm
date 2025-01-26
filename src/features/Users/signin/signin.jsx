import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userAsyncThunk, userSelector } from "../redux/user.redux";

export default function Signin() {
  const [users, setUser] = useState({ email: "", password: "" });
  const { error } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async (event) => {
    event.preventDefault();
    const result = await dispatch(userAsyncThunk(users));
    if (result.payload) {
      navigate("/products");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
      <div className="w-full max-w-sm p-6 bg-gray-900 rounded-lg shadow-md">
        {error && (
          <div className="text-red-500 text-center">Invalid Credentials</div>
        )}
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form className="space-y-4">
          <input
            type="text"
            value={users.email}
            onChange={(e) => setUser({ ...users, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...users, password: e.target.value })}
            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleClick}
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
          >
            Login
          </button>
          <Link
            to="forgot-password"
            className="text-sm text-center block text-blue-400 hover:text-blue-500"
          >
            Forgot password?
          </Link>
          <Link
            to="/signup"
            className="text-sm text-center block text-blue-400 hover:text-blue-500"
          >
            <h4>Signup</h4>
          </Link>
        </form>
      </div>
    </div>
  );
}
