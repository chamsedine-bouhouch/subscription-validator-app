import express from 'express';
import { authGuard } from '../middlewares/authGuard.js';

const router = express.Router();

router.get('/me', authGuard('user', 'admin'), (req, res) => {
    res.json({ message: `Hello ${req.user.email}`, user: req.user });
});

export default router;
