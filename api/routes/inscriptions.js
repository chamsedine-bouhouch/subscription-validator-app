import express from 'express';
import Inscription from '../models/Inscription.js';
import { authGuard } from '../middlewares/authGuard.js';

const router = express.Router();

router.get('/', authGuard('user', 'admin'), async (req, res) => {
    try {
        const inscriptions = await Inscription.findAll();
        res.json(inscriptions);
    } catch (err) {
        console.error('Error fetching inscriptions:', err);
        res.status(500).json({ error: 'Failed to fetch inscriptions' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, lastname, email } = req.body;

        // ✅ Optionnel : validation basique
        if (!name || !lastname || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newInscription = await Inscription.create({
            name,
            lastname,
            email,
            validated: false,
            bearer_token: generateToken(), // à définir ou laisser vide
            validation_date: null,
        });

        res.status(201).json(newInscription);
    } catch (error) {
        console.error('Error creating inscription:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// 🔐 Simple token generator (optionnel)
function generateToken(length = 24) {
    return Math.random().toString(36).substring(2, 2 + length);
}
export default router;