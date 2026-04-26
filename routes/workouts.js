const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { Workout } = require('../models');

const router = express.Router();

// CREATE
router.post(
  '/',
  auth,
  body('type').notEmpty(),
  body('duration').isInt({ min: 1 }),
  validate,
  async (req, res, next) => {
    try {
      const workout = await Workout.create({
        ...req.body,
        userId: req.user.id
      });

      res.status(201).json(workout);
    } catch (err) {
      next(err);
    }
  }
);

// READ ALL
router.get('/', auth, async (req, res, next) => {
  try {
    const workouts = await Workout.findAll({
      where: { userId: req.user.id }
    });

    res.json(workouts);
  } catch (err) {
    next(err);
  }
});

// READ ONE
router.get('/:id', auth, async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (workout.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(workout);
  } catch (err) {
    next(err);
  }
});

// UPDATE (ADDED)
router.put('/:id', auth, async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (workout.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await workout.update(req.body);
    res.json(workout);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (workout.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await workout.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
