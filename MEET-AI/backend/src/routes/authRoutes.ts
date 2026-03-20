import { Router, Request, Response } from 'express';
import { Client } from 'pg';
import { hashPassword, verifyPassword } from '../utils/authUtils'; 
import { generateToken } from '../utils/jwtUtils';
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

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const userQuery = `SELECT id, email, password_hash FROM users WHERE email = $1;`;
        const dbRes = await client.query(userQuery, [email]);
        
        if (dbRes.rows.length === 0) {
            res.status(401).json({ error: "Invalid email or password." });
            return;
        }

        const user = dbRes.rows[0];

        const isPasswordValid = await verifyPassword(password, user.password_hash);
        
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid email or password." });
            return;
        }

        const token = generateToken(user.id, user.email);
        
        res.status(200).json({ 
            message: "Login successful!", 
            token 
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error during login." });
    }
});

export default router;