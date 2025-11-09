/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaCar,
  FaRegFilePdf,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  MdOutlineSquareFoot,
  MdHouseSiding,
  MdSecurity,
  MdWater,
  MdElectricalServices,
  MdLocalGasStation,
} from "react-icons/md";
import {
  LuMapPin,
  LuShieldCheck,
  LuCheck,
  LuConstruction,
  LuPhone,
  LuMail,
  LuClock,
  LuHouse,
  LuBuilding,
  LuCalendar,
  LuTag,
  LuChevronLeft,
  LuChevronRight,
  LuX,
  LuLandmark,
  LuSchool,
  LuShoppingBag,
  LuTrees,
} from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { usePropertyAPI } from "../hooks/useProperty";
import PropertySkeleton from "../section/propertyDetail/PropertySkeleton";
import NoPropertyData from "../section/propertyDetail/NoPropertyData";
import { formatCurrency } from "../utils/helper";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "network":
      return "We couldn’t connect to the server. Check your internet and try again.";
    case "deleted":
      return "This property has been removed or is no longer available.";
    case "expired":
      return "This listing has expired or is temporarily hidden.";
    case "not_found":
      return "We couldn’t find the property. Please check the link.";
    case "server":
      return "We’re experiencing issues fetching data. Try again shortly.";
    default:
      return "No property data available at this time.";
  }
};

