import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());

const requestCounts = new Map<string, { count: number, startTime: number }>();

const WINDOW_MS = 60 * 1000; 
const MAX_REQUESTS = 5; 

const aiRateLimiter = (req: Request, res: Response, next: NextFunction) => {

    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const currentTime = Date.now();

    if (!requestCounts.has(ip)) {
        requestCounts.set(ip, { count: 1, startTime: currentTime });
        return next();
    }

    const record = requestCounts.get(ip)!;

    if (currentTime - record.startTime > WINDOW_MS) {
        record.count = 1;
        record.startTime = currentTime;
        return next();
    }

    if (record.count >= MAX_REQUESTS) {
        const retryAfter = Math.ceil((WINDOW_MS - (currentTime - record.startTime)) / 1000);
        res.status(429).set('Retry-After', String(retryAfter)).json({
            error: "Too Many Requests",
            message: `You are requesting too fast. Please pause and try again in ${retryAfter} seconds.`,
            credits_remaining: 0
        });
        return;
    }

    record.count++;
    next();
};

app.post('/api/ai/generate-transcript', aiRateLimiter, (req, res) => {
    res.json({ 
        success: true, 
        message: "AI Agent is securely processing your meeting transcript..." 
    });
});

app.listen(3000, () => console.log('🚀 Day 030 Server shielded and running on port 3000'));