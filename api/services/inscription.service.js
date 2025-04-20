import Inscription from '../models/Inscription.js';
import { generateJWT, isTokenValid } from '../utils/generate-token.js';

export const getAll = async () => {
    return await Inscription.findAll();
};

export const create = async ({ name, lastname, email }) => {
    if (!name || !lastname || !email) {
        throw new Error('Missing required fields');
    }

    return await Inscription.create({
        name,
        lastname,
        email,
        validated: false,
        bearer_token: null,
        validation_date: null,
    });
};

export const validate = async (id) => {
    const inscription = await Inscription.findByPk(id);
    if (!inscription) throw new Error('Inscription not found');
    if (inscription.validated) throw new Error('Already validated');

    inscription.validated = true;
    inscription.validation_date = new Date();
    await inscription.save();

    return { message: 'Inscription validated successfully' };
};

export const generateToken = async (id) => {
    const inscription = await Inscription.findByPk(id);
    if (!inscription) throw new Error('Inscription not found');
    if (!inscription.validated) throw new Error('Must be validated first');

    if (inscription.bearer_token && isTokenValid(inscription.bearer_token)) {
        return {
            message: 'Existing valid token',
            bearer_token: inscription.bearer_token,
        };
    }

    const token = generateJWT(inscription.id);
    inscription.bearer_token = token;
    await inscription.save();

    return {
        message: 'New token generated and saved',
        bearer_token: token,
    };
};
