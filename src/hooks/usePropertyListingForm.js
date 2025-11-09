import { useState } from "react";
import {
  additionalRoomsList,
  amenitiesList,
  docTypes,
  fields,
  flatTypes,
  listingTypes,
  nigerianStates,
  placeTypes,
  powerBackup,
  propertyTypes,
  transactionTypes,
  validFacing,
  validGas,
  waterSupply,
} from "../assets/propertyListingForm";

import { isValidEmail, isValidPhone, isValidUrl } from "../utils/validators";

export const usePropertyListingForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(fields);
  const [canProceedStep5, setCanProceedStep5] = useState(false);
  const [checkingStep5, setCheckingStep5] = useState(false);
  const [paymentPlans, setPaymentPlans] = useState([
    {
      name: "Initial Deposit",
      amount: 1000000,
      type: "Deposit",
      dueInMonths: 0,
    },
    {
      name: "First Milestone",
      amount: 2000000,
      type: "Milestone",
      dueInMonths: 6,
    },
  ]);

  const [errors, setErrors] = useState({});

  const validateStep = (currentStep) => {
    const newErrors = {};

    // Helper functions

    const currentYear = new Date().getFullYear();

    if (currentStep === 1) {
      // Title validation
      if (!formData.title?.trim()) {
        newErrors.title = "Title is required";
      } else if (formData.title.length > 250) {
        newErrors.title = "Title must not exceed 250 characters";
      }

      // Description validation
      if (!formData.description?.trim()) {
        newErrors.description = "Description is required";
      } else if (formData.description.length > 5000) {
        newErrors.description = "Description must not exceed 5000 characters";
      } else if (formData.description.length < 50) {
        newErrors.description = "Description should be at least 50 characters";
      }

      if (!formData.propertyType) {
        newErrors.propertyType = "Property type is required";
      } else if (!propertyTypes.includes(formData.propertyType)) {
        newErrors.propertyType = "Invalid property type selected";
      }

      // Flat Type validation (conditional)
      const requiresFlatType = [
        "Flat/Apartment",
        "Serviced Apartment",
        "Block of Flats",
      ];
      if (requiresFlatType.includes(formData.propertyType)) {
        if (!formData.flatType) {
          newErrors.flatType = "Flat type is required for this property type";
        } else if (!flatTypes.includes(formData.flatType)) {
          newErrors.flatType = "Invalid flat type selected";
        }
      }

      // Listing Type validation

      if (!formData.listingType) {
        newErrors.listingType = "Listing type is required";
      } else if (!listingTypes.includes(formData.listingType)) {
        newErrors.listingType = "Invalid listing type";
      }

      // Room validations (non-negative)
      if (formData.bedrooms < 0) {
        newErrors.bedrooms = "Bedrooms cannot be negative";
      }
      if (formData.bathrooms < 0) {
        newErrors.bathrooms = "Bathrooms cannot be negative";
      }
      if (formData.kitchens < 0) {
        newErrors.kitchens = "Kitchens cannot be negative";
      }
      if (formData.balconies < 0) {
        newErrors.balconies = "Balconies cannot be negative";
      }

      // Floor details
      if (formData.floor && formData.floor < 0) {
        newErrors.floor = "Floor number cannot be negative";
      }
      if (formData.totalFloors && formData.totalFloors < 0) {
        newErrors.totalFloors = "Total floors cannot be negative";
      }
      if (
        formData.floor &&
        formData.totalFloors &&
        formData.floor > formData.totalFloors
      ) {
        newErrors.floor = "Floor number cannot exceed total floors";
      }

      // Size validations
      if (formData.floorSizeValue && Number(formData.floorSizeValue) < 0) {
        newErrors.floorSizeValue = "Floor size cannot be negative";
      }
      if (formData.carpetAreaValue && Number(formData.carpetAreaValue) < 0) {
        newErrors.carpetAreaValue = "Carpet area cannot be negative";
      }
      if (
        formData.floorSizeValue &&
        formData.carpetAreaValue &&
        Number(formData.carpetAreaValue) > Number(formData.floorSizeValue)
      ) {
        newErrors.carpetAreaValue = "Carpet area cannot exceed floor size";
      }

      // Year Built validation
      if (formData.yearBuilt) {
        const year = Number(formData.yearBuilt);
        if (year < 1900 || year > currentYear + 5) {
          newErrors.yearBuilt = `Year built must be between 1900 and ${
            currentYear + 5
          }`;
        }
      }

      // Parking validation
      if (formData.parking?.covered < 0) {
        newErrors.parkingCovered = "Covered parking cannot be negative";
      }
      if (formData.parking?.open < 0) {
        newErrors.parkingOpen = "Open parking cannot be negative";
      }
    }

    if (currentStep === 2) {
      if (!formData.address?.area?.trim()) {
        newErrors.area = "Area is required (e.g., Ikeja, Lekki Phase 1)";
      }

      // City validation (required)
      if (!formData.address?.city?.trim()) {
        newErrors.city = "City is required";
      }

      // State validation (required)
      if (!formData.address?.state) {
        newErrors.state = "State is required";
      } else if (!nigerianStates.includes(formData.address.state)) {
        newErrors.state = "Please select a valid Nigerian state";
      }

      // Optional validations
      if (
        formData.address?.postalCode &&
        !/^\d{6}$/.test(formData.address.postalCode)
      ) {
        newErrors.postalCode = "Postal code must be 6 digits";
      }

      // Location coordinates validation
      if (formData.location?.coordinates) {
        const [lng, lat] = formData.location.coordinates;
        if (lng && (lng < -180 || lng > 180)) {
          newErrors.longitude = "Longitude must be between -180 and 180";
        }
        if (lat && (lat < -90 || lat > 90)) {
          newErrors.latitude = "Latitude must be between -90 and 90";
        }
      }
    }

    if (currentStep === 3) {
      // Price validation (required)
      if (!formData.price?.amount || Number(formData.price.amount) <= 0) {
        newErrors.priceAmount =
          "Valid price is required (must be greater than 0)";
      }

      // Price negotiable validation
      if (typeof formData.price?.negotiable !== "boolean") {
        formData.price.negotiable = false; // Set default
      }

      // Transaction Type (required for Sale)
      if (formData.listingType === "For Sale") {
        if (!formData.transactionType) {
          newErrors.transactionType =
            "Transaction type is required for sale listings";
        } else if (
          !transactionTypes.some(
            (type) => type.value === formData.transactionType
          )
        ) {
          newErrors.transactionType = "Invalid transaction type";
        }
      }

      // Payment Plans validation
      if (
        formData.paymentPlans &&
        Array.isArray(formData.paymentPlans) &&
        formData.paymentPlans.length > 0
      ) {
        formData.paymentPlans.forEach((plan, index) => {
          if (!plan.name?.trim()) {
            newErrors[`paymentPlan_${index}_name`] = `Payment plan #${
              index + 1
            }: Name is required`;
          }

          const validPlanTypes = ["Deposit", "Milestone", "Monthly", "Balloon"];
          if (!plan.type) {
            newErrors[`paymentPlan_${index}_type`] = `Payment plan #${
              index + 1
            }: Type is required`;
          } else if (!validPlanTypes.includes(plan.type)) {
            newErrors[`paymentPlan_${index}_type`] = `Payment plan #${
              index + 1
            }: Invalid type`;
          }

          if (!plan.amount || Number(plan.amount) <= 0) {
            newErrors[`paymentPlan_${index}_amount`] = `Payment plan #${
              index + 1
            }: Valid amount required`;
          }

          if (plan.dueInMonths !== undefined && Number(plan.dueInMonths) < 0) {
            newErrors[`paymentPlan_${index}_dueInMonths`] = `Payment plan #${
              index + 1
            }: Due months cannot be negative`;
          }
        });
      }

      // Rental Details validation (for Rent/Short Let)
      if (
        formData.listingType === "For Rent" ||
        formData.listingType === "Short Let"
      ) {
        const validFrequencies = ["Monthly", "Quarterly", "Yearly"];

        if (!formData.rentalDetails?.rentFrequency) {
          newErrors.rentFrequency = "Rent frequency is required";
        } else if (
          !validFrequencies.includes(formData.rentalDetails.rentFrequency)
        ) {
          newErrors.rentFrequency = "Invalid rent frequency";
        }

        // Deposit amount
        if (
          formData.rentalDetails?.depositAmount &&
          Number(formData.rentalDetails.depositAmount) < 0
        ) {
          newErrors.depositAmount = "Deposit amount cannot be negative";
        }

        // Lease duration
        if (formData.rentalDetails?.leaseDurationMonths) {
          const duration = Number(formData.rentalDetails.leaseDurationMonths);
          if (duration <= 0) {
            newErrors.leaseDurationMonths =
              "Lease duration must be greater than 0";
          }
        }

        // Lock-in period
        if (formData.rentalDetails?.lockInPeriodMonths) {
          const lockIn = Number(formData.rentalDetails.lockInPeriodMonths);
          if (lockIn < 0) {
            newErrors.lockInPeriodMonths = "Lock-in period cannot be negative";
          }
          if (
            formData.rentalDetails?.leaseDurationMonths &&
            lockIn > formData.rentalDetails.leaseDurationMonths
          ) {
            newErrors.lockInPeriodMonths =
              "Lock-in period cannot exceed lease duration";
          }
        }

        // Service charge
        if (formData.rentalDetails?.serviceCharge?.amount) {
          if (Number(formData.rentalDetails.serviceCharge.amount) < 0) {
            newErrors.serviceChargeAmount = "Service charge cannot be negative";
          }
          if (!formData.rentalDetails.serviceCharge.frequency) {
            newErrors.serviceChargeFrequency =
              "Service charge frequency is required";
          } else if (
            !validFrequencies.includes(
              formData.rentalDetails.serviceCharge.frequency
            )
          ) {
            newErrors.serviceChargeFrequency =
              "Invalid service charge frequency";
          }
        }

        // Agency fee
        if (formData.rentalDetails?.agencyFeePercent) {
          const fee = Number(formData.rentalDetails.agencyFeePercent);
          if (fee < 0 || fee > 100) {
            newErrors.agencyFeePercent =
              "Agency fee must be between 0 and 100%";
          }
        }

        // Caution fee
        if (
          formData.rentalDetails?.cautionFee &&
          Number(formData.rentalDetails.cautionFee) < 0
        ) {
          newErrors.cautionFee = "Caution fee cannot be negative";
        }

        // Preferred tenants
        const validTenants = ["Anyone", "Family", "Bachelor", "Company"];
        if (
          formData.rentalDetails?.preferredTenants &&
          !validTenants.includes(formData.rentalDetails.preferredTenants)
        ) {
          newErrors.preferredTenants = "Invalid preferred tenant type";
        }
      }
    }

    if (currentStep === 4) {
      // Furnishing Status (required)
      const validFurnishing = [
        "Unfurnished",
        "Semi-Furnished",
        "Fully Furnished",
      ];
      if (!formData.furnishingStatus) {
        newErrors.furnishingStatus = "Furnishing status is required";
      } else if (!validFurnishing.includes(formData.furnishingStatus)) {
        newErrors.furnishingStatus = "Invalid furnishing status";
      }

      // Property Condition (required)
      const validConditions = ["New", "Excellent", "Good", "Needs Renovation"];
      if (!formData.propertyCondition) {
        newErrors.propertyCondition = "Property condition is required";
      } else if (!validConditions.includes(formData.propertyCondition)) {
        newErrors.propertyCondition = "Invalid property condition";
      }

      // Possession Status (required)
      const validPossession = ["Ready to Move", "Under Construction"];
      if (!formData.possessionStatus) {
        newErrors.possessionStatus = "Possession status is required";
      } else if (!validPossession.includes(formData.possessionStatus)) {
        newErrors.possessionStatus = "Invalid possession status";
      }

      // Available From (required)
      if (!formData.availableFrom) {
        newErrors.availableFrom = "Available from date is required";
      } else {
        const availableDate = new Date(formData.availableFrom);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (availableDate < today) {
          newErrors.availableFrom = "Available date cannot be in the past";
        }
      }

      // Amenities validation
      if (formData.amenities && Array.isArray(formData.amenities)) {
        const invalidAmenities = formData.amenities.filter(
          (a) => !amenitiesList.includes(a)
        );
        if (invalidAmenities.length > 0) {
          newErrors.amenities = `Invalid amenities: ${invalidAmenities.join(
            ", "
          )}`;
        }
      }

      // Utilities validation

      if (
        formData.utilities?.waterSupply &&
        !waterSupply.includes(formData.utilities.waterSupply)
      ) {
        newErrors.waterSupply = "Invalid water supply option";
      }

      if (
        formData.utilities?.powerBackup &&
        !powerBackup.includes(formData.utilities.powerBackup)
      ) {
        newErrors.powerBackup = "Invalid power backup option";
      }

      if (
        formData.utilities?.gas &&
        !validGas.includes(formData.utilities.gas)
      ) {
        newErrors.gas = "Invalid gas option";
      }

      // Facing/Orientation

      if (formData.facing && !validFacing.includes(formData.facing)) {
        newErrors.facing = "Invalid orientation/facing direction";
      }

      // Additional Rooms
      if (formData.additionalRooms && Array.isArray(formData.additionalRooms)) {
        const invalidRooms = formData.additionalRooms.filter(
          (r) => !additionalRoomsList.includes(r)
        );
        if (invalidRooms.length > 0) {
          newErrors.additionalRooms = `Invalid additional rooms: ${invalidRooms.join(
            ", "
          )}`;
        }
      }
    }

    if (currentStep === 5) {
      // Images validation
      if (
        !formData.media ||
        !Array.isArray(formData.media) ||
        formData.media.length === 0
      ) {
        newErrors.media = "At least one property image is required";
      } else {
        // Check if at least one image is marked as primary
        const hasPrimary = formData.media.some((img) => img.isPrimary === true);
        if (!hasPrimary) {
          newErrors.media = "Please select a primary/cover image";
        }

        // Validate each image
        formData.media.forEach((img, index) => {
          if (!img.url) {
            newErrors[img.category] = `${img.category} Image #${
              index + 1
            }: URL is required`;
          } else if (!isValidUrl(img.url)) {
            newErrors[img.category] = `${img.category} Image #${
              index + 1
            }: Invalid URL format`;
          }
        });

        // Minimum images requirement
        if (formData.media.length < 3) {
          newErrors.imagesCount = "Please upload at least 3 property images";
        }
      }

      if (!canProceedStep5) {
        setErrors(newErrors);
        return { isValid: false, newErrors };
      }

      // Optional media validations
      if (formData.virtualTourUrl && !isValidUrl(formData.virtualTourUrl)) {
        newErrors.virtualTourUrl = "Invalid virtual tour URL";
      }

      if (formData.videoUrl && !isValidUrl(formData.videoUrl)) {
        newErrors.videoUrl = "Invalid video URL";
      }

      if (formData.floorPlan?.url && !isValidUrl(formData.floorPlan.url)) {
        newErrors.floorPlanUrl = "Invalid floor plan URL";
      }
    }

    if (currentStep === 6) {
      if (
        !formData.contactPerson ||
        !Array.isArray(formData.contactPerson) ||
        formData.contactPerson.length === 0
      ) {
        newErrors.contactPerson = "At least one contact person is required";
      } else {
        formData.contactPerson.forEach((contact, index) => {
          if (!contact.name?.trim()) {
            newErrors[`contact_${index}_name`] = `Contact #${
              index + 1
            }: Name is required`;
          }

          if (!contact.phone?.trim()) {
            newErrors[`contact_${index}_phone`] = `Contact #${
              index + 1
            }: Phone is required`;
          } else if (!isValidPhone(contact.phone)) {
            newErrors[`contact_${index}_phone`] = `Contact #${
              index + 1
            }: Invalid Nigerian phone number`;
          }

          if (!contact.email?.trim()) {
            newErrors[`contact_${index}_email`] = `Contact #${
              index + 1
            }: Email is required`;
          } else if (!isValidEmail(contact.email)) {
            newErrors[`contact_${index}_email`] = `Contact #${
              index + 1
            }: Invalid email format`;
          }

          const validRoles = ["Owner", "Agent", "Builder", "Realtor"];
          if (!contact.role) {
            newErrors[`contact_${index}_role`] = `Contact #${
              index + 1
            }: Role is required`;
          } else if (!validRoles.includes(contact.role)) {
            newErrors[`contact_${index}_role`] = `Contact #${
              index + 1
            }: Invalid role`;
          }
        });
      }

      // Legal Documents validation (optional but if present, validate)
      if (formData.legalDocuments) {
        docTypes.forEach((docType) => {
          const doc = formData.legalDocuments[docType];
          if (doc && doc.present && doc.url && !isValidUrl(doc.url)) {
            newErrors[
              `legal_${docType}_url`
            ] = `${docType}: Invalid document URL`;
          }
        });
      }

      // Highlights validation
      if (formData.highlights && Array.isArray(formData.highlights)) {
        if (formData.highlights.length > 10) {
          newErrors.highlights = "Maximum 10 highlights allowed";
        }
        formData.highlights.forEach((highlight, index) => {
          if (highlight && highlight.length > 100) {
            newErrors[`highlight_${index}`] = `Highlight #${
              index + 1
            }: Maximum 100 characters`;
          }
        });
      }

      // Nearby Places validation
      if (formData.nearbyPlaces) {
        placeTypes.forEach((type) => {
          if (
            formData.nearbyPlaces[type] &&
            Array.isArray(formData.nearbyPlaces[type])
          ) {
            formData.nearbyPlaces[type].forEach((place, index) => {
              if (!place.name?.trim()) {
                newErrors[`nearby_${type}_${index}_name`] = `${type} #${
                  index + 1
                }: Name required`;
              }
              if (!place.distance?.trim()) {
                newErrors[`nearby_${type}_${index}_distance`] = `${type} #${
                  index + 1
                }: Distance required`;
              }
            });
          }
        });
      }
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, newErrors };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === "checkbox";
    const inputValue = isCheckbox ? checked : value; // Value for single-field updates

    setFormData((prev) => {
      // 1. Shallow copy the previous state
      const updated = { ...prev };

      // 2. Define fields that should store values in an array (e.g., checkbox groups)
      const ARRAY_FIELDS = ["amenities", "additionalRooms", "paymentPlans"];

      // 3. Split nested paths: "utilities.gas" or "address[city]" -> ["address", "city"]
      const keys = name.replace(/\]/g, "").split(/\.|\[/);

      // 4. Safely traverse and update the nested structure
      const updateNested = (obj, keys, updateValue) => {
        let current = obj;

        // Traverse all keys except the last one
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];

          // Ensure path exists and is an object (prevent overwriting non-objects)
          if (!current[key] || typeof current[key] !== "object") {
            current[key] = {}; // Initialize as object if undefined or not an object
          }
          current = current[key];
        }

        const lastKey = keys[keys.length - 1];

        if (ARRAY_FIELDS.includes(lastKey)) {
          // Handle checkbox groups (array multi-select)
          const existingArray = Array.isArray(current[lastKey])
            ? current[lastKey]
            : [];

          current[lastKey] = checked
            ? [...existingArray, value] // Add value if checked
            : existingArray.filter((v) => v !== value); // Remove value if unchecked
        } else if (type === "number") {
          // Handle numeric inputs: "" -> "", else convert to Number
          current[lastKey] = value === "" ? "" : Number(value);
        } else {
          // Handle single checkbox, text, select, etc.
          current[lastKey] = updateValue;
        }
      };

      updateNested(updated, keys, inputValue);

      return updated;
    });

    // Clear field error dynamically
    if (name in errors) {
      // Use 'in' check for better robustness
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const resetForm = () => {
    setFormData(fields);
    setStep(1);
  };

  const addContact = () => {
    setFormData((prev) => ({
      ...prev,
      contactPerson: [
        ...(prev.contactPerson || []),
        { name: "", phone: "", email: "", role: "" },
      ],
    }));
  };

  const removeContact = (index) => {
    setFormData((prev) => ({
      ...prev,
      contactPerson: prev.contactPerson.filter((_, i) => i !== index),
    }));
  };

  const addPaymentPlan = () => {
    setFormData((prev) => ({
      ...prev,
      paymentPlans: [
        ...prev.paymentPlans,
        { name: "", amount: "", type: "", dueInMonths: "" },
      ],
    }));
  };

  const removePaymentPlan = (index) => {
    setFormData((prev) => ({
      ...prev,
      paymentPlans: prev.paymentPlans.filter((_, i) => i !== index),
    }));
  };

  return {
    formData,
    validateStep,
    setErrors,
    errors,
    setFormData,
    handleChange,
    resetForm,
    step,
    addContact,
    setStep,
    removeContact,
    setCanProceedStep5,
    checkingStep5,
    setCheckingStep5,
    addPaymentPlan,
    paymentPlans,
    removePaymentPlan,
  };
};
