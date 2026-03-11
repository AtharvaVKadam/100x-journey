import { Router, Request, Response } from 'express';
import { Client } from 'pg';
import { hashPassword, verifyPassword } from './authUtils'; 
import { generateToken } from './jwtUtils';

const router = Router();

const client = new Client({
    user: 'your_user',
    password: 'your_password',
    host: 'localhost',
    port: 5432,
    database: 'your_database',
});
client.connect();

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        const checkUserQuery = `SELECT id FROM users WHERE email = $1;`;
        const checkRes = await client.query(checkUserQuery, [email]);
        
        if (checkRes.rows.length > 0) {
            res.status(400).json({ error: "Email already in use." });
            return;
        }

        const hashedPassword = await hashPassword(password);
        
        const insertQuery = `
            INSERT INTO users (username, email, password_hash) 
            VALUES ($1, $2, $3) 
            RETURNING id, email;
        `;
        const newRes = await client.query(insertQuery, [username, email, hashedPassword]);
        const newUser = newRes.rows[0];

        const token = generateToken(newUser.id, newUser.email);
        res.status(201).json({ message: "Account created!", token });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Signup failed." });
    }
});

export default router;