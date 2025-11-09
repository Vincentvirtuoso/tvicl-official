// pages/AdminSignup.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiLock, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../context/ToastManager";
import AuthLayout from "../../layout/AuthLayout";

export default function AdminSignup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const { registerAdmin, loading } = useAuth();
  const { addToast } = useToast();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerAdmin(form);
      addToast(
        res.message || "Admin account created successfully!",
        "success",
        {
          duration: 5000,
        }
      );
      // Redirect to login after successful signup
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      addToast(
        err.response?.data?.message || "Error creating admin account",
        "error",
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <AuthLayout
      title="Create Admin Account"
      subtitle="Setup your secure admin account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
            />
          </div>

          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading.registerAdmin}
          whileHover={{ scale: loading.registerAdmin ? 1 : 1.02 }}
          whileTap={{ scale: loading.registerAdmin ? 1 : 0.98 }}
          className="w-full py-3.5 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading.registerAdmin ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Admin Account</span>
            </>
          )}
        </motion.button>
      </form>

      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-200 underline flex items-center justify-center space-x-1"
          >
            <FiArrowLeft className="w-3 h-3" />
            <span>Back to Login</span>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
