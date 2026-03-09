import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwtUtils'; 


export interface AuthRequest extends Request {
    user?: any; 
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: "Unauthorized: No token provided." });
        return; 
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedPayload = verifyToken(token);
        
        req.user = decodedPayload;
        
        next();
    } catch (error) {
        res.status(403).json({ error: "Forbidden: Invalid or expired session token." });
        return; 
    }
};
