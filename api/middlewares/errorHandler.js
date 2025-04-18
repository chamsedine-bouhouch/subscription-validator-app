import { CustomError } from "../utils/exceptions.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        // Handle known custom errors
        return res.status(err.statusCode).json({ message: err.message });
    }

    // Handle unexpected errors
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', error: 'Something went wrong' });
};
