import jwt from 'jsonwebtoken';
import { UnauthorizedException, ForbiddenException } from '../utils/exceptions.js';
import { hasRole } from '../utils/hasRole.js';

export const authGuard = (...roles) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization token missing or malformed');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (roles.length && !hasRole(decoded.role, roles)) {
            throw new ForbiddenException('Access denied: insufficient permissions');
        }

        next(); // Continue to controller
    };
};
