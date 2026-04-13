const sequelize = require('../database/db');

const User = require('./User');
const Workout = require('./Workout');
const TrainingPlan = require('./TrainingPlan');
const PerformanceRecord = require('./PerformanceRecord');


// =======================
// RELATIONSHIPS
// =======================

// USER → WORKOUTS (1 to many)
User.hasMany(Workout, { foreignKey: 'userId', onDelete: 'CASCADE' });
Workout.belongsTo(User, { foreignKey: 'userId' });


// USER → PERFORMANCE RECORDS (1 to many)
User.hasMany(PerformanceRecord, { foreignKey: 'userId', onDelete: 'CASCADE' });
PerformanceRecord.belongsTo(User, { foreignKey: 'userId' });


// COACH (User) → TRAINING PLANS (1 to many)
User.hasMany(TrainingPlan, { foreignKey: 'coachId', onDelete: 'CASCADE' });
TrainingPlan.belongsTo(User, { as: 'Coach', foreignKey: 'coachId' });


// TRAINING PLAN ↔ ATHLETES (many-to-many)
const UserTrainingPlans = sequelize.define(
  'UserTrainingPlans',
  {},
  { timestamps: false }
);

User.belongsToMany(TrainingPlan, {
  through: UserTrainingPlans,
  as: 'AssignedPlans'
});

TrainingPlan.belongsToMany(User, {
  through: UserTrainingPlans,
  as: 'Athletes'
});


// EXPORT EVERYTHING
module.exports = {
  sequelize,
  User,
  Workout,
  TrainingPlan,
  PerformanceRecord,
  UserTrainingPlans
};