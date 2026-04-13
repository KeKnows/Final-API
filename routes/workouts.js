const express = require('express');
const router = express.Router();

const { Workout } = require('../models');
const { authenticateToken } = require('../middleware/authMiddleware');

// ======================
// GET ALL WORKOUTS (protected)
// ======================
router.get('/', authenticateToken, async (req, res) => {
  const workouts = await Workout.findAll();
  res.json(workouts);
});

// ======================
// CREATE WORKOUT
// ======================
router.post('/', authenticateToken, async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
