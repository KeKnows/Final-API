const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const PerformanceRecord = sequelize.define('PerformanceRecord', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = PerformanceRecord;