const express = require("express");

const {
  getHealthRecords,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
} = require("../controllers/healthRecordController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all health records for an animal
router.get("/:animalId", protect, getHealthRecords);

// Create a health record
router.post("/:animalId", protect, createHealthRecord);

// Update a health record
router.put("/:id", protect, updateHealthRecord);

// Delete a health record
router.delete("/:id", protect, deleteHealthRecord);

module.exports = router;