import { memo } from "react";
import {
  LuTriangleAlert,
  LuLightbulb,
  LuUserPlus,
  LuTrash2,
} from "react-icons/lu";
import { isValidEmail, isValidPhone } from "../../../utils/validators";
import { useAuth } from "../../../hooks/useAuth";

const SixthStep = ({
  formData,
  handleChange,
  errors,
  addContact,
  removeContact,
  setFormData, // ✅ make sure parent passes this in
}) => {
  const contacts = formData.contactPerson || [];
  const { user } = useAuth();

  // === Use My Data Handler ===
  const handleUseMyData = () => {
    if (!user) {
      alert("You need to be logged in to use your data.");
      return;
    }

    const newContact = {
      name: user.fullName || "",
      phone: user.phone || "",
      email: user.email || "",
      role:
        user.activeRole === "agent" ||
        user.activeRole === "estate" ||
        user.roles.includes("agent")
          ? "Agent"
          : "Owner",
    };

    // If no contact exists, create one
    if (contacts.length === 0) {
      setFormData((prev) => ({
        ...prev,
        contactPerson: [newContact],
      }));
    } else {
      // Update first contact with user data
      const updatedContacts = [...contacts];
      updatedContacts[0] = { ...updatedContacts[0], ...newContact };
      setFormData((prev) => ({
        ...prev,
        contactPerson: updatedContacts,
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Contact Details
          </h2>
          <p className="text-gray-600">
            Add one or more contact persons for this property listing.
          </p>
        </div>
        <button
          type="button"
          onClick={handleUseMyData}
          className="text-sm bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-all whitespace-nowrap"
        >
          Use My Data
        </button>
      </div>

      {/* Contact Persons */}
      {contacts.length > 0 ? (
        contacts.map((contact, index) => {
          const emailValid =
            contact.email && contact.email.trim().length > 0
              ? isValidEmail(contact.email)
              : null;
          const phoneValid =
            contact.phone && contact.phone.trim().length > 0
              ? isValidPhone(contact.phone)
              : null;

          return (
            <div
              key={index}
              className="border-2 border-gray-400/20 rounded-xl p-5 space-y-4 bg-gray-50/30 relative transition-all"
            >
              {/* Remove Button */}
              {contacts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContact(index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                  title="Remove Contact"
                >
                  <LuTrash2 className="w-5 h-5" />
                </button>
              )}

              <h3 className="font-semibold text-gray-800 text-lg mb-1">
                Contact #{index + 1}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name={`contactPerson[${index}].name`}
                    value={contact.name || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                      errors[`contact_${index}_name`]
                        ? "border-red-500 bg-red-50"
                        : "border-gray-400/20"
                    }`}
                    placeholder="Full name"
                  />
                  {errors[`contact_${index}_name`] && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <LuTriangleAlert className="inline-flex mr-1" />
                      {errors[`contact_${index}_name`]}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="text"
                    name={`contactPerson[${index}].phone`}
                    value={contact.phone || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                      phoneValid === false || errors[`contact_${index}_phone`]
                        ? "border-red-500 bg-red-50"
                        : phoneValid === true
                        ? "border-green-500"
                        : "border-gray-400/20"
                    }`}
                    placeholder="+2348012345678"
                  />
                  {phoneValid === false &&
                    !errors[`contact_${index}_phone`] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <LuTriangleAlert className="inline-flex mr-1" />
                        Invalid Nigerian phone number
                      </p>
                    )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name={`contactPerson[${index}].email`}
                    value={contact.email || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                      emailValid === false || errors[`contact_${index}_email`]
                        ? "border-red-500 bg-red-50"
                        : emailValid === true
                        ? "border-green-500"
                        : "border-gray-400/20"
                    }`}
                    placeholder="you@example.com"
                  />
                  {emailValid === false &&
                    !errors[`contact_${index}_email`] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <LuTriangleAlert className="inline-flex mr-1" />
                        Invalid email format
                      </p>
                    )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    name={`contactPerson[${index}].role`}
                    value={contact.role || ""}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
                      errors[`contact_${index}_role`]
                        ? "border-red-500 bg-red-50"
                        : "border-gray-400/20"
                    }`}
                  >
                    <option value="">Select Role</option>
                    <option value="Owner">Owner</option>
                    <option value="Agent">Agent</option>
                    <option value="Builder">Builder</option>
                    <option value="Realtor">Realtor</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-sm italic">
          No contacts added yet. Please add at least one.
        </p>
      )}

      {/* Add Contact Button */}
      <button
        type="button"
        onClick={addContact}
        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-all"
      >
        <LuUserPlus /> Add Another Contact
      </button>

      {/* Pro Tip */}
      <div className="bg-blue-400/10 border-2 border-blue-200 rounded-lg p-3">
        <h4 className="font-semibold text-blue-900 mb-2 text-sm">
          <LuLightbulb className="inline-flex mr-1" /> Pro Tip
        </h4>
        <p className="text-xs text-blue-800">
          Add multiple contact persons (e.g., Owner, Agent, Builder) for better
          communication and faster property verification.
        </p>
      </div>
    </div>
  );
};

export default memo(SixthStep);
