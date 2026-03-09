import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_meetai_dev_key_2026';

export function generateToken(userId: number, email: string): string {

    const payload = { id: userId, email };
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
    
    return token;
}


export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new Error("❌ Invalid or expired session token.");
    }
}