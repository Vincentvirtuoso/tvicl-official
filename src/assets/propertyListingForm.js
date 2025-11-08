import { FaNairaSign } from "react-icons/fa6";
import {
  LuCheck,
  LuFileText,
  LuHouse,
  LuImages,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";

export const steps = [
  { num: 1, title: "Basic Info", icon: LuHouse },
  { num: 2, title: "Location", icon: LuMapPin },
  { num: 3, title: "Pricing", icon: FaNairaSign },
  { num: 4, title: "Details", icon: LuFileText },
  { num: 5, title: "Media Uploads", icon: LuImages },
  { num: 7, title: "Contact", icon: LuPhone },
  { num: 8, title: "Review", icon: LuCheck },
];

export const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const propertyTypes = [
  "Self Contained",
  "Mini Flat",
  "Flat/Apartment",
  "Bungalow",
  "Detached Duplex",
  "Semi-Detached Duplex",
  "Terraced Duplex",
  "Mansion",
  "Block of Flats",
  "Commercial",
  "Plot",
  "Office",
  "Warehouse",
  "Serviced Apartment",
];

export const flatTypes = [
  "Studio",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom",
  "4 Bedroom",
  "5+ Bedroom",
];

export const amenitiesList = [
  "Swimming Pool",
  "Gym",
  "Garden",
  "Kids Play Area",
  "Clubhouse",
  "Security",
  "CCTV",
  "Gated Community",
  "Lift",
  "Generator",
  "Inverter",
  "Borehole",
  "Piped Water",
  "Water Treatment",
  "Fire Safety",
  "Intercom",
  "Visitor Parking",
  "Street Lights",
  "Fence",
  "Gatehouse",
  "Commercial Mall Nearby",
  "School Nearby",
];

export const waterSupply = [
  "Borehole",
  "Water Corporation",
  "Bottled/Delivered",
  "Municipal",
  "Both",
];

export const powerBackup = ["Generator", "Inverter", "Full", "Partial", "None"];

export const validGas = ["Cylinder", "Piped Gas", "None"];

export const validFacing = [
  "North",
  "South",
  "East",
  "West",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
];

export const placeTypes = [
  "schools",
  "hospitals",
  "transport",
  "shoppingCenters",
  "parks",
];

export const docTypes = [
  "cOfO",
  "governorsConsent",
  "surveyPlan",
  "deedOfAssignment",
  "excision",
];

export const additionalRoomsList = [
  "Servant Room",
  "Study Room",
  "Pooja Room",
  "Store Room",
  "Home Theater",
  "Terrace",
];

export const transactionTypes = [
  {
    value: "Off Plan",
    label: "Off Plan – Buy during construction with staged payments.",
  },
  {
    value: "Outright",
    label: "Outright – Full payment for immediate ownership.",
  },
  {
    value: "Installments",
    label: "Installments – Pay gradually over an agreed period.",
  },
  {
    value: "Mortgage",
    label: "Mortgage – Bank-financed purchase, repaid over time.",
  },
  {
    value: "Rent to Own",
    label: "Rent to Own – Rent contributes toward eventual ownership.",
  },
];

export const listingTypes = ["For Sale", "For Rent", "Short Let"];

export const fields = {
  // Basic Info
  title: "",
  description: "",
  propertyType: "",
  flatType: "",
  listingType: "",

  // Address
  address: {
    street: "",
    area: "",
    city: "",
    state: "",
    lga: "",
    postalCode: "",
    landmark: "",
  },

  // Location coordinates
  location: {
    type: "Point",
    coordinates: [0, 0], // [longitude, latitude]
  },

  // Rooms
  bedrooms: 1,
  bathrooms: 1,
  kitchens: 1,
  balconies: 0,

  // Floor details
  floor: "",
  totalFloors: "",

  // Sizes
  floorSizeValue: "",
  floorSizeUnit: "sqft",
  carpetAreaValue: "",
  carpetAreaUnit: "sqft",

  // Media
  media: [],

  // Pricing
  price: {
    amount: 0,
    currency: "NGN",
    negotiable: false,
  },
  paymentPlans: [],

  // Rental details
  rentalDetails: {
    depositAmount: "",
    rentFrequency: "Monthly",
    leaseDurationMonths: "",
    serviceCharge: {
      amount: "",
      frequency: "Monthly",
    },
    agencyFeePercent: "",
    cautionFee: "",
    petsAllowed: false,
    preferredTenants: "Anyone",
  },

  transactionType: "Outright",

  // Condition
  furnishingStatus: "",
  propertyCondition: "",
  possessionStatus: "",
  availableFrom: new Date().toISOString().split("T")[0],
  yearBuilt: "",

  // Parking
  parking: {
    covered: 0,
    open: 0,
  },

  // Amenities
  amenities: [],

  // Utilities
  utilities: {
    waterSupply: "Municipal",
    powerBackup: "None",
    gas: "None",
  },

  // Orientation
  facing: "",

  // Additional
  additionalRooms: [],
  highlights: [],

  // Contact
  contactPerson: [
    {
      name: "",
      phone: "",
      email: "",
      role: "Agent",
    },
  ],

  // Legal
  legalDocuments: {
    cOfO: { present: false, url: "" },
    surveyPlan: { present: false, url: "" },
    deedOfAssignment: { present: false, url: "" },
    governorsConsent: { present: false, url: "" },
  },
};

export const generateMediaCategories = (data) => {
  const type = data.propertyType || "";
  const cats = [];

  // --- UNIVERSAL CATEGORIES ---
  if (type !== "Plot") {
    cats.push({
      id: "cover",
      label: "Cover Photo",
      description: "Main property image (required)",
      required: true,
      minImages: 1,
      maxImages: 1,
      icon: "🏠",
    });
  }

  // --- PROPERTY TYPE SPECIFIC CONFIGURATIONS ---
  const isResidential = [
    "Self Contained",
    "Mini Flat",
    "Flat/Apartment",
    "Bungalow",
    "Detached Duplex",
    "Semi-Detached Duplex",
    "Terraced Duplex",
    "Mansion",
    "Serviced Apartment",
  ].includes(type);

  const isCommercial = ["Commercial", "Office", "Warehouse"].includes(type);
  const isLand = type === "Plot";

  // --- RESIDENTIAL PROPERTIES ---
  if (isResidential) {
    cats.push(
      {
        id: "exterior",
        label: "Exterior/Building",
        description: "Outside views, facade, compound",
        required: true,
        minImages: 2,
        maxImages: 7,
        icon: "🏢",
      },
      {
        id: "living",
        label: "Living Room",
        description: "Main living area",
        required: true,
        minImages: 2,
        maxImages: 4,
        icon: "🛋️",
      }
    );

    const bedroomCount = parseInt(data.bedrooms) || 0;
    for (let i = 1; i <= bedroomCount; i++) {
      cats.push({
        id: `bedroom_${i}`,
        label: `Bedroom ${i}${i === 1 ? " (Master)" : ""}`,
        description: `Photos of bedroom ${i}`,
        required: true,
        minImages: 1,
        maxImages: 4,
        icon: "🛏️",
      });
    }

    const bathroomCount = parseInt(data.bathrooms) || 0;
    for (let i = 1; i <= bathroomCount; i++) {
      cats.push({
        id: `bathroom_${i}`,
        label: `Bathroom ${i}`,
        description: `Toilet, shower, fixtures`,
        required: true,
        minImages: 1,
        maxImages: 4,
        icon: "🚿",
      });
    }

    const kitchenCount = parseInt(data.kitchens) || 0;
    for (let i = 1; i <= kitchenCount; i++) {
      cats.push({
        id: `kitchen_${i}`,
        label: kitchenCount > 1 ? `Kitchen ${i}` : "Kitchen",
        description: "Cabinets, appliances, countertops",
        required: true,
        minImages: 1,
        maxImages: 4,
        icon: "🍳",
      });
    }

    const balconyCount = parseInt(data.balconies) || 0;
    for (let i = 1; i <= balconyCount; i++) {
      cats.push({
        id: `balcony_${i}`,
        label: balconyCount > 1 ? `Balcony ${i}` : "Balcony",
        description: "Outdoor space, view",
        required: false,
        minImages: 1,
        maxImages: 4,
        icon: "🌿",
      });
    }

    if (data.additionalRooms && data.additionalRooms.length > 0) {
      data.additionalRooms.forEach((room, idx) => {
        cats.push({
          id: `additional_${idx}`,
          label: room || `Additional Room ${idx + 1}`,
          description: "Other spaces",
          required: false,
          minImages: 1,
          maxImages: 4,
          icon: "📦",
        });
      });
    }

    // Optional residential areas
    cats.push(
      {
        id: "dining",
        label: "Dining Area",
        description: "Dining space (optional)",
        required: false,
        minImages: 1,
        icon: "🍽️",
      },
      {
        id: "parking",
        label: "Parking",
        description: "Garage, parking space",
        required: false,
        minImages: 1,
        icon: "🚗",
      },
      {
        id: "other",
        label: "Other",
        description: "Additional photos",
        required: false,
        minImages: 0,
        icon: "📸",
      }
    );
  }

  // --- COMMERCIAL PROPERTIES ---
  else if (isCommercial) {
    cats.push(
      {
        id: "exterior",
        label: "Building Exterior",
        description: "Front view, parking area, signage",
        required: true,
        minImages: 2,
        maxImages: 6,
        icon: "🏢",
      },
      {
        id: "interior",
        label: "Interior Spaces",
        description: "Office/workshop interiors",
        required: true,
        minImages: 2,
        maxImages: 8,
        icon: "🏬",
      },
      {
        id: "utilities",
        label: "Utilities & Facilities",
        description: "Power, lighting, storage, etc.",
        required: false,
        minImages: 1,
        maxImages: 4,
        icon: "⚙️",
      },
      {
        id: "parking",
        label: "Parking Area",
        description: "Parking lot or loading bay",
        required: false,
        minImages: 1,
        maxImages: 4,
        icon: "🚗",
      }
    );
  }

  // --- LAND / PLOT ---
  else if (isLand) {
    cats.push(
      {
        id: "land",
        label: "Land Area",
        description: "Full land view, terrain, access roads",
        required: true,
        minImages: 2,
        maxImages: 6,
        icon: "🌾",
      },
      {
        id: "beacon",
        label: "Beacons / Boundaries",
        description: "Show land demarcations and survey pegs",
        required: false,
        minImages: 1,
        maxImages: 4,
        icon: "📍",
      },
      {
        id: "neighbourhood",
        label: "Neighbourhood View",
        description: "Nearby facilities or landmarks",
        required: false,
        minImages: 1,
        maxImages: 4,
        icon: "🏞️",
      }
    );
  }

  return cats;
};
