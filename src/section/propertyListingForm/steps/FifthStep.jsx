import { memo } from "react";
import {
  additionalRoomsList,
  amenitiesList,
} from "../../../assets/propertyListingForm";

const FifthStep = ({ handleChange, formData, setFormData }) => {
  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleAdditionalRoomToggle = (room) => {
    setFormData((prev) => ({
      ...prev,
      additionalRooms: prev.additionalRooms.includes(room)
        ? prev.additionalRooms.filter((r) => r !== room)
        : [...prev.additionalRooms, room],
    }));
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Amenities & Features
      </h2>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Additional Rooms
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {additionalRoomsList.map((room) => (
            <label key={room} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.additionalRooms.includes(room)}
                onChange={() => handleAdditionalRoomToggle(room)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{room}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Highlights
        </label>
        <textarea
          name="highlights"
          value={formData.highlights}
          onChange={handleChange}
          rows={4}
          placeholder="E.g., Newly painted, 24/7 security, Sea view..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
        />
      </div>
    </div>
  );
};

export default memo(FifthStep);
