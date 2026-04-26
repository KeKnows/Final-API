const express = require('express');
const auth = require('../middleware/auth');
const { PerformanceRecord } = require('../models');

const router = express.Router();

// CREATE
router.post('/', auth, async (req, res, next) => {
  try {
    const record = await PerformanceRecord.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
});

// READ
router.get('/', auth, async (req, res, next) => {
  try {
    const records = await PerformanceRecord.findAll({
      where: { userId: req.user.id }
    });

    res.json(records);
  } catch (err) {
    next(err);
  }
});

// UPDATE (ADDED)
router.put('/:id', auth, async (req, res, next) => {
  try {
    const record = await PerformanceRecord.findByPk(req.params.id);

    if (!record) return res.status(404).json({ error: 'Not found' });

    if (record.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await record.update(req.body);
    res.json(record);
  } catch (err) {
    next(err);
  }
});

// DELETE (ADDED)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const record = await PerformanceRecord.findByPk(req.params.id);

    if (!record) return res.status(404).json({ error: 'Not found' });

    if (record.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await record.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
