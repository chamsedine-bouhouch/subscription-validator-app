
import fs from 'fs';
import path from 'path';

import { CustomError } from "../utils/exceptions.js";

const logsDir = path.join(process.cwd(), 'logs');
const logFile = path.join(logsDir, 'errors.log');

export const errorHandler = (err, req, res, next) => {

    // ✅ Ensure logs directory exists before writing
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${err.statusCode} ${err.name}: ${err.message}\n`;

    // Write to console (optional)
    if (process.env.NODE_ENV !== 'production') {
        console.error(log);
    }

    // Append to log file (creates the file if it doesn't exist)
    try {
        fs.appendFileSync(logFile, log, 'utf8');
    } catch (fileErr) {
        console.error('Failed to write error log:', fileErr);
    }

    if (err instanceof CustomError) {
        // Handle known custom errors
        return res.status(err.statusCode).json({ message: err.message });
    }

    res.status(500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};
