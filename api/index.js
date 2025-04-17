import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import inscriptionsRoutes from './routes/inscriptions.js';

import sequelize from './db.js'

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
app.use('/api/inscriptions', inscriptionsRoutes);

// Start server (only if not in Vercel’s serverless mode)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
// Required for Vercel to handle the Express app as a function
export default app;
