const express = require('express');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');
const trainingPlanRoutes = require('./routes/trainingPlans');
const performanceRoutes = require('./routes/performanceRecords');

const app = express();

// ✅ MUST BE FIRST
app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/workouts', workoutRoutes);
app.use('/plans', trainingPlanRoutes);
app.use('/records', performanceRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`);
  await sequelize.authenticate();
});
