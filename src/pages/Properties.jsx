// pages/PropertiesList.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiHome,
  FiDollarSign,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiEye,
  FiHeart,
  FiShare2,
  FiChevronDown,
  FiCheck,
  FiX,
  FiTrendingUp,
  FiUsers,
  FiTarget,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import StatCard from "../components/common/StatCard";
import PropertyCard from "../components/ui/PropertyCard";

// Dummy data based on your schema
const dummyProperties = [
  {
    _id: "1",
    propertyId: "NGPROP001",
    title: "Luxury 3 Bedroom Apartment in Lekki",
    description:
      "Beautiful modern apartment with stunning ocean views, fully furnished with premium amenities.",
    address: {
      street: "12 Admiralty Way",
      area: "Lekki Phase 1",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },
    location: {
      type: "Point",
      coordinates: [3.4513, 6.4413], // Lekki coordinates
    },
    propertyType: "Flat/Apartment",
    flatType: "3 Bedroom",
    bedrooms: 3,
    bathrooms: 3,
    price: {
      amount: 85000000,
      currency: "NGN",
      negotiable: true,
    },
    listingType: "For Sale",
    furnishingStatus: "Fully Furnished",
    propertyCondition: "Excellent",
    amenities: ["Swimming Pool", "Gym", "Security", "CCTV", "Generator"],
    media: [
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
        type: "image",
        category: "exterior",
        subCategory: "cover",
        isPrimary: true,
      },
    ],
    views: 2450,
    saves: 48,
    inquiries: 23,
    approvalStatus: "Approved",
    isVerified: true,
    availableFrom: new Date(),
    createdAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    propertyId: "NGPROP002",
    title: "Modern Duplex in Ikeja GRA",
    description:
      "Spacious duplex with elegant finish, located in the heart of Ikeja GRA.",
    address: {
      street: "5 Oba Akinjobi Way",
      area: "Ikeja GRA",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },
    location: {
      type: "Point",
      coordinates: [3.349, 6.6018], // Ikeja coordinates
    },
    propertyType: "Detached Duplex",
    bedrooms: 4,
    bathrooms: 4,
    price: {
      amount: 120000000,
      currency: "NGN",
      negotiable: false,
    },
    listingType: "For Sale",
    furnishingStatus: "Semi-Furnished",
    propertyCondition: "New",
    amenities: ["Garden", "Security", "Generator", "Borehole"],
    media: [
      {
        url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
        type: "image",
        category: "exterior",
        subCategory: "cover",
        isPrimary: true,
      },
    ],
    views: 1890,
    saves: 35,
    inquiries: 18,
    approvalStatus: "Approved",
    isVerified: true,
    availableFrom: new Date(),
    createdAt: new Date("2024-02-10"),
  },
  {
    _id: "3",
    propertyId: "NGPROP003",
    title: "2 Bedroom Flat for Rent in Victoria Island",
    description:
      "Cozy apartment in secure estate, perfect for young professionals.",
    address: {
      street: "23A Adeola Odeku",
      area: "Victoria Island",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },
    location: {
      type: "Point",
      coordinates: [3.4255, 6.4281], // VI coordinates
    },
    propertyType: "Flat/Apartment",
    flatType: "2 Bedroom",
    bedrooms: 2,
    bathrooms: 2,
    price: {
      amount: 4500000,
      currency: "NGN",
      negotiable: true,
    },
    listingType: "For Rent",
    rentalDetails: {
      depositAmount: 4500000,
      rentFrequency: "Yearly",
      petsAllowed: false,
    },
    furnishingStatus: "Fully Furnished",
    propertyCondition: "Excellent",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "CCTV"],
    media: [
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
        type: "image",
        category: "exterior",
        subCategory: "cover",
        isPrimary: true,
      },
    ],
    views: 3120,
    saves: 67,
    inquiries: 42,
    approvalStatus: "Approved",
    isVerified: true,
    availableFrom: new Date(),
    createdAt: new Date("2024-01-28"),
  },
  {
    _id: "4",
    propertyId: "NGPROP004",
    title: "Commercial Space in Abuja Central",
    description:
      "Prime commercial space suitable for office or retail business.",
    address: {
      street: "Plot 123 Central Area",
      area: "Central Business District",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
    },
    location: {
      type: "Point",
      coordinates: [7.4951, 9.0579], // Abuja coordinates
    },
    propertyType: "Commercial",
    bedrooms: 0,
    bathrooms: 2,
    price: {
      amount: 75000000,
      currency: "NGN",
      negotiable: true,
    },
    listingType: "For Sale",
    furnishingStatus: "Unfurnished",
    propertyCondition: "Good",
    amenities: ["Security", "CCTV", "Generator", "Parking"],
    media: [
      {
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500",
        type: "image",
        category: "exterior",
        subCategory: "cover",
        isPrimary: true,
      },
    ],
    views: 1560,
    saves: 28,
    inquiries: 15,
    approvalStatus: "Pending",
    isVerified: false,
    availableFrom: new Date(),
    createdAt: new Date("2024-03-01"),
  },
  {
    _id: "5",
    propertyId: "NGPROP005",
    title: "Bungalow in Port Harcourt GRA",
    description:
      "Beautiful 3-bedroom bungalow with large compound and modern amenities.",
    address: {
      street: "15 Nnadi Azikiwe Road",
      area: "GRA Phase 2",
      city: "Port Harcourt",
      state: "Rivers",
      country: "Nigeria",
    },
    location: {
      type: "Point",
      coordinates: [7.0134, 4.8156], // Port Harcourt coordinates
    },
    propertyType: "Bungalow",
    bedrooms: 3,
    bathrooms: 3,
    price: {
      amount: 65000000,
      currency: "NGN",
      negotiable: true,
    },
    listingType: "For Sale",
    furnishingStatus: "Semi-Furnished",
    propertyCondition: "Excellent",
    amenities: ["Garden", "Security", "Borehole", "Generator"],
    media: [
      {
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500",
        type: "image",
        category: "exterior",
        subCategory: "cover",
        isPrimary: true,
      },
    ],
    views: 1780,
    saves: 32,
    inquiries: 19,
    approvalStatus: "Approved",
    isVerified: true,
    availableFrom: new Date(),
    createdAt: new Date("2024-02-22"),
  },
];

