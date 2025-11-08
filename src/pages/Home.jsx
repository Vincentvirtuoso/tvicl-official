import React, { useState } from "react";
import { containerVariants, itemVariants } from "../utils/animationVariants";
import dashboardData from "../utils/data";
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiMapPin,
  FiSettings,
  FiBell,
  FiSearch,
  FiMenu,
  FiX,
  FiFileText,
  FiMessageSquare,
  FiCheck,
  FiActivity,
  FiChevronRight,
  FiMoreVertical,
  FiCalendar,
  FiTarget,
  FiAward,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import RecentActivities from "../section/home/RecentActivities";

function Home() {
  const [timeRange, setTimeRange] = useState("monthly");

  return (
    <motion.div
      key="overview"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="bg-linear-to-r from-yellow-600 via-yellow-700 to-red-700 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-yellow-100 text-lg">
              Here's what's happening with your platform today
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3">
              <FiCalendar className="w-5 h-5" />
              <span className="font-medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Properties"
          value={dashboardData.stats.totalProperties.toLocaleString()}
          change={dashboardData.stats.monthlyGrowth}
          icon={FiHome}
          color="yellow"
        />
        <StatCard
          title="Total Users"
          value={dashboardData.stats.totalUsers.toLocaleString()}
          change={dashboardData.stats.userGrowth}
          icon={FiUsers}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          value={`₦${(dashboardData.stats.totalRevenue / 1000000).toFixed(1)}M`}
          change={15.2}
          icon={FiDollarSign}
          color="red"
        />
        <StatCard
          title="Conversion Rate"
          value={`${dashboardData.stats.conversionRate}%`}
          change={2.4}
          icon={FiTarget}
          color="orange"
        />
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Revenue vs Expenses
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Monthly financial overview
              </p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 bg-gray-50"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dashboardData.revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                formatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fill="url(#colorRevenue)"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                fill="url(#colorExpenses)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Property Distribution
            </h3>
            <p className="text-sm text-gray-500 mt-1">By property type</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.propertyTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#3b82f6"
                dataKey="value"
              >
                {dashboardData.propertyTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Properties by Location
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Top 5 cities with growth rate
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dashboardData.locationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="city" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Bar dataKey="properties" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="growth" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={itemVariants}>
          <RecentActivities />
        </motion.div>
      </div>

      {/* Performance & Top Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Performance Metrics
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Department performance overview
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={dashboardData.performanceMetrics}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
              <PolarRadiusAxis stroke="#6b7280" />
              <Radar
                name="Performance"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Top Performing Properties
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Most viewed listings this month
            </p>
          </div>
          <div className="space-y-4">
            {dashboardData.topProperties.map((property, index) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-linear-to-br from-yellow-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {property.name}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500 flex items-center">
                        <FiActivity className="w-3 h-3 mr-1" />
                        {property.views} views
                      </span>
                      <span className="text-xs text-green-600 font-medium flex items-center">
                        <FiCheck className="w-3 h-3 mr-1" />
                        {property.leads} leads
                      </span>
                    </div>
                  </div>
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* User Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              User Activity Today
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Real-time active users and page views
            </p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dashboardData.userActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          {[
            {
              title: "Add Property",
              icon: FiHome,
              color: "yellow",
              desc: "List new property",
            },
            {
              title: "Manage Users",
              icon: FiUsers,
              color: "green",
              desc: "View all users",
            },
            {
              title: "View Reports",
              icon: FiFileText,
              color: "red",
              desc: "Generate reports",
            },
            {
              title: "System Logs",
              icon: FiActivity,
              color: "orange",
              desc: "Check activity",
            },
          ].map((action, idx) => (
            <motion.button
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition text-left group"
            >
              <div
                className={`w-12 h-12 bg-linear-to-br from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}
              >
                <action.icon className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-gray-800 mb-1">
                {action.title}
              </h4>
              <p className="text-sm text-gray-500">{action.desc}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
