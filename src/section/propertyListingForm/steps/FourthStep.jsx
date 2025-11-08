import { memo } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import {
  amenitiesList,
  additionalRoomsList,
  waterSupply,
  powerBackup,
  validGas,
  validFacing,
} from "../../../assets/propertyListingForm";
import HighlightsInput from "../HighlightsInput";

const FourthStep = ({ handleChange, errors, formData }) => {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Property Details
        </h2>
        <p className="text-gray-600">
          Provide detailed information about the property’s current condition
          and facilities.
        </p>
      </div>

      {/* Furnishing / Condition / Possession */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Furnishing */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Furnishing Status *
          </label>
          <select
            name="furnishingStatus"
            value={formData.furnishingStatus || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 transition-all ${
              errors.furnishingStatus
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20 focus:border-yellow-500"
            }`}
          >
            <option value="">Select</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
          {errors.furnishingStatus && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <LuTriangleAlert className="inline-flex" />{" "}
              {errors.furnishingStatus}
            </p>
          )}
        </div>

        {/* Property Condition */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Condition *
          </label>
          <select
            name="propertyCondition"
            value={formData.propertyCondition || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 transition-all ${
              errors.propertyCondition
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20 focus:border-yellow-500"
            }`}
          >
            <option value="">Select</option>
            <option value="New">New</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Needs Renovation">Needs Renovation</option>
          </select>
          {errors.propertyCondition && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <LuTriangleAlert className="inline-flex" />{" "}
              {errors.propertyCondition}
            </p>
          )}
        </div>

        {/* Possession Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Possession Status *
          </label>
          <select
            name="possessionStatus"
            value={formData.possessionStatus || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 transition-all ${
              errors.possessionStatus
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20 focus:border-yellow-500"
            }`}
          >
            <option value="">Select</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
          </select>
          {errors.possessionStatus && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <LuTriangleAlert className="inline-flex" />{" "}
              {errors.possessionStatus}
            </p>
          )}
        </div>

        {/* Available From */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Available From *
          </label>
          <input
            type="date"
            name="availableFrom"
            value={formData.availableFrom || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 transition-all ${
              errors.availableFrom
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20 focus:border-yellow-500"
            }`}
          />
          {errors.availableFrom && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <LuTriangleAlert className="inline-flex" /> {errors.availableFrom}
            </p>
          )}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Amenities
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {amenitiesList.map((a) => (
            <label
              key={a}
              className="flex items-center space-x-2 text-gray-700"
            >
              <input
                type="checkbox"
                name="amenities"
                value={a}
                checked={formData.amenities?.includes(a) || false}
                onChange={handleChange}
                className="rounded text-yellow-600 focus:ring-yellow-500"
              />
              <span className="text-sm">{a}</span>
            </label>
          ))}
        </div>
        {errors.amenities && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <LuTriangleAlert className="inline-flex" /> {errors.amenities}
          </p>
        )}
      </div>

      {/* Utilities */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Utilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Water Supply
            </label>
            <select
              name="utilities.waterSupply"
              value={formData.utilities?.waterSupply || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 transition-all ${
                errors.waterSupply
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20 focus:border-yellow-500"
              }`}
            >
              <option value="">Select</option>
              {waterSupply.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            {errors.waterSupply && (
              <p className="text-red-500 text-sm mt-1">{errors.waterSupply}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Power Backup
            </label>
            <select
              name="utilities.powerBackup"
              value={formData.utilities?.powerBackup || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 transition-all ${
                errors.powerBackup
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20 focus:border-yellow-500"
              }`}
            >
              <option value="">Select</option>
              {powerBackup.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.powerBackup && (
              <p className="text-red-500 text-sm mt-1">{errors.powerBackup}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gas
            </label>
            <select
              name="utilities.gas"
              value={formData.utilities?.gas || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 transition-all ${
                errors.gas
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20 focus:border-yellow-500"
              }`}
            >
              <option value="">Select</option>
              {validGas.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.gas && (
              <p className="text-red-500 text-sm mt-1">{errors.gas}</p>
            )}
          </div>
        </div>
      </div>

      {/* Facing */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Facing / Orientation
        </label>
        <select
          name="facing"
          value={formData.facing || ""}
          onChange={handleChange}
          className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 transition-all ${
            errors.facing
              ? "border-red-500 bg-red-50"
              : "border-gray-400/20 focus:border-yellow-500"
          }`}
        >
          <option value="">Select</option>
          {validFacing.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        {errors.facing && (
          <p className="text-red-500 text-sm mt-1">{errors.facing}</p>
        )}
      </div>

      <HighlightsInput formData={formData} onChange={handleChange} />

      {/* Additional Rooms */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Rooms
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {additionalRoomsList.map((room) => (
            <label
              key={room}
              className="flex items-center space-x-2 text-gray-700"
            >
              <input
                type="checkbox"
                name="additionalRooms"
                value={room}
                checked={formData?.additionalRooms?.includes(room) || false}
                onChange={handleChange}
                className="rounded text-yellow-600 focus:ring-yellow-500"
              />
              <span className="text-sm">{room}</span>
            </label>
          ))}
        </div>
        {errors.additionalRooms && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <LuTriangleAlert className="inline-flex" /> {errors.additionalRooms}
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(FourthStep);
