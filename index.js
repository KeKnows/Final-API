console.log("INDEX FILE STARTED");
const express = require('express');
const { sequelize } = require('./models');

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ======================
// TEST ROUTE
// ======================
app.get('/', (req, res) => {
  res.json({
    message: 'Athlete Training API is running 🚀'
  });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
});