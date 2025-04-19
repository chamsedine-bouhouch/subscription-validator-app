import express from 'express';
import Inscription from '../models/Inscription.js';
import { authGuard } from '../middlewares/authGuard.js';
import { generateJWT, isTokenValid } from '../utils/generateToken.js';


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
            bearer_token: null,
            validation_date: null,
        });

        res.status(201).json(newInscription);
    } catch (error) {
        console.error('Error creating inscription:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /:id/validate — validate an inscription once
router.post('/:id/validate', async (req, res) => {
    const { id } = req.params;

    try {
        const inscription = await Inscription.findByPk(id);
        if (!inscription) {
            return res.status(404).json({ error: 'Inscription not found' });
        }

        if (inscription.validated) {
            return res.status(400).json({ error: 'Inscription already validated' });
        }

        inscription.validated = true;
        inscription.validation_date = new Date();
        await inscription.save();

        // TODO: Send confirmation email

        res.json({ message: 'Inscription validated successfully' });
    } catch (error) {
        console.error('Error validating inscription:', error);
        res.status(500).json({ error: 'Failed to validate inscription' });
    }
});

// GET /token/:id — generate JWT after validation
router.get('/token/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const inscription = await Inscription.findByPk(id);
        if (!inscription) {
            return res.status(404).json({ error: 'Inscription not found' });
        }

        if (!inscription.validated) {
            return res.status(400).json({ error: 'Inscription must be validated first' });
        }

        // Check if existing token is still valid
        if (inscription.bearer_token && isTokenValid(inscription.bearer_token)) {
            return res.json({
                message: 'Existing valid token',
                bearer_token: inscription.bearer_token
            });
        }

        // Generate new token
        const token = generateJWT(inscription.id);
        inscription.bearer_token = token;
        await inscription.save();

        // TODO: Send token by email

        res.json({
            message: 'New token generated and saved',
            bearer_token: token
        });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ error: 'Failed to generate token' });
    }
});

export default router;