const router = require('express').Router();
const { TrainingPlan } = require('../models');
const auth = require('../middleware/auth');

// CREATE
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'coach') {
    return res.status(403).json({ error: 'Coach only' });
  }

  const plan = await TrainingPlan.create({
    ...req.body,
    coachId: req.user.id
  });

  res.status(201).json(plan);
});

// UPDATE (FIXED)
router.put('/:id', auth, async (req, res) => {
  const plan = await TrainingPlan.findByPk(req.params.id);

  if (!plan) return res.status(404).json({ error: 'Not found' });

  if (plan.coachId !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  await plan.update(req.body);
  res.json(plan);
});

// DELETE (FIXED)
router.delete('/:id', auth, async (req, res) => {
  const plan = await TrainingPlan.findByPk(req.params.id);

  if (!plan) return res.status(404).json({ error: 'Not found' });

  if (plan.coachId !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  await plan.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
