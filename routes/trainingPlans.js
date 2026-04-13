const express = require('express');
const router = express.Router();

const { TrainingPlan } = require('../models');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');


// ======================
// GET ALL PLANS (everyone logged in)
// ======================
router.get('/', authenticateToken, async (req, res) => {
  const plans = await TrainingPlan.findAll();
  res.json(plans);
});


// ======================
// CREATE PLAN (COACH ONLY)
// ======================
router.post(
  '/',
  authenticateToken,
  authorizeRoles('coach'),
  async (req, res) => {
    try {
      const plan = await TrainingPlan.create({
        ...req.body,
        coachId: req.user.id
      });

      res.status(201).json(plan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


// ======================
// UPDATE PLAN (COACH ONLY)
// ======================
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('coach'),
  async (req, res) => {
    try {
      const plan = await TrainingPlan.findByPk(req.params.id);

      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }

      await plan.update(req.body);

      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


// ======================
// DELETE PLAN (COACH ONLY)
// ======================
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('coach'),
  async (req, res) => {
    try {
      const plan = await TrainingPlan.findByPk(req.params.id);

      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }

      await plan.destroy();

      res.json({ message: "Plan deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
