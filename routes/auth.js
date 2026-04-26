const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { User } = require('../models');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

// REGISTER
router.post(
  '/register',
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  validate,
  async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: 'athlete'
      });

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
);

// LOGIN
router.post(
  '/login',
  body('username').notEmpty(),
  body('password').notEmpty(),
  validate,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
