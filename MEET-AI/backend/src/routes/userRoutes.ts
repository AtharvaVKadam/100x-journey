import { Router, Response } from 'express';
import { protectRoute, AuthRequest } from '../middlewares/authMiddleware';
import { Client } from 'pg';
import 'dotenv/config';

const router = Router();

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
});
client.connect();

router.get('/me', protectRoute, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        
        const query = `SELECT id, username, email, created_at FROM users WHERE id = $1`;
        const dbRes = await client.query(query, [userId]);

        if (dbRes.rows.length === 0) {
            res.status(404).json({ error: "User profile not found." });
            return;
        }
        
        res.status(200).json(dbRes.rows[0]);

    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

export default router;