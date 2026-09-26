require("dotenv").config();

const mongoose = require("mongoose");
const Provider = require("./models/Provider");

const providers = [
  {
    name: "DCC Gurugram",
    type: "Veterinarian",
    location: "Gurgaon",
    address:
      "Jagdamba Farm, Carterpuri Marg, Sector 23A, Gurugram, Haryana 122017",
    phone: "+91 9311560101",
    website: "https://www.dccpets.in/",
    hours: "Monday–Sunday: 10:00 AM – 7:00 PM",
    services: [
      "Consultation",
      "Surgery",
      "Diagnostics",
      "Grooming",
      "Boarding",
    ],
    description:
      "Veterinary hospital providing consultation, surgery, diagnostics, grooming and boarding services.",
    verified: false,
    available: false,
    sourceUrl: "https://www.dccpets.in/",
    lastVerifiedAt: new Date(),
  },

  {
    name: "AVC Multispeciality Pet Care Hospital",
    type: "Veterinarian",
    location: "Gurgaon",
    address:
      "Regal Garden, Badha-Hayatpur Road, Near DLF Regal Garden, Sector 90, Gurugram, Haryana 122505",
    phone: "+91 9990070026",
    website: "https://avcpethospital.com/",
    hours:
      "Routine OPD: 9:00 AM – 2:00 PM and 4:00 PM – 8:30 PM; Emergency: 24/7",
    services: [
      "OPD",
      "ICU",
      "Diagnostics",
      "Surgery",
      "Dental Care",
      "Grooming",
      "Pet Boarding",
      "Home Check-up",
      "Emergency Care",
    ],
    description:
      "Multispeciality pet hospital offering medical care, diagnostics, surgery, dental care, boarding, grooming and emergency services.",
    verified: false,
    available: false,
    sourceUrl: "https://avcpethospital.com/contact-us/",
    lastVerifiedAt: new Date(),
  },

  {
    name: "Ichi & Ori Pet Care",
    type: "Veterinarian",
    location: "Noida",
    address:
      "G11, Tower C, Noida World One, Sector 90, Noida, Uttar Pradesh, India",
    phone: "+91 9560925999",
    website: "https://ichiandoripetcare.com/",
    hours: "Monday–Sunday: 10:30 AM – 8:00 PM",
    services: [
      "Veterinary Consultation",
      "Diagnostics",
      "Surgery",
      "Vaccination",
      "Grooming",
      "Boarding",
    ],
    description:
      "Pet-care provider offering veterinary care, diagnostics, grooming, boarding and pet-care services.",
    verified: false,
    available: false,
    sourceUrl: "https://ichiandoripetcare.com/",
    lastVerifiedAt: new Date(),
  },

  {
    name: "Paw Centric Pet Clinic",
    type: "Veterinarian",
    location: "Noida",
    address: "SB-07, Sector 117, Noida, Uttar Pradesh",
    phone: "+91 7223847355",
    website: "https://www.pawcentric.in/",
    hours:
      "Monday–Friday: 10:00 AM – 8:30 PM; Saturday–Sunday: 9:30 AM – 9:00 PM; Emergency: 24/7",
    services: [
      "Veterinary Consultation",
      "General Treatment",
      "Vaccination",
      "Diagnostics",
      "Dental Care",
      "Grooming",
      "Tick and Flea Treatment",
      "Emergency Care",
      "Orthopedic Surgery",
    ],
    description:
      "Veterinary clinic providing consultation, general treatment, diagnostics, preventive care, grooming and emergency services.",
    verified: false,
    available: false,
    sourceUrl: "https://www.pawcentric.in/contact-best-vet-in-noida",
    lastVerifiedAt: new Date(),
  },

  {
    name: "City Paws Veterinary Clinic",
    type: "Veterinarian",
    location: "Noida",
    address:
      "BR-14, Near Ganeshwaran Restaurant, Sector 45, Noida, Uttar Pradesh 201303",
    phone: "+91 9289205721",
    website: "https://www.citypaws.in/",
    hours: "24/7 emergency and medical boarding availability",
    services: [
      "Pet Vaccination",
      "Pet Grooming",
      "Dog Surgery",
      "Cat Treatment",
      "Emergency Care",
      "Dental Care",
      "Health Check-up",
      "Pet Boarding",
      "Exotic Animal Care",
      "Diagnostics",
    ],
    description:
      "Veterinary clinic offering routine pet healthcare, surgery, diagnostics, grooming, boarding and emergency care.",
    verified: false,
    available: false,
    sourceUrl: "https://www.citypaws.in/",
    lastVerifiedAt: new Date(),
  },

  {
    name: "Friendicoes SECA",
    type: "NGO",
    location: "Delhi",
    address:
      "271 & 273 Defence Colony Flyover Market, Jungpura Side, New Delhi 110024",
    phone: "+91 8882931057",
    website: "https://friendicoes.org/",
    hours: "Contact organization for current operating hours",
    services: [
      "Animal Rescue",
      "Veterinary Care",
      "Animal Shelter",
      "Animal Rehabilitation",
      "Adoption",
      "Spay and Neuter",
      "Vaccination",
      "Animal Ambulance",
    ],
    description:
      "Animal welfare organization providing rescue, rehabilitation, veterinary care, shelter, adoption and animal welfare programs.",
    verified: false,
    available: false,
    sourceUrl: "https://friendicoes.org/",
    lastVerifiedAt: new Date(),
  },

  {
    name: "Friendicoes SECA Gurugram",
    type: "NGO",
    location: "Gurgaon",
    address:
      "Village Gopalpur, Khera Garhi Harsaru, Sector 99, Gurugram, Haryana 122505",
    phone: "+91 7027777951",
    website: "https://friendicoes.org/",
    hours: "Visitors: 10:00 AM – 1:00 PM and 3:00 PM – 5:00 PM",
    services: [
      "Animal Rescue",
      "Veterinary Care",
      "Animal Shelter",
      "Animal Rehabilitation",
      "Adoption",
      "Animal Ambulance",
    ],
    description:
      "Friendicoes animal-care facility in Gurugram providing shelter, rescue, rehabilitation and veterinary support.",
    verified: false,
    available: false,
    sourceUrl: "https://friendicoes.org/visit-us/",
    lastVerifiedAt: new Date(),
  },

  {
    name: "NDMC Veterinary Hospital",
    type: "Veterinarian",
    location: "Delhi",
    address:
      "Shantipath Road, Moti Bagh, Near National Railway Museum, New Delhi, Delhi 110023",
    phone: "01124672161",
    website: "https://www.ndmc.gov.in/",
    hours: "9:00 AM – 4:00 PM",
    services: [
      "Veterinary OPD",
      "Surgery",
      "X-ray",
    ],
    description:
      "NDMC veterinary hospital providing veterinary outpatient services, surgery and X-ray services for small quadruped pet animals.",
    verified: false,
    available: false,
    sourceUrl:
      "https://www.ndmc.gov.in/services/vetenary_clinic.aspx",
    lastVerifiedAt: new Date(),
  },
];

const seedProviders = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Provider.deleteMany({});
    console.log("Existing providers removed");

    await Provider.insertMany(providers);

    console.log(`${providers.length} providers inserted successfully`);

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Provider seeding failed:", error.message);
    process.exit(1);
  }
};

seedProviders();