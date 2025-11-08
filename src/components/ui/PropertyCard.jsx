import React from "react";
import { motion } from "framer-motion";
import { FiEye, FiHeart, FiMapPin, FiShare2, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { LuBath, LuBed, LuCar } from "react-icons/lu";
import { MdOutlineSquareFoot } from "react-icons/md";

const PropertyCard = ({ property, viewMode }) => {
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `₦${(price / 1000).toFixed(1)}K`;
    }
    return `₦${price}`;
  };

  const {
    _id,
    propertyId,
    title = "Untitled Property",
    price = {},
    bedrooms = 0,
    bathrooms = 0,
    parking = {},
    floorSize = {},
    listingType = "For Sale",
    propertyType = "Apartment",
    address = {},
    media = [],
    isVerified,
    approvalStatus,
    saves,
    views,
    inquiries,
  } = property;

  const navigate = useNavigate();

  const totalParkingSpaces = (parking?.covered || 0) + (parking?.open || 0);

  // Get floor size value
  const sqFeet = floorSize?.value || 0;
  const sizeUnit = floorSize?.unit || "sqft";

  const handleViewDetails = () => navigate(`/property/${propertyId || _id}`);

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all"
      >
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden">
            <img
              src={media[0]?.url}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FiMapPin className="w-4 h-4 mr-1" />
                  <span>
                    {address.area}, {address.city}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(price.amount)}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {listingType.toLowerCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
              <div className="flex flex-wrap items-center gap-4 text-gray-600 text-xs my-4">
                {bedrooms > 0 && (
                  <div className="flex items-center gap-1">
                    <LuBed className="w-4 h-4" /> {bedrooms} Beds
                  </div>
                )}
                {bathrooms > 0 && (
                  <div className="flex items-center gap-1">
                    <LuBath className="w-4 h-4" /> {bathrooms} Baths
                  </div>
                )}
                {totalParkingSpaces > 0 && (
                  <div className="flex items-center gap-1">
                    <LuCar className="w-4 h-4" /> {totalParkingSpaces} Parking
                  </div>
                )}
                {sqFeet > 0 && (
                  <div className="flex items-center gap-1">
                    <MdOutlineSquareFoot className="w-4 h-4" />
                    {sqFeet.toLocaleString()} {sizeUnit}
                  </div>
                )}
              </div>
              <span>{propertyType}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  approvalStatus === "Approved"
                    ? "bg-green-100 text-green-800"
                    : approvalStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {approvalStatus}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <FiEye className="w-4 h-4 mr-1" />
                  {views}
                </span>
                <span className="flex items-center">
                  <FiHeart className="w-4 h-4 mr-1" />
                  {saves}
                </span>
                <span className="flex items-center">
                  <FiUsers className="w-4 h-4 mr-1" />
                  {inquiries}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={handleViewDetails}
                >
                  View Details
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="relative">
        <img
          src={media[0]?.url}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              approvalStatus === "Approved"
                ? "bg-green-100 text-green-800"
                : approvalStatus === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {approvalStatus}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          {isVerified && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              Verified
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <FiMapPin className="w-4 h-4 mr-1" />
          <span className="truncate">
            {address.area}, {address.city}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(price.amount)}
          </p>
          <span className="text-sm text-gray-500 capitalize">
            {listingType.toLowerCase()}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-xs my-4">
          {bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <LuBed className="w-4 h-4" /> {bedrooms} Beds
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <LuBath className="w-4 h-4" /> {bathrooms} Baths
            </div>
          )}
          {totalParkingSpaces > 0 && (
            <div className="flex items-center gap-1">
              <LuCar className="w-4 h-4" /> {totalParkingSpaces} Parking
            </div>
          )}
          {sqFeet > 0 && (
            <div className="flex items-center gap-1">
              <MdOutlineSquareFoot className="w-4 h-4" />
              {sqFeet.toLocaleString()} {sizeUnit}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center">
              <FiEye className="w-3 h-3 mr-1" />
              {views}
            </span>
            <span className="flex items-center">
              <FiHeart className="w-3 h-3 mr-1" />
              {saves}
            </span>
          </div>
          <button
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            onClick={handleViewDetails}
          >
            View
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
