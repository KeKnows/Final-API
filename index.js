require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const authRoutes = require("./routes/auth");
const workoutRoutes = require("./routes/workouts");
const performanceRoutes = require("./routes/performanceRecords");
const trainingPlanRoutes = require("./routes/trainingPlans");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// BASIC ROUTE
// ======================
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// ======================
// ROUTES
// ======================
app.use("/auth", authRoutes);
app.use("/workouts", workoutRoutes);
app.use("/performance", performanceRoutes);
app.use("/training-plans", trainingPlanRoutes);

// ======================
// 404 HANDLER
// ======================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ======================
// ERROR HANDLER
// ======================
app.use(errorHandler);

// ======================
// START SERVER (WITH DB)
// ======================
const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

module.exports = app;
