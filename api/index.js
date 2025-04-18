import dotenv from 'dotenv';
dotenv.config();
import express from 'express';


import authRoutes from './routes/auth.js';
import inscriptionsRoutes from './routes/inscriptions.js';

import sequelize from './db.js'
import { errorHandler } from './middlewares/errorHandler.js';

sequelize.sync({ alter: true }) // or { force: true } to drop & recreate
  .then(() => console.log('Database synced!'))
  .catch((err) => console.error('Sync error:', err));

const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route — for testing DB connection
app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send('✅ Express + Sequelize + Vercel working!');
  } catch (err) {
    res.status(500).send('❌ DB connection error');
  }
});

// Mount the route
app.use('/api/auth', authRoutes);

app.use('/api/inscriptions', inscriptionsRoutes);

// Start server (only if not in Vercel’s serverless mode)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Global error handler (always last)
app.use(errorHandler);

// Required for Vercel to handle the Express app as a function
export default app;
