import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SideBar({ isOpen, onClose }) {
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 transition-all ${
              isDark ? "bg-black/50" : "bg-gray-300/50"
            }`}
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed right-0 top-0 h-full w-64 shadow-lg z-50 p-4 transition-all ${
              isDark
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900 border-l border-gray-300"
            }`}
          >
            <button
              onClick={onClose}
              className="text-2xl absolute top-2 right-4"
              aria-label="Close Sidebar"
            >
              &times;
            </button>

            <nav className="flex flex-col space-y-4 mt-10">
              {[
                { to: "/profile", label: "Profile" },
                { to: "/settings", label: "Settings" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-600"
                        : isDark
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SideBar;
