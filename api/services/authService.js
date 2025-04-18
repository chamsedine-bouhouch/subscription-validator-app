import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const authenticateUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid password');
        error.status = 401;
        throw error;
    }
    return user;
};
