const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const TrainingPlan = sequelize.define('TrainingPlan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  coachId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = TrainingPlan;