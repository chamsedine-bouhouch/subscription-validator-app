import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};
export const generateJWT = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1m' }); // 1 min
};

export const isTokenValid = (token) => {
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
};