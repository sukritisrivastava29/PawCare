const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Veterinarian", "Emergency", "Rescue", "NGO"],
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    available: {
      type: Boolean,
      default: false,
    },

    hours: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    services: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

providerSchema.index({
  name: "text",
  location: "text",
  description: "text",
  services: "text",
});

module.exports = mongoose.model("Provider", providerSchema);