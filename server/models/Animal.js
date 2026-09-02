import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    caregiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    species: {
      type: String,
      required: true,
      trim: true,
    },

    breed: {
      type: String,
      default: "Unknown",
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Unknown"],
      default: "Unknown",
    },

    dateOfBirth: {
      type: Date,
    },

    weight: {
      type: Number,
    },

    color: {
      type: String,
      trim: true,
    },

    photo: {
      type: String,
      default: "",
    },

    healthStatus: {
      type: String,
      default: "",
    },

    vaccinationStatus: {
      type: String,
      enum: [
        "Vaccinated",
        "Partially Vaccinated",
        "Not Vaccinated",
        "Unknown",
      ],
      default: "Unknown",
    },

    medicalNotes: {
      type: String,
      default: "",
    },

    careStatus: {
      type: String,
      enum: [
        "My Animal",
        "Rescued",
        "Fostered",
        "Stray / Community Animal",
        "Looking for Adoption",
        "Adopted",
      ],
      default: "My Animal",
    },

    foundLocation: {
      type: String,
      default: "",
    },

    rescueDate: {
      type: Date,
    },

    currentLocation: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;