

const express = require('express');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');
const performanceRoutes = require('./routes/performanceRecords');
const trainingPlanRoutes = require('./routes/trainingPlans');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json()); // MUST come before routes


app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});


app.use('/auth', authRoutes);
app.use('/workouts', workoutRoutes);
app.use('/performance', performanceRoutes);
app.use('/training-plans', trainingPlanRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.use(errorHandler);


sequelize.sync()
  .then(() => {
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

module.exports = app;
