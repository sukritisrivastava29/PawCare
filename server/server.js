const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const animalRoutes = require("./routes/animalRoutes");
const healthRecordRoutes = require("./routes/healthRecordRoutes");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "PawCare backend is running",
  });
});


app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/health-records", healthRecordRoutes);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`PawCare server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });