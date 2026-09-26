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
      enum: [
        "Veterinarian",
        "Emergency",
        "Rescue",
        "NGO",
      ],
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
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    hours: {
      type: String,
      default: "",
    },

    services: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    sourceUrl: {
      type: String,
      required: true,
      trim: true,
    },

    lastVerifiedAt: {
      type: Date,
    },

    available: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

providerSchema.index({
  name: "text",
  location: "text",
  description: "text",
  services: "text",
});

module.exports = mongoose.model("Provider", providerSchema);