import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiDollarSign,
  FiHome,
  FiMapPin,
  FiMessageSquare,
  FiMoreVertical,
  FiSettings,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { LuHousePlus, LuUserPlus } from "react-icons/lu";

function Sidebar({ sidebarOpen, setSidebarOpen, isDesktop }) {
  const menuItems = [
    {
      category: "Main",
      items: [
        { id: "", icon: FiHome, label: "Overview", badge: null },
        { id: "properties", icon: FiMapPin, label: "Properties", badge: 23 },
        { id: "users", icon: FiUsers, label: "Users", badge: 5 },
      ],
    },
    // {
    //   category: "Business",
    //   items: [
    //     { id: "revenue", icon: FiDollarSign, label: "Revenue", badge: null },
    //   ],
    // },
    {
      category: "Management",
      items: [
        // { id: "messages", icon: FiMessageSquare, label: "Messages", badge: 5 },
        {
          id: "add-property",
          icon: LuHousePlus,
          label: "Add Property",
          badge: null,
        },
        {
          id: "add-user",
          icon: LuUserPlus,
          label: "Add User",
          badge: null,
        },
        { id: "settings", icon: FiSettings, label: "Settings", badge: null },
      ],
    },
  ];

  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true);
    } else {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    }
  }, [isDesktop]);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const prevpathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevpathnameRef.current !== pathname && !isDesktop) {
      setSidebarOpen(false);
      prevpathnameRef.current = pathname;
    }
  }, [pathname, isDesktop]);

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-gray-100 lg:translate-x-0"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-linear-to-br from-yellow-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <FiHome className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-bold text-gray-800 block">
                TVICL
              </span>
              <span className="text-xs text-gray-500">Admin Portal</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg lg:hidden hover:bg-gray-100 transition"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
              AD
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800">
                Admin User
              </h4>
              <p className="text-xs text-gray-500">admin@estatepro.com</p>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-lg transition">
              <FiMoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-220px)]">
          {menuItems.map((section, idx) => (
            <div key={idx}>
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
                {section.category}
              </h5>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/${item.id}`)}
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 group ${
                      pathname?.split("/")?.[1] === item.id
                        ? "bg-linear-to-r from-yellow-600 to-yellow-700 text-white shadow-lg shadow-yellow-500/30"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon
                        className={`w-5 h-5 ${
                          pathname.split("/")?.[1] === item.id
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          pathname === item.id
                            ? "bg-white/20 text-white"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-linear-to-br from-yellow-50 to-red-50">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
            <div className="w-10 h-10 bg-linear-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <FiAward className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-800">
                System Status
              </p>
              <p className="text-xs text-green-600 font-medium">
                All Systems Operational
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
