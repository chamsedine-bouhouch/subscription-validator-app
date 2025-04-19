import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};
