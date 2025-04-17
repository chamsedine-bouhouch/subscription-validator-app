import sequelize from './api/db.js';
import Inscription from './api/models/Inscription.js';
import User from './api/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);

    // await sequelize.sync({ force: true });
    console.log("✅ DB synced");

    // Create two inscription rows
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

    // Create one user linked to one of the inscriptions
    await User.create({
      user_id: inscription1.id,
      password: 'hashed_password',
    });

    console.log("✅ DB seeded");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    await sequelize.close();
  }
})();
