import React from "react";
import { FiBell, FiCalendar, FiMenu, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = ({ isDesktop, setSidebarOpen }) => {
  return (
    <header
      className={`bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 ${
        isDesktop ? "z-60" : "z-40"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg lg:hidden hover:bg-gray-100 transition"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search properties, users, reports..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition bg-gray-50/50"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 text-gray-600 rounded-xl hover:bg-gray-100 transition"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 text-gray-600 rounded-xl hover:bg-gray-100 transition"
          >
            <FiCalendar className="w-5 h-5" />
          </motion.button>
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="w-10 h-10 bg-linear-to-br from-yellow-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md text-sm">
              T&V
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
