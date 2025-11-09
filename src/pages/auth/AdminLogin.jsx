// pages/AdminLogin.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../context/ToastManager";
import AuthLayout from "../../layout/AuthLayout";

export default function AdminLogin() {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      addToast("Login successful! Welcome back.", "success", {
        duration: 4000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      addToast(
        err.response?.data?.message || "Invalid email or password",
        "error",
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <AuthLayout title="Admin Login" subtitle="Access your admin dashboard">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              name="email"
              type="email"
              placeholder="Admin Email"
              value={form.email}
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
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading.login}
          whileHover={{ scale: loading.login ? 1 : 1.02 }}
          whileTap={{ scale: loading.login ? 1 : 0.98 }}
          className="w-full py-3.5 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading.login ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Login to Dashboard</span>
              <FiArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>

      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-gray-600 text-sm">
          <Link
            to="/signup"
            className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-200 underline"
          >
            Create an admin account here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
