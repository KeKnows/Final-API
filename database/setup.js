const { sequelize } = require('../models');

async function setupDatabase() {
  try {
    console.log('🔄 Syncing database...');

    await sequelize.sync({ force: true });

    console.log('✅ Database synced successfully!');
    console.log('📦 All tables created and relationships established.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();