const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    owner: {
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
      enum: ["dog", "cat", "rabbit", "bird", "other"],
    },

    breed: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "unknown"],
    },

    age: {
      type: Number,
      min: 0,
    },

    weight: {
      type: Number,
      min: 0,
    },

    healthStatus: {
      type: String,
      default: "healthy",
    },

    vaccinationStatus: {
      type: String,
      default: "up-to-date",
    },

    medicalNotes: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Animal", animalSchema);