import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animationVariants";
import {
  FiBarChart2,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiHome,
  FiCalendar,
  FiDownload,
  FiFilter,
  FiEye,
  FiPieChart,
  FiShoppingCart,
} from "react-icons/fi";
import StatCard from "../components/common/StatCard";
import {
  Area,
  AreaChart,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Enhanced mock data
const revenueData = {
  stats: {
    totalRevenue: 45200000,
    monthlyRevenue: 12500000,
    avgTransaction: 4200000,
    transactions: 128,
    pendingPayouts: 3200000,
    growthRate: 15.2,
  },
  revenueData: [
    { month: "Jan", revenue: 8500000, transactions: 45, target: 9000000 },
    { month: "Feb", revenue: 9200000, transactions: 52, target: 9500000 },
    { month: "Mar", revenue: 11200000, transactions: 61, target: 11000000 },
    { month: "Apr", revenue: 9800000, transactions: 58, target: 10500000 },
    { month: "May", revenue: 12500000, transactions: 68, target: 12000000 },
    { month: "Jun", revenue: 14300000, transactions: 72, target: 13500000 },
    { month: "Jul", revenue: 13200000, transactions: 65, target: 13000000 },
    { month: "Aug", revenue: 14800000, transactions: 78, target: 14000000 },
    { month: "Sep", revenue: 12500000, transactions: 71, target: 12500000 },
    { month: "Oct", revenue: 16200000, transactions: 85, target: 15000000 },
    { month: "Nov", revenue: 15800000, transactions: 82, target: 15500000 },
    { month: "Dec", revenue: 18500000, transactions: 94, target: 17000000 },
  ],
  revenueByCategory: [
    { name: "Residential Sales", value: 28500000, color: "#3B82F6" },
    { name: "Commercial Leases", value: 9800000, color: "#10B981" },
    { name: "Property Management", value: 4500000, color: "#F59E0B" },
    { name: "Consultation Fees", value: 2400000, color: "#EF4444" },
  ],
  topPerformers: [
    { name: "Luxury Apartments", revenue: 12500000, growth: 22.5 },
    { name: "Commercial Spaces", revenue: 9800000, growth: 18.3 },
    { name: "Residential Homes", revenue: 8500000, growth: 12.7 },
  ],
};

const Revenue = () => {
  const [timeRange, setTimeRange] = useState("12m");

  // Format currency
  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `₦${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `₦${(value / 1000).toFixed(1)}K`;
    }
    return `₦${value}`;
  };

  // Calculate additional metrics
  const totalTransactions = revenueData.stats.transactions;
  const successRate = (
    ((totalTransactions - 12) / totalTransactions) *
    100
  ).toFixed(1);
  const avgMonthlyGrowth = (revenueData.stats.growthRate / 12).toFixed(1);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-sm text-yellow-600">
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-green-600">
            Transactions: {payload[0].payload.transactions}
          </p>
          {payload[0].payload.target && (
            <p className="text-sm text-purple-600">
              Target: {formatCurrency(payload[0].payload.target)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      key="revenue"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Revenue Analytics
          </h2>
          <p className="text-gray-500 mt-1">
            Comprehensive financial tracking and performance metrics
          </p>
        </div>

        <div className="flex gap-3">
          {/* Time Range Filter */}
          <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
            {["3m", "6m", "12m"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? "bg-yellow-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:text-gray-800 hover:border-gray-300 transition-colors flex items-center gap-2"
          >
            <FiDownload className="w-4 h-4" />
            Export
          </motion.button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(revenueData.stats.totalRevenue)}
          change={revenueData.stats.growthRate}
          icon={FiDollarSign}
          color="blue"
          subtitle="Year to date"
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(revenueData.stats.monthlyRevenue)}
          change={8.7}
          icon={FiTrendingUp}
          color="green"
          subtitle="Current month"
        />
        <StatCard
          title="Avg. Transaction"
          value={formatCurrency(revenueData.stats.avgTransaction)}
          change={3.2}
          icon={FiBarChart2}
          color="yellow"
          subtitle="Per deal"
        />
        <StatCard
          title="Total Transactions"
          value={revenueData.stats.transactions.toString()}
          change={12.5}
          icon={FiShoppingCart}
          color="purple"
          subtitle={`${successRate}% success rate`}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Revenue Trend
            </h3>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Actual</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Target</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData.revenueData}>
              <defs>
                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="target" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fill="url(#revenue)"
                strokeWidth={2}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#8b5cf6"
                fill="url(#target)"
                strokeWidth={1}
                strokeDasharray="5 5"
                name="Target"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue Breakdown */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Revenue by Category
          </h3>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={revenueData.revenueByCategory}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {revenueData.revenueByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-3">
            {revenueData.revenueByCategory.map((category, index) => (
              <div
                key={category.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-600">{category.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {formatCurrency(category.value)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Metrics and Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Performing Categories
          </h3>
          <div className="space-y-4">
            {revenueData.topPerformers.map((performer, index) => (
              <div
                key={performer.name}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {performer.name}
                    </p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <FiTrendingUp className="w-3 h-3" />+{performer.growth}%
                      growth
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    {formatCurrency(performer.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Performance Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FiTrendingUp className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-600">Monthly Growth</span>
              </div>
              <span className="font-semibold text-yellow-600">
                +{avgMonthlyGrowth}%
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FiUsers className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">
                  Transaction Success
                </span>
              </div>
              <span className="font-semibold text-green-600">
                {successRate}%
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FiDollarSign className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-600">Pending Payouts</span>
              </div>
              <span className="font-semibold text-yellow-600">
                {formatCurrency(revenueData.stats.pendingPayouts)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Revenue;
