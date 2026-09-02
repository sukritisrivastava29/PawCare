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

module.exports = {
  createAnimal,
  getMyAnimals,
};