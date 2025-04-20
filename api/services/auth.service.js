import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { NotFoundException, UnauthorizedException } from '../utils/exceptions.js';

export const authenticateUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new NotFoundException('User not found');
    }

    if (!user.password) {
        throw new UnauthorizedException('Invalid password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new UnauthorizedException('Invalid password');
    }

    return user;
};
