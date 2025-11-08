import React from "react";
import { FiHome } from "react-icons/fi";
import {
  LuCheck,
  LuMapPin,
  LuCreditCard,
  LuFileText,
  LuUser,
  LuInfo,
  LuHouse,
  LuImage,
  LuFile,
} from "react-icons/lu";
import { Loader } from "../../../components/common/Loader";

const ReviewStep = ({ formData, isLoading, setStep }) => {
  const {
    title,
    description,
    propertyType,
    flatType,
    listingType,
    address,
    location,
    bedrooms,
    bathrooms,
    kitchens,
    balconies,
    floor,
    totalFloors,
    floorSizeValue,
    floorSizeUnit,
    carpetAreaValue,
    carpetAreaUnit,
    media = [],
    price,
    paymentPlans = [],
    rentalDetails,
    transactionType,
    furnishingStatus,
    propertyCondition,
    possessionStatus,
    availableFrom,
    yearBuilt,
    parking,
    amenities,
    utilities,
    facing,
    additionalRooms = [],
    highlights,
    contactPerson,
    legalDocuments,
  } = formData;

  const truncate = (text = "", maxLength = 50) => {
    if (!text) return "—";

    const cleaned = text.replace(/(\b\w+\b)(\1)+/gi, "$1") || "";

    // Truncate if too long
    return cleaned.length > maxLength
      ? `${cleaned.substring(0, maxLength)}...`
      : cleaned;
  };

  // Get images for preview (cover, then gallery images)
  const getPreviewImages = () => {
    const images = media.filter((m) => m.type === "image");
    const coverImage = images.find(
      (img) => img.category === "cover" || img.isPrimary
    );
    const galleryImages = images.filter(
      (img) => img?.subCategory === "gallery"
    );

    const preview = [];
    if (coverImage) preview.push(coverImage);

    const remaining = galleryImages.filter(
      (img) => img.url !== coverImage?.url
    );
    preview.push(...remaining.slice(0, coverImage ? 2 : 3));

    return preview.slice(0, 3);
  };

  const previewImages = getPreviewImages();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-yellow-100 rounded-full p-4 mb-4">
          <LuCheck className="text-yellow-600 w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Review & Submit
        </h2>
        <p className="text-gray-600 max-w-2xl text-center">
          Please review your property details before submission. Once confirmed,
          your listing will be published.
        </p>
      </div>

      {/* Image Preview Section */}
      {previewImages.length > 0 && (
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <LuImage className="text-yellow-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                Property Images
              </h3>
              <span className="ml-auto text-sm text-gray-500">
                {media.filter((m) => m.type === "image").length} image(s)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {previewImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group aspect-video rounded-lg overflow-hidden bg-gray-100"
                >
                  <img
                    src={img.url}
                    alt={img.caption || `Property image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  {img.isPrimary && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      Cover
                    </div>
                  )}
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-sm font-medium truncate">
                        {img.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4 mb-6 ">
        {/* Basic Info */}
        <SummaryCard
          setStep={setStep}
          step={1}
          icon={<FiHome />}
          title="Basic Information"
        >
          <InfoRow label="Title" value={title} />
          <InfoRow label="Property Type" value={propertyType} />
          {flatType && <InfoRow label="Flat Type" value={flatType} />}
          <InfoRow label="Listing Type" value={listingType} />
          {transactionType && (
            <InfoRow label="Transaction Type" value={transactionType} />
          )}
          <div className="pt-2 border-t border-gray-100 mt-2">
            <p className="text-xs text-gray-500 mb-1">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-wrap">
              {truncate(description, 250)}
            </p>
          </div>
        </SummaryCard>

        {/* Address */}
        <SummaryCard
          setStep={setStep}
          step={2}
          icon={<LuMapPin />}
          title="Location"
        >
          <InfoRow label="Street" value={address?.street} />
          <InfoRow label="Area" value={address?.area} />
          <InfoRow label="City" value={address?.city} />
          <InfoRow label="State" value={address?.state} />
          <InfoRow label="LGA" value={address?.lga} />
          <InfoRow label="Postal Code" value={address?.postalCode} />
          <InfoRow label="Landmark" value={address?.landmark} />
          {location?.coordinates?.[0] && location?.coordinates?.[1] && (
            <div className="pt-2 border-t border-gray-100 mt-2">
              <p className="text-xs text-gray-500">Coordinates</p>
              <p className="text-sm text-gray-700 font-mono">
                {location.coordinates[1].toFixed(6)},{" "}
                {location.coordinates[0].toFixed(6)}
              </p>
            </div>
          )}
        </SummaryCard>

        {/* Room Details */}
        <SummaryCard
          setStep={setStep}
          step={1}
          icon={<LuHouse />}
          title="Room & Floor Details"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <InfoRow label="Bedrooms" value={bedrooms} />
            <InfoRow label="Bathrooms" value={bathrooms} />
            <InfoRow label="Kitchens" value={kitchens} />
            <InfoRow label="Balconies" value={balconies} />
            <InfoRow label="Floor" value={floor} />
            <InfoRow label="Total Floors" value={totalFloors} />
          </div>
          {(floorSizeValue || carpetAreaValue) && (
            <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
              {floorSizeValue && (
                <InfoRow
                  label="Floor Size"
                  value={`${floorSizeValue} ${floorSizeUnit}`}
                />
              )}
              {carpetAreaValue && (
                <InfoRow
                  label="Carpet Area"
                  value={`${carpetAreaValue} ${carpetAreaUnit}`}
                />
              )}
            </div>
          )}
          {additionalRooms.length > 0 && (
            <div className="pt-2 border-t border-gray-100 mt-2">
              <InfoRow
                label="Additional Rooms"
                value={additionalRooms.join(", ")}
              />
            </div>
          )}
        </SummaryCard>

        {/* Pricing */}
        <SummaryCard
          setStep={setStep}
          step={3}
          icon={<LuCreditCard />}
          title="Pricing & Payment"
        >
          <InfoRow
            label="Price"
            value={
              price?.amount
                ? `${price.currency} ${price.amount.toLocaleString()}${
                    price.negotiable ? " (Negotiable)" : ""
                  }`
                : "—"
            }
          />

          {listingType === "For Rent" && rentalDetails && (
            <div className="space-y-1 pt-2 border-t border-gray-100 mt-2">
              <InfoRow
                label="Rent Frequency"
                value={rentalDetails.rentFrequency}
              />
              <InfoRow
                label="Lease Duration"
                value={
                  rentalDetails.leaseDurationMonths
                    ? `${rentalDetails.leaseDurationMonths} months`
                    : "—"
                }
              />
              <InfoRow
                label="Deposit"
                value={
                  rentalDetails.depositAmount
                    ? `${
                        price.currency
                      } ${rentalDetails.depositAmount.toLocaleString()}`
                    : "—"
                }
              />
              {rentalDetails.serviceCharge?.amount && (
                <InfoRow
                  label="Service Charge"
                  value={`${
                    price.currency
                  } ${rentalDetails.serviceCharge.amount.toLocaleString()} / ${
                    rentalDetails.serviceCharge.frequency
                  }`}
                />
              )}
              {rentalDetails.agencyFeePercent && (
                <InfoRow
                  label="Agency Fee"
                  value={`${rentalDetails.agencyFeePercent}%`}
                />
              )}
              {rentalDetails.cautionFee && (
                <InfoRow
                  label="Caution Fee"
                  value={`${
                    price.currency
                  } ${rentalDetails.cautionFee.toLocaleString()}`}
                />
              )}
              <InfoRow
                label="Pets Allowed"
                value={rentalDetails.petsAllowed ? "Yes" : "No"}
              />
              <InfoRow
                label="Preferred Tenants"
                value={rentalDetails.preferredTenants}
              />
            </div>
          )}

          {paymentPlans.length > 0 && (
            <div className="pt-2 border-t border-gray-100 mt-2">
              <p className="text-xs text-gray-500 mb-1">
                Payment Plans in <b>{transactionType}</b>
              </p>
              <div className="flex flex-wrap gap-2">
                {paymentPlans.map((plan, idx) => (
                  <div
                    key={idx}
                    className="p-2 border border-gray-300 rounded-md bg-gray-50 flex flex-col gap-1 flex-1"
                  >
                    <p className="text-sm font-medium">
                      {plan.name || "Unnamed Plan"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Type: <span className="font-semibold">{plan.type}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Amount:{" "}
                      <span className="font-semibold">
                        {plan.currency || "NGN"}{" "}
                        {plan.amount?.toLocaleString() || 0}
                      </span>
                    </p>
                    {plan.dueInMonths !== undefined && (
                      <p className="text-xs text-gray-500">
                        Due in:{" "}
                        <span className="font-semibold">
                          {plan.dueInMonths} month(s)
                        </span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </SummaryCard>

        {/* Condition */}
        <SummaryCard
          setStep={setStep}
          step={4}
          icon={<LuInfo />}
          title="Property Condition"
        >
          <InfoRow label="Furnishing Status" value={furnishingStatus} />
          <InfoRow label="Property Condition" value={propertyCondition} />
          <InfoRow label="Possession Status" value={possessionStatus} />
          <InfoRow label="Available From" value={availableFrom} />
          <InfoRow label="Year Built" value={yearBuilt} />
          <InfoRow label="Facing Direction" value={facing} />
          {highlights?.length > 0 && (
            <div className="pt-2 border-t border-gray-100 mt-2">
              <p className="text-xs text-gray-500 mb-1">Highlights</p>
              {highlights?.map((highlight) => (
                <p className="text-sm text-gray-700">{highlight}</p>
              ))}
            </div>
          )}
        </SummaryCard>

        {/* Facilities */}
        <SummaryCard
          setStep={setStep}
          step={4}
          icon={<LuFileText />}
          title="Facilities & Amenities"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <InfoRow label="Covered Parking" value={parking?.covered || 0} />
            <InfoRow label="Open Parking" value={parking?.open || 0} />
          </div>

          {amenities?.length > 0 && (
            <div className="pt-2 border-t border-gray-100 mt-2">
              <p className="text-xs text-gray-500 mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-50 text-yellow-700 text-xs font-medium px-2 py-1 rounded"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
            <InfoRow label="Water Supply" value={utilities?.waterSupply} />
            <InfoRow label="Power Backup" value={utilities?.powerBackup} />
            <InfoRow label="Gas Connection" value={utilities?.gas} />
          </div>
        </SummaryCard>

        {/* Contact */}
        <SummaryCard
          setStep={setStep}
          step={6}
          icon={<LuUser />}
          title="Contact Information"
        >
          {contactPerson?.map((contact, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3 mb-2 last:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  {contact.role}
                </span>
              </div>
              <InfoRow label="Name" value={contact.name} />
              <InfoRow label="Phone" value={contact.phone} />
              <InfoRow label="Email" truncate value={contact.email} />
            </div>
          ))}
        </SummaryCard>

        {/* Legal Documents */}
        {legalDocuments && (
          <SummaryCard
            setStep={setStep}
            step={5}
            icon={<LuFile />}
            title="Legal Documents"
          >
            <div className="space-y-2">
              <DocStatus label="C of O" doc={legalDocuments.cOfO} />
              <DocStatus label="Survey Plan" doc={legalDocuments.surveyPlan} />
              <DocStatus
                label="Deed of Assignment"
                doc={legalDocuments.deedOfAssignment}
              />
              <DocStatus
                label="Governor's Consent"
                doc={legalDocuments.governorsConsent}
              />
            </div>
          </SummaryCard>
        )}
      </div>

      {/* Media Summary */}
      {media.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 border border-yellow-100">
          <h3 className="font-semibold text-gray-800 mb-3">Media Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {media.filter((m) => m.type === "image").length}
              </p>
              <p className="text-gray-600">Images</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {media.filter((m) => m.type === "video").length}
              </p>
              <p className="text-gray-600">Video URLs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {media.filter((m) => m.category === "floorPlan").length}
              </p>
              <p className="text-gray-600">Floor Plans</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {media.filter((m) => m.type === "document").length}
              </p>
              <p className="text-gray-600">Documents</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          // onClick={onSubmit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl flex items-center transition-all transform hover:scale-105 active:scale-95"
        >
          {isLoading ? <Loader /> : "Submit Property Listing"}
        </button>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ icon, title, children, step, setStep }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <span className="text-yellow-500 text-xl">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
      <div className="border-t border-gray-100 mt-4 pt-3 flex justify-end">
        <button
          type="button"
          className="px-4 py-1.5 bg-primary text-sm rounded-full text-white"
          onClick={() => {
            console.log("test");
            setStep(step);
          }}
        >
          Go to step
        </button>
      </div>
    </div>
  );
};

// Info Row Component
const InfoRow = ({ label, value, truncate = false }) => (
  <div className="flex justify-between items-start gap-4">
    <span className="text-xs text-gray-500 font-medium min-w-[100px]">
      {label}:
    </span>
    <span
      className={`text-sm text-gray-800 font-medium text-right flex-1 ${
        truncate && "truncate"
      }`}
    >
      {value || "—"}
    </span>
  </div>
);

// Document Status Component
const DocStatus = ({ label, doc }) => (
  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
    <span className="text-sm text-gray-700">{label}</span>
    <div className="flex items-center gap-2">
      {doc?.present ? (
        <span className="text-xs font-medium text-green-600">✓ Available</span>
      ) : (
        <span className="text-xs text-gray-400">Not provided</span>
      )}
    </div>
  </div>
);

export default ReviewStep;
