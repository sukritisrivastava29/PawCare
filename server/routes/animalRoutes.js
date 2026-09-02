const express = require("express");

const {
  createAnimal,
  getMyAnimals,
  updateAnimal,
  deleteAnimal,
} = require("../controllers/animalController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createAnimal);
router.get("/", protect, getMyAnimals);
router.put("/:id", protect, updateAnimal);
router.delete("/:id", protect, deleteAnimal);

module.exports = router;