import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useToast } from "../context/ToastManager";
import { useLocation, useNavigate } from "react-router-dom";
import { FiShield, FiLoader } from "react-icons/fi";

export default function AuthLayout({ children, title, subtitle }) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [adminExists, setAdminExists] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // -----------------------------
  // Check if admin exists on mount
  // -----------------------------
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/auth/admin-exists");
        setAdminExists(res.data.exists);

        if (!res.data.exists && pathname === "/login") {
          addToast("No admin account found. Please sign up first.", "info", {
            duration: 5000,
          });
          navigate("/signup", { replace: true });
        }
      } catch (error) {
        addToast(
          error.response?.data?.message ||
            "Failed to check admin status. Please try again.",
          "error",
          { duration: 5000 }
        );
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [pathname, navigate, addToast]);

  // -----------------------------
  // Loading animation
  // -----------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-red-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FiShield className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FiLoader className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">
              Checking system status...
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // -----------------------------
  // Main Auth Layout
  // -----------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-red-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-100"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center mb-3">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-600 rounded-xl flex items-center justify-center shadow-md"
            >
              <FiShield className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <div className="text-center text-xs text-gray-400 border-gray-300 border-t pt-4">
          {adminExists
            ? "Admin access only – secured by TVICL Admin Portal"
            : "Initializing secure admin system..."}
        </div>
      </motion.div>
    </div>
  );
}
