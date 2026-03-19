import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const signupSchema = z.object({
    email: z.string().email("Invalid email format provided."),
    password: z.string().min(8, "Password must be at least 8 characters long.")
});

export const validateSignup = (req: Request, res: Response, next: NextFunction): void => {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            error: "Validation failed",
            details: result.error.format() 
        });
        return; 
    }
    next();
};