const PropertyDetail = () => {
  const { propertyId } = useParams();

  const {
    propertyById: data,
    fetchPropertyDetails,
    isLoading,
    getError,
  } = usePropertyAPI();

  const error = getError("propertyById");

  useEffect(() => {
    fetchPropertyDetails(propertyId);
  }, []);

  const property = data || {};

  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = property?.media?.filter((m) => m.type === "image");
  const coverImage = images?.find((m) => m.isPrimary) || images?.[0];
  const galleryImages = images;
  // ?.filter((m) => m.subCategory === "gallery");

  const totalParking =
    (property?.parking?.covered || 0) + (property?.parking?.open || 0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages?.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + galleryImages?.length) % galleryImages?.length
    );
  };

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  useBodyScrollLock(showLightbox);

  if (isLoading("propertyById")) return <PropertySkeleton />;

  if (error && !data && !isLoading("propertyById")) {
    return (
      <NoPropertyData
        message={getErrorMessage(error?.code)}
        onRetry={() => fetchPropertyDetails(id)}
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-6 px-4 md:px-8 lg:px-12">
      {/* ===== BREADCRUMB ===== */}
      <div className="max-w-7xl mx-auto mb-4 text-sm text-gray-500">
        <span
          className="hover:text-gray-700 hover:underline cursor-pointer"
          onClick={() => handleNavigate("/")}
        >
          Home
        </span>{" "}
        /{" "}
        <span
          className="hover:text-gray-700 hover:underline cursor-pointer"
          onClick={() => handleNavigate("/property/list")}
        >
          Properties
        </span>{" "}
        /{" "}
        <span className="text-gray-900 font-medium">
          {property.propertyType}
        </span>
      </div>

      {/* ===== HERO SECTION WITH GALLERY ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Main Image - Takes up 3 columns */}
          <motion.div
            className="lg:col-span-3 relative rounded-2xl overflow-hidden cursor-pointer group aspect-[16/10] lg:aspect-auto lg:row-span-2"
            onClick={() => openLightbox(0)}
            whileHover={{ scale: 1.01 }}
          >
            <img
              src={coverImage?.url}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                {property.listingType}
              </span>
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                {property.propertyType}
              </span>
              {property.isVerified && (
                <span className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg flex items-center gap-1">
                  <LuShieldCheck size={14} /> Verified
                </span>
              )}
            </div>

            {/* Stats Overlay */}
            <div className="absolute not-sm:bottom-4 sm:top-4 right-4 flex gap-2">
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                👁️ {property.views}
              </span>
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                ❤️ {property.saves}
              </span>
            </div>
          </motion.div>

          {/* Side Gallery - 4 images in a single column */}
          {galleryImages?.slice(0, 4).map((img, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] lg:aspect-auto"
              onClick={() => openLightbox(idx + 1)}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={img.url}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {idx === 3 && galleryImages.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-2xl font-bold">
                    +{galleryImages.length - 4} More
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* ===== LEFT: MAIN DETAILS ===== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-gray-600 flex items-start gap-2 mb-2">
                  <LuMapPin className="mt-1 shrink-0" />
                  <span>
                    {property.address?.street &&
                      `${property.address?.street}, `}
                    {property.address?.area}, {property.address?.city},{" "}
                    {property.address?.state}
                  </span>
                </p>
                {property.address?.landmark && (
                  <p className="text-sm text-gray-500 flex items-center gap-1 ml-6">
                    <LuLandmark size={14} /> Near {property.address?.landmark}
                  </p>
                )}
              </div>

              <div className="text-right flex-1">
                <p className="text-3xl font-bold text-secondary">
                  {formatCurrency(property.price?.amount || 0)}
                </p>
                {property.price?.negotiable && (
                  <span className="text-sm text-green-600 font-medium">
                    Negotiable
                  </span>
                )}
                {property?.floorSize?.value > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(
                      Math.round(
                        property.price?.amount / property.floorSize?.value || 0
                      )
                    )}{" "}
                    per {property.floorSize?.unit}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaBed className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="text-lg font-bold">{property.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaBath className="text-purple-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="text-lg font-bold">{property.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaCar className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Parking</p>
                  <p className="text-lg font-bold">{totalParking}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MdOutlineSquareFoot className="text-orange-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="text-lg font-bold">
                    {property.floorSize?.value}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LuHouse /> Property Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </motion.div>

          {/* Property Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LuBuilding /> Property Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <DetailItem label="Property Type" value={property.propertyType} />
              <DetailItem label="Flat Type" value={property.flatType} />
              <DetailItem label="Listing Type" value={property.listingType} />
              <DetailItem
                label="Transaction Type"
                value={property.transactionType}
              />
              <DetailItem
                label="Furnishing"
                value={property.furnishingStatus}
              />
              <DetailItem
                label="Condition"
                value={property.propertyCondition}
              />
              <DetailItem label="Status" value={property.possessionStatus} />
              <DetailItem label="Year Built" value={property.yearBuilt} />
              {property.floorSize?.value && (
                <DetailItem
                  label="Floor Size"
                  value={`${property.floorSize?.value} ${property.floorSize?.unit}`}
                />
              )}
              {property.carpetArea?.value && (
                <DetailItem
                  label="Carpet Area"
                  value={`${property.carpetArea?.value} ${property.carpetArea?.unit}`}
                />
              )}
              <DetailItem label="Facing" value={property.facing} />
              <DetailItem label="Kitchens" value={property.kitchens} />
              <DetailItem label="Balconies" value={property.balconies} />
              {property.floor && (
                <DetailItem
                  label="Floors"
                  value={`${property.floor} of ${property.totalFloors}`}
                />
              )}
              <DetailItem
                label="Covered Parking"
                value={property.parking?.covered}
              />
              <DetailItem label="Open Parking" value={property.parking?.open} />
            </div>
          </motion.div>

          {/* Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LuCheck /> Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.amenities?.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <LuCheck className="text-green-600 shrink-0" />
                  <span className="text-sm text-gray-800">{amenity}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Utilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MdElectricalServices /> Utilities & Infrastructure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <MdWater className="text-blue-600 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Water Supply</p>
                  <p className="font-semibold">
                    {property.utilities?.waterSupply}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                <MdElectricalServices className="text-yellow-600 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Power Backup</p>
                  <p className="font-semibold">
                    {property.utilities?.powerBackup}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                <MdLocalGasStation className="text-red-600 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Gas</p>
                  <p className="font-semibold">
                    {property.utilities?.gas || "None"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nearby Places */}
          {property.nearbyPlaces?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LuMapPin /> Nearby Places
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.nearbyPlaces?.schools?.length > 0 && (
                  <NearbySection
                    icon={<LuSchool className="text-blue-600" />}
                    title="Schools"
                    places={property.nearbyPlaces.schools}
                  />
                )}
                {property.nearbyPlaces?.hospitals?.length > 0 && (
                  <NearbySection
                    icon={<span className="text-red-600">🏥</span>}
                    title="Hospitals"
                    places={property.nearbyPlaces.hospitals}
                  />
                )}
                {property.nearbyPlaces.shoppingCenters?.length > 0 && (
                  <NearbySection
                    icon={<LuShoppingBag className="text-purple-600" />}
                    title="Shopping Centers"
                    places={property.nearbyPlaces.shoppingCenters}
                  />
                )}
                {property.nearbyPlaces.transport?.length > 0 && (
                  <NearbySection
                    icon={<span className="text-orange-600">🚌</span>}
                    title="Transport"
                    places={property.nearbyPlaces.transport}
                  />
                )}
              </div>
            </motion.div>
          )}

          {/* Legal Documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaRegFilePdf className="text-red-600" /> Legal Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LegalDocItem
                label="Certificate of Occupancy (C of O)"
                present={property.legalDocuments?.cOfO?.present}
                verified={property.legalDocuments?.cOfO?.verifiedAt}
              />
              <LegalDocItem
                label="Governor's Consent"
                present={property.legalDocuments?.governorsConsent?.present}
                verified={property.legalDocuments?.governorsConsent?.verifiedAt}
              />
              <LegalDocItem
                label="Survey Plan"
                present={property.legalDocuments?.surveyPlan?.present}
                verified={property.legalDocuments?.surveyPlan?.verifiedAt}
              />
              <LegalDocItem
                label="Deed of Assignment"
                present={property.legalDocuments?.deedOfAssignment?.present}
                verified={property.legalDocuments?.deedOfAssignment?.verifiedAt}
              />
              <LegalDocItem
                label="Excision"
                present={property.legalDocuments?.excision?.present}
                verified={property.legalDocuments?.excision?.verifiedAt}
              />
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LuMapPin /> Location
            </h2>
            <div className="rounded-xl overflow-hidden h-[350px]">
              <iframe
                title="Property Map"
                width="100%"
                height="100%"
                loading="lazy"
                src={`https://www.google.com/maps?q=${property.location?.coordinates?.[1]},${property.location?.coordinates?.[0]}&z=15&output=embed`}
              />
            </div>
          </motion.div>
        </div>

        {/* ===== RIGHT: SIDEBAR ===== */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Contact Agent */}
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Contact Agent
            </h3>
            {property.contactPerson?.map((contact, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-xl font-bold">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {contact.name}
                    </p>
                    <p className="text-sm text-gray-500">{contact.role}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-secondary text-white py-3 rounded-xl font-medium hover:bg-secondary/90 transition"
                  >
                    <LuPhone /> Call Now
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
                  >
                    <LuMail /> Send Email
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          {property.highlights?.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Key Highlights
              </h3>
              <div className="space-y-2">
                {property.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Property Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Property ID</span>
                <span className="font-medium">{property.propertyId}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Available From</span>
                <span className="font-medium">
                  {new Date(property.availableFrom).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Area (LGA)</span>
                <span className="font-medium">
                  {property.address?.lga || "-"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Postal Code</span>
                <span className="font-medium">
                  {property.address?.postalCode}
                </span>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setShowLightbox(false)}
          >
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition z-10"
            >
              <LuX className="text-white text-2xl" />
            </button>

            <div
              className="max-w-6xl w-full h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex]?.url}
                alt={`Gallery ${lightboxIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />

              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition"
                  >
                    <LuChevronLeft className="text-white text-2xl" />
                  </button>

                  <button
                    onClick={nextLightboxImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition"
                  >
                    <LuChevronRight className="text-white text-2xl" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                    {lightboxIndex + 1} / {galleryImages.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Helper Components
const DetailItem = ({ label, value }) => (
  <div className="p-3 bg-gray-50 rounded-lg">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-semibold text-gray-900">{value || "--"}</p>
  </div>
);

const LegalDocItem = ({ label, present, verified }) => (
  <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        {present ? (
          <span className="text-xs text-green-600 flex items-center gap-1">
            <FaCheckCircle /> Available
          </span>
        ) : (
          <span className="text-xs text-red-600 flex items-center gap-1">
            <FaTimesCircle /> Not Available
          </span>
        )}
        {verified && (
          <span className="text-xs text-blue-600 flex items-center gap-1">
            <LuShieldCheck size={12} /> Verified
          </span>
        )}
      </div>
    </div>
  </div>
);

const NearbySection = ({ icon, title, places }) => (
  <div>
    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
      {icon} {title}
    </h4>
    <div className="space-y-2">
      {places.map((place, idx) => (
        <div key={idx} className="flex items-center justify-between text-sm">
          <span className="text-gray-700">{place.name}</span>
          <span className="text-gray-500 text-xs">{place.distance}</span>
        </div>
      ))}
    </div>
  </div>
);

export default PropertyDetail;
