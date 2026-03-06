import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: string;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const globalErrorHandler = (
    err: AppError | Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const status = err instanceof AppError ? err.status : 'error';

    res.status(statusCode).json({
        status: status,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
