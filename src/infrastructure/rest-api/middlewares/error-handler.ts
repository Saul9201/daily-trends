import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError';

const errorHandler = (
    err: HttpError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) => {
    const { message, description, errorCode, details } = err;
    res.status(err.status || 500).json({
        error: {
            errorCode,
            message,
            description,
            ...details,
        },
    });
};

export default errorHandler;