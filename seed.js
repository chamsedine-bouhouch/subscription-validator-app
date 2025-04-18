import sequelize from './api/db.js';
import { User, Inscription } from './api/models/index.js';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    console.log('🌱 Starting seed process...');

    // Reset and sync DB
    await sequelize.sync({ force: true });

    // 1. Create default admin user
    //  (password will be hashed via model hook)
    const adminUser = await User.create({
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });

    // 2. Create two inscriptions
    const alice = await Inscription.create({
      name: 'Alice',
      lastname: 'Wonderland',
      email: 'alice@example.com',
    });

    const bob = await Inscription.create({
      name: 'Bob',
      lastname: 'Builder',
      email: 'bob@example.com',
    });

    // 3. Create user from one inscription (validated)
    const user = await User.create({
      email: 'alice@example.com',
      password: 'alicepass',
      role: 'user',
    });

    // 4. Link inscription to user and validate
    await alice.update({
      validated: true,
      user_id: user.id,
      validation_date: new Date(),
      bearer_token: 'fake-bearer-token-123',
    });

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await sequelize.close();
  }
})();
