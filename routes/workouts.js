const router = require('express').Router();
const { Workout } = require('../models');
const auth = require('../middleware/auth');

// GET (user scoped)
router.get('/', auth, async (req, res) => {
  const workouts = await Workout.findAll({
    where: { userId: req.user.id }
  });

  res.json(workouts);
});

// POST (NO SPOOFING)
router.post('/', auth, async (req, res) => {
  const workout = await Workout.create({
    ...req.body,
    userId: req.user.id // ✅ FORCE OWNER
  });

  res.status(201).json(workout);
});

// DELETE (ownership enforced)
router.delete('/:id', auth, async (req, res) => {
  const workout = await Workout.findByPk(req.params.id);

  if (!workout) return res.status(404).json({ error: 'Not found' });

  if (workout.userId !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  await workout.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
