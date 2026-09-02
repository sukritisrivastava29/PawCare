const express = require("express");

const {
  createAnimal,
  getMyAnimals,
} = require("../controllers/animalController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createAnimal);
router.get("/", protect, getMyAnimals);

module.exports = router;