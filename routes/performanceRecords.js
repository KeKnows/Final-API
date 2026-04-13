const express = require('express');
const router = express.Router();

const { PerformanceRecord } = require('../models');
const { authenticateToken } = require('../middleware/authMiddleware');


// GET ALL RECORDS (user-specific)
router.get('/', authenticateToken, async (req, res) => {
  const records = await PerformanceRecord.findAll({
    where: { userId: req.user.id }
  });

  res.json(records);
});


// CREATE RECORD
router.post('/', authenticateToken, async (req, res) => {
  try {
    const record = await PerformanceRecord.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE RECORD
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const record = await PerformanceRecord.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await record.update(req.body);

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE RECORD
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const record = await PerformanceRecord.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await record.destroy();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
