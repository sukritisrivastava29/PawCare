const Animal = require("../models/Animal");


const createAnimal = async (req, res) => {
  try {
    const animal = await Animal.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Animal profile created successfully",
      animal,
    });
  } catch (error) {
    console.error("Create Animal Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


const getMyAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      count: animals.length,
      animals,
    });
  } catch (error) {
    console.error("Get Animals Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// Update animal
const updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    Object.assign(animal, req.body);

    await animal.save();

    res.json({
      message: "Animal updated successfully",
      animal,
    });
  } catch (error) {
    console.error("Update Animal Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete animal
const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    await animal.deleteOne();

    res.json({
      message: "Animal deleted successfully",
    });
  } catch (error) {
    console.error("Delete Animal Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createAnimal,
  getMyAnimals,
  updateAnimal,
  deleteAnimal,
};
