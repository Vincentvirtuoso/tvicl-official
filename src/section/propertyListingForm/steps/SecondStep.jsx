import { LuLightbulb, LuTriangleAlert } from "react-icons/lu";
import { nigerianStates } from "../../../assets/propertyListingForm";

const SecondStep = ({ formData, handleChange, errors }) => {
  const addressField = formData.address || {};
  const locationField = formData.location || { coordinates: [0, 0] };

  return (
    <div className="space-y-6">
      <div className="">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Property Location
        </h2>
        <p className="text-gray-600">Where is your property located?</p>
      </div>

      {/* Street Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Street Address
        </label>
        <input
          type="text"
          name="address.street"
          value={addressField.street || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-gray-400/20 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all"
          placeholder="e.g., 123 Admiralty Way"
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional but recommended for better property identification
        </p>
      </div>

      {/* Area & City (Required) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Area / Neighborhood *
          </label>
          <input
            type="text"
            name="address.area"
            value={addressField.area || ""}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.area ? "border-red-500 bg-red-50" : "border-gray-400/20"
            }`}
            placeholder="e.g., Lekki Phase 1, Ikeja GRA, Maitama"
          />
          {errors.area && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>
                <LuTriangleAlert className="inline-flex mr-1" />
              </span>
              {errors.area}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="address.city"
            value={addressField.city || ""}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.city ? "border-red-500 bg-red-50" : "border-gray-400/20"
            }`}
            placeholder="e.g., Lagos, Abuja, Port Harcourt"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>
                <LuTriangleAlert className="inline-flex mr-1" />
              </span>
              {errors.city}
            </p>
          )}
        </div>
      </div>

      {/* State & LGA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State *
          </label>
          <select
            name="address.state"
            value={addressField.state || ""}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.state ? "border-red-500 bg-red-50" : "border-gray-400/20"
            }`}
          >
            <option value="">Select state</option>
            {nigerianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>
                <LuTriangleAlert className="inline-flex mr-1" />
              </span>
              {errors.state}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            LGA (Local Government Area)
          </label>
          <input
            type="text"
            name="address.lga"
            value={addressField.lga || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-400/20 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all"
            placeholder="e.g., Eti-Osa, Ikeja"
          />
        </div>
      </div>

      {/* Postal Code & Landmark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            name="address.postalCode"
            value={addressField.postalCode || ""}
            onChange={handleChange}
            maxLength={6}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.postalCode
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20"
            }`}
            placeholder="e.g., 101245"
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">6 digits</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Landmark
          </label>
          <input
            type="text"
            name="address.landmark"
            value={addressField.landmark || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-400/20 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all"
            placeholder="e.g., Near Shoprite Mall, Opposite Police Station"
          />
          <p className="text-xs text-gray-500 mt-1">
            Helps buyers find your property easily
          </p>
        </div>
      </div>

      {/* GPS Coordinates */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          GPS Coordinates (Optional)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Add precise location coordinates for map display
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              name="location.coordinates[1]"
              value={locationField.coordinates?.[1] || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                errors.latitude
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20"
              }`}
              placeholder="e.g., 6.4541"
            />
            {errors.latitude && (
              <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Range: -90 to 90</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              name="location.coordinates[0]"
              value={locationField.coordinates?.[0] || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                errors.longitude
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400/20"
              }`}
              placeholder="e.g., 3.3947"
            />
            {errors.longitude && (
              <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Range: -180 to 180</p>
          </div>
        </div>
      </div>

      {/* Helper Card */}
      <div className="bg-blue-400/10 border-2 border-blue-200 rounded-lg p-3">
        <h4 className="font-semibold text-blue-900 mb-2 text-sm">
          <LuLightbulb className="inline-flex mr-1" /> Pro Tip
        </h4>
        <p className="text-xs text-blue-800">
          You can get GPS coordinates from Google Maps by right-clicking on your
          property location and selecting the coordinates that appear.
        </p>
      </div>
    </div>
  );
};

export default SecondStep;
