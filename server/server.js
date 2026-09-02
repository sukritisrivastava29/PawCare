const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const aiRoutes = require("./routes/aiRoutes");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `PawCare AI server running on http://localhost:${PORT}`
  );
});