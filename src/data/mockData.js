export const services = [
  {
    id: 1,
    name: "Veterinary Care",
    icon: "🩺",
    description: "Consult qualified veterinary professionals for your pet."
  },
  {
    id: 2,
    name: "Grooming",
    icon: "✂️",
    description: "Find grooming services for your pet's everyday needs."
  },
  {
    id: 3,
    name: "Vaccination",
    icon: "💉",
    description: "Find vaccination and preventive care services."
  },
  {
    id: 4,
    name: "Pet Pharmacy",
    icon: "💊",
    description: "Access medicines and healthcare support for your pet."
  }
];

export const providers = [
  {
    id: 1,
    name: "Paws & Care Veterinary Clinic",
    type: "Veterinary Clinic",
    location: "Gurgaon",
    rating: 4.8,
    reviews: 124,
    distance: "1.2 km",
    phone: "+91 98765 43210",
    open: true,
    image: "🐕",
    services: ["Veterinary Care", "Vaccination", "Emergency Care"]
  },
  {
    id: 2,
    name: "Happy Tails Animal Hospital",
    type: "Animal Hospital",
    location: "Gurgaon",
    rating: 4.7,
    reviews: 98,
    distance: "2.4 km",
    phone: "+91 98765 12345",
    open: true,
    image: "🐈",
    services: ["Veterinary Care", "Surgery", "Vaccination"]
  },
  {
    id: 3,
    name: "Pet Wellness Centre",
    type: "Pet Wellness Centre",
    location: "Gurgaon",
    rating: 4.6,
    reviews: 76,
    distance: "3.1 km",
    phone: "+91 98111 22334",
    open: false,
    image: "🐶",
    services: ["Grooming", "Vaccination", "Pet Wellness"]
  }
];

export const pet = {
  name: "Milo",
  type: "Dog",
  breed: "Golden Retriever",
  age: "3 years",
  gender: "Male",
  weight: "28 kg",
  image: "🐕"
};

export const healthRecords = [
  {
    id: 1,
    title: "Annual Vaccination",
    date: "15 August 2026",
    type: "Vaccination",
    status: "Completed"
  },
  {
    id: 2,
    title: "General Health Checkup",
    date: "02 July 2026",
    type: "Checkup",
    status: "Completed"
  },
  {
    id: 3,
    title: "Rabies Vaccination",
    date: "15 August 2026",
    type: "Vaccination",
    status: "Completed"
  }
];