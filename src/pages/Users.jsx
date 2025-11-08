import React, { useState } from "react";
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
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animationVariants";
import StatCard from "../components/common/StatCard";

// Mock data based on your models
const mockUsers = [
  {
    _id: "1",
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    roles: ["buyer", "seller"],
    activeRole: "buyer",
    profilePhoto: "",
    verified: true,
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: "2024-03-20T14:22:00Z",
    savedProperties: ["prop1", "prop2"],
    agentProfile: null,
    estateProfile: null,
  },
  {
    _id: "2",
    fullName: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    roles: ["agent"],
    activeRole: "agent",
    profilePhoto: "",
    verified: true,
    createdAt: "2024-02-10T08:15:00Z",
    lastLogin: "2024-03-20T09:45:00Z",
    savedProperties: ["prop3"],
    agentProfile: {
      licenseNumber: "AG123456",
      agencyName: "Premium Realty",
      yearsOfExperience: 5,
      specializations: ["residential", "luxury"],
      ratings: 4.8,
      reviewsCount: 127,
      verified: true,
    },
    estateProfile: null,
  },
  {
    _id: "3",
    fullName: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+1 (555) 345-6789",
    roles: ["estate"],
    activeRole: "estate",
    profilePhoto: "",
    verified: false,
    createdAt: "2024-03-01T16:20:00Z",
    lastLogin: "2024-03-18T11:30:00Z",
    savedProperties: [],
    agentProfile: null,
    estateProfile: {
      estateName: "Elite Properties Group",
      address: "123 Business Ave, New York, NY",
      contactEmail: "contact@eliteproperties.com",
      phone: "+1 (555) 999-8888",
      registrationNumber: "EST789012",
      totalProperties: 45,
      verified: false,
    },
  },
  {
    _id: "4",
    fullName: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "+1 (555) 456-7890",
    roles: ["buyer", "seller", "agent"],
    activeRole: "agent",
    profilePhoto: "",
    verified: true,
    createdAt: "2024-01-28T12:00:00Z",
    lastLogin: "2024-03-20T16:15:00Z",
    savedProperties: ["prop4", "prop5", "prop6"],
    agentProfile: {
      licenseNumber: "AG789012",
      agencyName: "City Homes Realty",
      yearsOfExperience: 3,
      specializations: ["residential", "rental"],
      ratings: 4.5,
      reviewsCount: 89,
      verified: true,
    },
    estateProfile: null,
  },
  {
    _id: "5",
    fullName: "Robert Wilson",
    email: "rob.wilson@example.com",
    phone: "+1 (555) 567-8901",
    roles: ["buyer"],
    activeRole: "buyer",
    profilePhoto: "",
    verified: false,
    createdAt: "2024-03-15T14:45:00Z",
    lastLogin: "2024-03-19T10:20:00Z",
    savedProperties: ["prop7"],
    agentProfile: null,
    estateProfile: null,
  },
];

const Users = () => {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");

  // Calculate stats
  const totalUsers = users.length;
  const verifiedUsers = users.filter((user) => user.verified).length;
  const activeToday = users.filter((user) => {
    const lastLogin = new Date(user.lastLogin);
    const today = new Date();
    return lastLogin.toDateString() === today.toDateString();
  }).length;

  const newThisMonth = users.filter((user) => {
    const createdAt = new Date(user.createdAt);
    const thisMonth = new Date();
    return (
      createdAt.getMonth() === thisMonth.getMonth() &&
      createdAt.getFullYear() === thisMonth.getFullYear()
    );
  }).length;

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.roles.includes(roleFilter);
    const matchesVerification =
      verificationFilter === "all" ||
      (verificationFilter === "verified" && user.verified) ||
      (verificationFilter === "unverified" && !user.verified);

    return matchesSearch && matchesRole && matchesVerification;
  });

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
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-500 mt-1">
            Manage platform users, roles, and permissions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 place-self-end"
        >
          <FiUsers className="w-5 h-5" />
          Add New User
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers}
          change={8.2}
          icon={FiUsers}
          color="yellow"
        />
        <StatCard
          title="Verified Users"
          value={verifiedUsers}
          change={12.5}
          icon={FiUserCheck}
          color="green"
        />
        <StatCard
          title="Active Today"
          value={activeToday}
          change={-2.1}
          icon={FiTrendingUp}
          color="yellow"
        />
        <StatCard
          title="New This Month"
          value={newThisMonth}
          change={22.1}
          icon={FiUsers}
          color="purple"
        />
      </div>

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
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="agent">Agent</option>
              <option value="estate">Estate</option>
              <option value="admin">Admin</option>
            </select>

            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Users ({filteredUsers.length})
          </h3>
        </div>

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
              {filteredUsers.map((user) => (
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
                          {role === "estate" ? "Estate Co." : role}
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
                      <motion.button
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
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Users;
