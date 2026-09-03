const HealthRecord = require("../models/HealthRecord");
const Animal = require("../models/Animal");

// GET /api/health-records/:animalId
const getHealthRecords = async (req, res) => {
  try {
    const { animalId } = req.params;

    // Make sure animal belongs to logged-in user
    const animal = await Animal.findOne({
      _id: animalId,
      owner: req.user._id,
    });

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    const records = await HealthRecord.find({
      animal: animalId,
      user: req.user._id,
    }).sort({ date: -1 });

    res.json({
      records,
    });
  } catch (error) {
    console.error("Get health records error:", error);

    res.status(500).json({
      message: "Failed to fetch health records",
    });
  }
};

// POST /api/health-records/:animalId
const createHealthRecord = async (req, res) => {
  try {
    const { animalId } = req.params;

    const {
      type,
      title,
      date,
      doctor,
      notes,
    } = req.body;

    // Make sure animal belongs to logged-in user
    const animal = await Animal.findOne({
      _id: animalId,
      owner: req.user._id,
    });

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    const record = await HealthRecord.create({
      animal: animalId,
      user: req.user._id,
      type,
      title,
      date,
      doctor,
      notes,
    });

    res.status(201).json({
      message: "Health record created successfully",
      record,
    });
  } catch (error) {
    console.error("Create health record error:", error);

    res.status(500).json({
      message: "Failed to create health record",
    });
  }
};

// PUT /api/health-records/:id
const updateHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!record) {
      return res.status(404).json({
        message: "Health record not found",
      });
    }

    const {
      type,
      title,
      date,
      doctor,
      notes,
    } = req.body;

    record.type = type ?? record.type;
    record.title = title ?? record.title;
    record.date = date ?? record.date;
    record.doctor = doctor ?? record.doctor;
    record.notes = notes ?? record.notes;

    await record.save();

    res.json({
      message: "Health record updated successfully",
      record,
    });
  } catch (error) {
    console.error("Update health record error:", error);

    res.status(500).json({
      message: "Failed to update health record",
    });
  }
};

// DELETE /api/health-records/:id
const deleteHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!record) {
      return res.status(404).json({
        message: "Health record not found",
      });
    }

    await record.deleteOne();

    res.json({
      message: "Health record deleted successfully",
    });
  } catch (error) {
    console.error("Delete health record error:", error);

    res.status(500).json({
      message: "Failed to delete health record",
    });
  }
};

module.exports = {
  getHealthRecords,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
};