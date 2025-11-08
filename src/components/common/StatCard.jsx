import React from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const StatCard = ({ title, value, change, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    yellow: "from-yellow-500 to-yellow-600",
    red: "from-red-500 to-yellow-600",
  };

  const changeColor = change >= 0 ? "text-green-600" : "text-red-600";

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${changeColor}`}>
            {change >= 0 ? (
              <FiTrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <FiTrendingDown className="w-4 h-4 mr-1" />
            )}
            <span>{Math.abs(change)}% from last month</span>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} text-white`}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Background decoration */}
      <div
        className={`absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r ${colorClasses[color]} rounded-full opacity-10`}
      ></div>
    </motion.div>
  );
};

export default StatCard;
