import { generateToken } from '../utils/generateToken.js';
import { authenticateUser } from '../services/authService.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        const token = generateToken(user);

        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            }
        });

    } catch (err) {
        const status = err.status || 500;
        const message = err.status
            ? err.message
            : 'Internal Server Error';

        res.status(status).json({
            message: 'Login failed',
            error: message,
        });
    }
};
