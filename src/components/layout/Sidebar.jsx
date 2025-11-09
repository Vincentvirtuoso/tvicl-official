import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiHome,
  FiMapPin,
  FiMoreVertical,
  FiSettings,
  FiUsers,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { LuHousePlus, LuUserPlus } from "react-icons/lu";
import { useAuth } from "../../hooks/useAuth";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  isDesktop,
  totalProperties,
  users,
  isUserLoading,
  isPropertyLoading,
}) {
  const { user, logout } = useAuth(); // <-- ✅ use the hook
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const prevpathnameRef = useRef(pathname);

  const menuItems = [
    {
      category: "Main",
      items: [
        { id: "", icon: FiHome, label: "Overview", badge: null },
        {
          id: "properties",
          icon: FiMapPin,
          label: "Properties",
          badge: isPropertyLoading ? "-" : totalProperties || 0,
        },
        {
          id: "users",
          icon: FiUsers,
          label: "Users",
          badge: isUserLoading ? "-" : users || 0,
        },
      ],
    },
    {
      category: "Management",
      items: [
        { id: "add-property", icon: LuHousePlus, label: "Add Property" },
        // { id: "add-user", icon: LuUserPlus, label: "Add User" },
        // { id: "settings", icon: FiSettings, label: "Settings" },
      ],
    },
  ];

  // Handle responsiveness
  useEffect(() => {
    if (isDesktop) setSidebarOpen(true);
    else if (sidebarOpen) setSidebarOpen(false);
  }, [isDesktop]);

  // Close on navigation (mobile only)
  useEffect(() => {
    if (prevpathnameRef.current !== pathname && !isDesktop) {
      setSidebarOpen(false);
      prevpathnameRef.current = pathname;
    }
  }, [pathname, isDesktop]);

  // Helper for initials
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // Fallback user details
  const displayName = user?.fullName || "Guest User";
  const displayEmail = user?.email || "No email available";
  const initials = user ? getInitials(displayName) : "TV";

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-gray-100 lg:translate-x-0"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            >
              <img
                src="/icons/favicon.svg"
                alt="logo"
                className="rounded-full w-full h-full"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800 ">TVICL</span>
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

        {user ? (
          <>
            {/* User Profile Section */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-br from-yellow-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-md shadow-md shrink-0">
                  {initials}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {displayName}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {displayEmail}
                  </p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                  <FiMoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-260px)]">
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
                            ? "bg-linear-to-br from-yellow-600 to-yellow-700 text-white shadow-lg shadow-yellow-500/30"
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
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 flex flex-col items-center justify-center h-[calc(100vh-260px)] text-center space-y-3"
          >
            <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-md">
              <FiUsers className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              You are not logged in.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-semibold text-white bg-linear-to-br from-yellow-600 to-yellow-700 rounded-lg shadow-md hover:shadow-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-200"
            >
              Log In
            </button>
          </motion.div>
        )}

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-linear-to-br from-yellow-50 to-red-50 space-y-3">
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

          {/* Logout button */}
          {user && (
            <button
              onClick={logout}
              className="w-full flex items-center justify-center p-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition"
            >
              <FiLogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          )}
        </div>
      </motion.aside>

      {/* Backdrop */}
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
