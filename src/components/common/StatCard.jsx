import React from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const StatCard = ({
  title,
  value,
  change = null,
  icon: Icon,
  color = "blue",
  loading = false,
  skeletonLines = 1, // Number of skeleton lines to show
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    yellow: "from-yellow-500 to-yellow-600",
    red: "from-red-500 to-red-600",
  };

  const changeColor = change >= 0 ? "text-green-600" : "text-red-600";

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="space-y-3">
      {/* Title skeleton */}
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>

      {/* Value skeleton - different sizes based on skeletonLines */}
      {skeletonLines === 1 ? (
        <div className="h-8 bg-gray-300 rounded w-1/2 animate-pulse"></div>
      ) : (
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
      )}

      {/* Change indicator skeleton */}
      <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
    </div>
  );

  return (
    <motion.div
      whileHover={!loading ? { y: -5, scale: 1.02 } : {}}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {change !== null && (
                <div
                  className={`flex items-center mt-2 text-sm ${changeColor}`}
                >
                  {change >= 0 ? (
                    <FiTrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <FiTrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span>{Math.abs(change)}% from last month</span>
                </div>
              )}
            </>
          )}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: loading ? 0.8 : 1 }}
          transition={{ delay: 0.2 }}
          className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} ${
            loading ? "opacity-50" : "text-white"
          } relative`}
        >
          {loading ? (
            <div className="w-6 h-6">
              <div className="w-full h-full border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </motion.div>
      </div>

      {/* Background decoration */}
      <div
        className={`absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r ${
          colorClasses[color]
        } rounded-full opacity-10 ${loading ? "animate-pulse" : ""}`}
      ></div>
    </motion.div>
  );
};

export default StatCard;
