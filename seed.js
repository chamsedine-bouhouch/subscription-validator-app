import sequelize from './api/db.js';
import { User, Inscription } from './api/models/index.js';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    console.log('🌱 Starting seed process...');
    await sequelize.sync({ force: true }); // Reset DB

    // 1. Create default admin user
    const adminUser = await User.create({
      email: 'admin@example.com',
      password: 'admin_hashed_password',
      role: 'admin',
    });

    // 2. Create two inscriptions
    const inscription1 = await Inscription.create({
      name: 'Alice',
      lastname: 'Wonderland',
      email: 'alice@example.com',
    });

    const inscription2 = await Inscription.create({
      name: 'Bob',
      lastname: 'Builder',
      email: 'bob@example.com',
    });

    // 3. Create user from one inscription (validated)
    const user = await User.create({
      email: 'alice@example.com',
      password: 'user_hashed_password',
      role: 'user',
    });

    // 4. Link inscription to user and validate
    await inscription1.update({
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
