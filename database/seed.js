const { sequelize, User, Workout, TrainingPlan, PerformanceRecord } = require('../models');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    console.log("🌱 Seeding database...");

    // ======================
    // USERS
    // ======================
    const hashedPassword = await bcrypt.hash("password123", 10);

    const coach = await User.create({
      username: "coach1",
      email: "coach1@test.com",
      password: hashedPassword,
      role: "coach"
    });

    const athlete1 = await User.create({
      username: "athlete1",
      email: "athlete1@test.com",
      password: hashedPassword,
      role: "athlete"
    });

    const athlete2 = await User.create({
      username: "athlete2",
      email: "athlete2@test.com",
      password: hashedPassword,
      role: "athlete"
    });

    // ======================
    // TRAINING PLAN
    // ======================
    const plan = await TrainingPlan.create({
      name: "5K Beginner Plan",
      description: "8-week plan to improve 5K time",
      coachId: coach.id
    });

    await plan.addAthletes([athlete1, athlete2]);

    // ======================
    // WORKOUTS
    // ======================
    await Workout.create({
      type: "Run",
      date: new Date(),
      duration: 30,
      distance: 3.1,
      notes: "Easy pace run",
      userId: athlete1.id
    });

    await Workout.create({
      type: "Cycling",
      date: new Date(),
      duration: 45,
      distance: 10,
      notes: "Recovery ride",
      userId: athlete2.id
    });

    // ======================
    // PERFORMANCE RECORDS
    // ======================
    await PerformanceRecord.create({
      event: "5K Race",
      result: "24:30",
      date: new Date(),
      userId: athlete1.id
    });

    await PerformanceRecord.create({
      event: "5K Race",
      result: "26:10",
      date: new Date(),
      userId: athlete2.id
    });

    console.log("✅ Database seeded successfully!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
