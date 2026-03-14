import { Router, Response } from 'express';
import { Client } from 'pg';
import { requireAuth, AuthRequest } from './authMiddleware';

const router = Router();

const client = new Client({
    user: 'your_user',
    password: 'your_password',
    host: 'localhost',
    port: 5432,
    database: 'your_database',
});
client.connect();

router.get('/me', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;

        const query = `
            SELECT id, username, email, created_at 
            FROM users 
            WHERE id = $1;
        `;
        
        const dbRes = await client.query(query, [userId]);

        if (dbRes.rows.length === 0) {
            res.status(404).json({ error: "User profile not found." });
            return;
        }

        const userProfile = dbRes.rows[0];

        res.status(200).json({ 
            success: true, 
            user: userProfile 
        });

    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ error: "Failed to fetch user profile." });
    }
});


export default router;