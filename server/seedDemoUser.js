require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI;

const seedDemoUser = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const email = "demo@pawcare.com";
    const password = "PawCare@123";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Demo user already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "PawCare Demo User",
      email,
      password: hashedPassword,
      role: "pet-parent",
    });

    console.log("Demo user created successfully");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (error) {
    console.error("Demo user seed error:", error);
    process.exit(1);
  }
};

seedDemoUser();