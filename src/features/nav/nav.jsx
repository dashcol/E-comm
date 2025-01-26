import { NavLink, Outlet } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-900 bg-opacity-75 text-white z-10">
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
          <img
            className="h-6 w-6 hover:text-gray-400"
            alt="settings"
            src="https://cdn-icons-png.flaticon.com/128/2040/2040504.png"
          />
          <img
            className="h-6 w-6 hover:text-gray-400"
            alt="sidebar"
            src="https://cdn-icons-png.flaticon.com/128/8166/8166618.png"
          />
        </div>
      </div>
      <Outlet />
    </>
  );
}
