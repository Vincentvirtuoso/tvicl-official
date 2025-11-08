import { LuTriangleAlert } from "react-icons/lu";
import { flatTypes, propertyTypes } from "../../../assets/propertyListingForm";

const FirstStep = ({ formData, errors, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Basic Information
        </h2>
        <p className="text-gray-600">Tell us about your property</p>
      </div>

      {/* Property Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Property Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
            errors.title ? "border-red-500 bg-red-50" : "border-gray-400/20"
          }`}
          placeholder="e.g., Luxury 3 Bedroom Flat in Lekki Phase 1"
          maxLength={250}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <LuTriangleAlert className="inline-flex mr-1" /> {errors.title}
          </p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          {formData.title?.length || 0}/250 characters
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Property Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
            errors.description
              ? "border-red-500 bg-red-50"
              : "border-gray-400/20"
          }`}
          placeholder="Describe your property in detail... Include key features, nearby amenities, and what makes it special."
          maxLength={5000}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <LuTriangleAlert className="inline-flex mr-1" />{" "}
            {errors.description}
          </p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          {formData.description?.length || 0}/5000 characters (minimum 50
          recommended)
        </p>
      </div>

      {/* Property Type & Listing Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Type *
          </label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.propertyType
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20"
            }`}
          >
            <option value="">Select property type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <LuTriangleAlert className="inline-flex mr-1" />{" "}
              {errors.propertyType}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Listing Type *
          </label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.listingType
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20"
            }`}
          >
            <option value="">Select listing type</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="Short Let">Short Let</option>
          </select>
          {errors.listingType && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <LuTriangleAlert className="inline-flex mr-1" />{" "}
              {errors.listingType}
            </p>
          )}
        </div>
      </div>

      {/* Flat Type (Conditional) */}
      {["Flat/Apartment", "Serviced Apartment", "Block of Flats"].includes(
        formData.propertyType
      ) && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Flat Type *
          </label>
          <select
            name="flatType"
            value={formData.flatType}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.flatType
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20"
            }`}
          >
            <option value="">Select flat type</option>
            {flatTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.flatType && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <LuTriangleAlert className="inline-flex mr-1" /> {errors.flatType}
            </p>
          )}
        </div>
      )}

      {/* Room Counts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Room Configuration
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                errors.bedrooms
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20"
              }`}
            />
            {errors.bedrooms && (
              <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                errors.bathrooms
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20"
              }`}
            />
            {errors.bathrooms && (
              <p className="text-red-500 text-xs mt-1">{errors.bathrooms}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kitchens
            </label>
            <input
              type="number"
              name="kitchens"
              value={formData.kitchens}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                errors.kitchens
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20"
              }`}
            />
            {errors.kitchens && (
              <p className="text-red-500 text-xs mt-1">{errors.kitchens}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Balconies
            </label>
            <input
              type="number"
              name="balconies"
              value={formData.balconies}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                errors.balconies
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20"
              }`}
            />
            {errors.balconies && (
              <p className="text-red-500 text-xs mt-1">{errors.balconies}</p>
            )}
          </div>
        </div>
      </div>

      {/* Floor Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Floor Details (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Floor Number
            </label>
            <input
              type="number"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                errors.floor ? "border-red-500 bg-red-50" : "border-gray-400/20"
              }`}
              placeholder="e.g., 3"
            />
            {errors.floor && (
              <p className="text-red-500 text-sm mt-1">{errors.floor}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Floors in Building
            </label>
            <input
              type="number"
              name="totalFloors"
              value={formData.totalFloors}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                errors.totalFloors
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20"
              }`}
              placeholder="e.g., 5"
            />
            {errors.totalFloors && (
              <p className="text-red-500 text-sm mt-1">{errors.totalFloors}</p>
            )}
          </div>
        </div>
      </div>

      {/* Property Sizes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Property Size (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Floor Size
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="floorSizeValue"
                value={formData.floorSizeValue}
                onChange={handleChange}
                min="0"
                className={`flex-1 px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                  errors.floorSizeValue
                    ? "border-red-500 bg-red-50"
                    : "border-gray-400/20"
                }`}
                placeholder="e.g., 1200"
              />
              <select
                name="floorSizeUnit"
                value={formData.floorSizeUnit}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-gray-400/20 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500"
              >
                <option value="sqft">sq ft</option>
                <option value="sqm">sq m</option>
                <option value="sqyd">sq yd</option>
              </select>
            </div>
            {errors.floorSizeValue && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floorSizeValue}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Carpet Area
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="carpetAreaValue"
                value={formData.carpetAreaValue}
                onChange={handleChange}
                min="0"
                className={`flex-1 px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                  errors.carpetAreaValue
                    ? "border-red-500 bg-red-50"
                    : "border-gray-400/20"
                }`}
                placeholder="e.g., 1000"
              />
              <select
                name="carpetAreaUnit"
                value={formData.carpetAreaUnit}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-gray-400/20 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500"
              >
                <option value="sqft">sq ft</option>
                <option value="sqm">sq m</option>
                <option value="sqyd">sq yd</option>
              </select>
            </div>
            {errors.carpetAreaValue && (
              <p className="text-red-500 text-sm mt-1">
                {errors.carpetAreaValue}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Note: Carpet area should not exceed floor size
            </p>
          </div>
        </div>
      </div>

      {/* Year Built & Parking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Year Built (Optional)
          </label>
          <input
            type="number"
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear() + 5}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.yearBuilt
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20"
            }`}
            placeholder="e.g., 2020"
          />
          {errors.yearBuilt && (
            <p className="text-red-500 text-sm mt-1">{errors.yearBuilt}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Covered Parking
          </label>
          <input
            type="number"
            name="parking.covered"
            value={formData.parking?.covered || 0}
            onChange={handleChange}
            min="0"
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.parkingCovered
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20"
            }`}
            placeholder="0"
          />
          {errors.parkingCovered && (
            <p className="text-red-500 text-sm mt-1">{errors.parkingCovered}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Open Parking
          </label>
          <input
            type="number"
            name="parking.open"
            value={formData.parking?.open || 0}
            onChange={handleChange}
            min="0"
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.parkingOpen
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20"
            }`}
            placeholder="0"
          />
          {errors.parkingOpen && (
            <p className="text-red-500 text-sm mt-1">{errors.parkingOpen}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