const PropertiesList = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    listingType: "",
    priceRange: [0, 500000000],
    bedrooms: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter properties
  const filteredProperties = dummyProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.area.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = !filters.city || property.address.city === filters.city;
    const matchesPropertyType =
      !filters.propertyType || property.propertyType === filters.propertyType;
    const matchesListingType =
      !filters.listingType || property.listingType === filters.listingType;
    const matchesPrice =
      property.price.amount >= filters.priceRange[0] &&
      property.price.amount <= filters.priceRange[1];
    const matchesBedrooms =
      !filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms);

    return (
      matchesSearch &&
      matchesCity &&
      matchesPropertyType &&
      matchesListingType &&
      matchesPrice &&
      matchesBedrooms
    );
  });

  // Analytics data
  const propertyTypeData = [
    { name: "Apartments", value: 35, color: "#3b82f6" },
    { name: "Duplex", value: 25, color: "#10b981" },
    { name: "Bungalow", value: 15, color: "#f59e0b" },
    { name: "Commercial", value: 12, color: "#ef4444" },
    { name: "Others", value: 13, color: "#8b5cf6" },
  ];

  const performanceData = [
    { month: "Jan", views: 4500, inquiries: 120 },
    { month: "Feb", views: 5200, inquiries: 145 },
    { month: "Mar", views: 4800, inquiries: 130 },
    { month: "Apr", views: 6100, inquiries: 180 },
    { month: "May", views: 5800, inquiries: 160 },
    { month: "Jun", views: 7200, inquiries: 210 },
  ];

  const totalProperties = dummyProperties.length;
  const totalViews = dummyProperties.reduce((sum, prop) => sum + prop.views, 0);
  const totalInquiries = dummyProperties.reduce(
    (sum, prop) => sum + prop.inquiries,
    0
  );
  const approvalRate = (
    (dummyProperties.filter((p) => p.approvalStatus === "Approved").length /
      totalProperties) *
    100
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between sm:flex-row flex-col gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Properties Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and monitor all property listings
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            Add New Property
          </motion.button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Properties"
            value={totalProperties}
            change={12.5}
            icon={FiHome}
            color="blue"
          />
          <StatCard
            title="Total Views"
            value={totalViews.toLocaleString()}
            change={8.2}
            icon={FiEye}
            color="green"
          />
          <StatCard
            title="Total Inquiries"
            value={totalInquiries}
            change={15.3}
            icon={FiUsers}
            color="purple"
          />
          <StatCard
            title="Approval Rate"
            value={`${approvalRate}%`}
            change={2.4}
            icon={FiTarget}
            color="orange"
          />
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Property Type Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Performance Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="inquiries"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition bg-gray-50/50"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <FiFilter className="w-5 h-5" />
                <span>Filters</span>
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition ${
                  viewMode === "grid"
                    ? "bg-yellow-100 text-yellow-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition ${
                  viewMode === "list"
                    ? "bg-yellow-100 text-yellow-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <select
                    value={filters.city}
                    onChange={(e) =>
                      setFilters({ ...filters, city: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">All Cities</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                  </select>

                  <select
                    value={filters.propertyType}
                    onChange={(e) =>
                      setFilters({ ...filters, propertyType: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">All Types</option>
                    <option value="Flat/Apartment">Apartment</option>
                    <option value="Detached Duplex">Duplex</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Commercial">Commercial</option>
                  </select>

                  <select
                    value={filters.listingType}
                    onChange={(e) =>
                      setFilters({ ...filters, listingType: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">All Listings</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>

                  <select
                    value={filters.bedrooms}
                    onChange={(e) =>
                      setFilters({ ...filters, bedrooms: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">Any Bedrooms</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Properties Grid/List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Properties ({filteredProperties.length})
            </h2>
            <p className="text-sm text-gray-500">
              Showing {filteredProperties.length} of {dummyProperties.length}{" "}
              properties
            </p>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <FiHome className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No properties found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesList;
