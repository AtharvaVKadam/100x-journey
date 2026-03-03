import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    });
    next();
});

const checkRole = (requiredRole: 'admin' | 'user') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.headers['x-user-role']; 
        
        if (userRole === requiredRole) {
            next();
        } else {
            res.status(403).json({ error: "Access Denied: High-level clearance required." });
        }
    };
};

app.get('/dashboard', checkRole('user'), (req, res) => {
    res.json({ message: "Welcome to your user dashboard!" });
});

app.post('/admin/system-reset', checkRole('admin'), (req, res) => {
    res.json({ message: "System reset initiated. Hope you meant to do that!" });
});

app.listen(3000, () => console.log('🚀 Day 029 Server running on port 3000'));