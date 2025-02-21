import { NavLink, Outlet } from "react-router-dom";
import { logout, userSelector } from "../Users/redux/user.redux";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../sidebar/sidebar";
import { useState } from "react";
import ProtectedRoute from "../protect/protect";
import { persistor } from "../../store/store";
import { productActions } from "../prodcuts/redux/product.redux";

export default function NavBar() {
  const isDark = useSelector((state) => state.theme.isDark);
  const user = useSelector(userSelector) || { isAuthenticated: false };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = user;

  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      dispatch(logout());
      dispatch(productActions.resetCart());
      await persistor.purge();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full flex justify-between items-center p-4 z-10 transition-all duration-300
          ${isDark ? "bg-gray-900 text-white" : "bg-blue-300 text-black"}`}
      >
        <div className="flex space-x-4">
          <NavLink to="/" className="text-lg font-medium hover:text-gray-300">
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="text-lg font-medium hover:text-gray-300"
          >
            Products
          </NavLink>
        </div>

        <div className="text-2xl font-bold">BUYit</div>

        <div className="flex space-x-4">
          <NavLink to="/cart">
            <img
              alt="cart"
              src="https://cdn-icons-png.flaticon.com/128/891/891462.png"
              className="h-6 w-6"
            />
          </NavLink>
        </div>

        <div className="flex space-x-4">
          {isAuthenticated ? (
            <img
              alt="logout"
              src="https://cdn-icons-png.flaticon.com/128/14018/14018685.png"
              className="h-6 w-6"
              onClick={handleClick}
            />
          ) : (
            <NavLink to="/signin">
              <img
                alt="user"
                src="https://cdn-icons-png.flaticon.com/128/95/95461.png"
                className="h-10 w-10"
              />
            </NavLink>
          )}
          <img
            className="h-6 w-6 hover:text-gray-400"
            alt="sidebar"
            src="https://cdn-icons-png.flaticon.com/128/8166/8166618.png"
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>
      </div>

      <SideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      ></SideBar>

      <Outlet />
    </>
  );
}
