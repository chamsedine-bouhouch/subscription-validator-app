import express from 'express';
import { getAllInscriptions, createInscription, validateInscription, generateBearerToken } from '../controllers/inscription.controller.js';
import { authGuard } from '../middlewares/auth.guard.js';

const router = express.Router();

router.get('/', authGuard('user', 'admin'), getAllInscriptions);
router.post('/', createInscription);
router.post('/:id/validate', validateInscription);
router.post('/:id/token', generateBearerToken);

export default router;
