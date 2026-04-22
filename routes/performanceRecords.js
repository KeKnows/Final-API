const router = require('express').Router();
const { PerformanceRecord } = require('../models');
const auth = require('../middleware/auth');

// GET (user scoped)
router.get('/', auth, async (req, res) => {
  const records = await PerformanceRecord.findAll({
    where: { userId: req.user.id }
  });

  res.json(records);
});

// CREATE
router.post('/', auth, async (req, res) => {
  const record = await PerformanceRecord.create({
    ...req.body,
    userId: req.user.id
  });

  res.status(201).json(record);
});

module.exports = router;
