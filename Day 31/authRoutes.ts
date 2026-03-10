import { Router, Request, Response } from 'express';
import { hashPassword, verifyPassword } from './authUtils'; 
import { generateToken } from './jwtUtils';

const router = Router();

const usersDB: any[] = []; 

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (usersDB.find(u => u.email === email)) {
            res.status(400).json({ error: "Email already in use." });
            return;
        }

        const hashedPassword = await hashPassword(password);
        
        const newUser = { id: usersDB.length + 1, email, password: hashedPassword };
        usersDB.push(newUser);

        const token = generateToken(newUser.id, newUser.email);
        
        res.status(201).json({ message: "Account created!", token });
    } catch (error) {
        res.status(500).json({ error: "Signup failed." });
    }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = usersDB.find(u => u.email === email);
        if (!user) {
            res.status(401).json({ error: "Invalid credentials." });
            return;
        }

        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials." });
            return;
        }

        const token = generateToken(user.id, user.email);
        
        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed." });
    }
});

export default router;