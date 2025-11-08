import React from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: "property",
      action: "New property listed",
      user: "John Doe",
      time: "2 min ago",
      icon: FiHome,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: 2,
      type: "user",
      action: "New user registered",
      user: "Sarah Smith",
      time: "5 min ago",
      icon: FiUser,
      color: "text-green-600 bg-green-50",
    },
    {
      id: 3,
      type: "payment",
      action: "Payment received",
      user: "Mike Johnson",
      time: "12 min ago",
      icon: FiDollarSign,
      color: "text-purple-600 bg-purple-50",
    },
    {
      id: 4,
      type: "approval",
      action: "Property approved",
      user: "Admin",
      time: "15 min ago",
      icon: FiCheckCircle,
      color: "text-orange-600 bg-orange-50",
    },
    {
      id: 5,
      type: "pending",
      action: "Approval pending",
      user: "David Wilson",
      time: "20 min ago",
      icon: FiClock,
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activities
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.action}
              </p>
              <p className="text-xs text-gray-500 truncate">
                by {activity.user}
              </p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {activity.time}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2 text-sm text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
      >
        View All Activities
      </motion.button>
    </motion.div>
  );
};

export default RecentActivities;
