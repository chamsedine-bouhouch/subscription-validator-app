import { CustomError } from "../utils/exceptions.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        // Handle known custom errors
        return res.status(err.statusCode).json({ message: err.message });
    }

    res.status(500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};
