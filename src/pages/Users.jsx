import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiTrendingUp,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiPhone,
  FiStar,
  FiCalendar,
} from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animationVariants";
import StatCard from "../components/common/StatCard";
import axios from "../api/axiosInstance";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
        role: roleFilter,
        search: searchTerm,
      };

      if (verificationFilter === "verified") params.verified = true;
      if (verificationFilter === "unverified") params.verified = false;

      const res = await axios.get(`/auth/all-users`, {
        params,
      });

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const res = await axios.get(`/auth/users/stats`, {});
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, roleFilter, verificationFilter, searchTerm]);

  // Role badge colors
  const getRoleColor = (role) => {
    const colors = {
      buyer: "bg-blue-100 text-blue-600",
      seller: "bg-green-100 text-green-600",
      agent: "bg-purple-100 text-purple-600",
      estate: "bg-orange-100 text-orange-600",
      admin: "bg-red-100 text-red-600",
    };
    return colors[role] || "bg-gray-100 text-gray-600";
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      key="users"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-500 mt-1">
            Manage platform users, roles, and permissions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            // change={null}
            icon={FiUsers}
            color="yellow"
          />
          <StatCard
            title="Verified Users"
            value={stats.verifiedUsers}
            // change={null}
            icon={FiUserCheck}
            color="green"
          />
          <StatCard
            title="Verification Rate"
            value={`${stats.verificationRate}%`}
            // change={null}
            icon={FiTrendingUp}
            color="yellow"
          />
          <StatCard
            title="New This Month"
            value={stats.recentUsers}
            // change={null}
            icon={FiUsers}
            color="purple"
          />
        </div>
      ) : (
        <div className="text-gray-400 text-sm">Loading stats...</div>
      )}

      {/* Filters and Search */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex-1"
            >
              <option value="all">All Roles</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="agent">Agent</option>
              <option value="estate">Estate</option>
            </select>

            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex-1"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Users ({users.length})
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roles
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0 bg-linear-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <span
                            key={role}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                              role
                            )}`}
                          >
                            {role}
                            {user.activeRole === role && (
                              <FiStar className="w-3 h-3 ml-1" />
                            )}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <FiPhone className="w-4 h-4 text-gray-400" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full mr-2 ${
                            user.verified ? "bg-green-400" : "bg-yellow-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            user.verified ? "text-green-800" : "text-yellow-800"
                          }`}
                        >
                          {user.verified ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-yellow-600 hover:text-yellow-900 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </motion.button>
                        {/* <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors"
                          title="Edit User"
                        >
                          <FiEdit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete User"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button> */}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Users;
