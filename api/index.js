import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db.js'
import inscriptionsRoutes from './routes/inscriptions.js';

  dotenv.config();
 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sequelize.sync({ force: true }) // or { alter: true }
//   .then(() => {
//     console.log('All models were synchronized successfully.');
//   })
//   .catch((err) => {
//     console.error('Error syncing models:', err);
//   });

// Example route
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

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
// Required for Vercel to handle the Express app as a function
export default app;
