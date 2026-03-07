import { Router, Request, Response } from 'express';

const router = Router();

router.get('/health', async (req: Request, res: Response) => {
    const healthStatus = {
        uptime: Math.floor(process.uptime()) + ' seconds',
        message: 'System is running smoothly.',
        timestamp: new Date().toISOString(),
        database: 'Checking...'
    };

    try {
        healthStatus.database = 'Healthy & Connected';
        
        res.status(200).json(healthStatus);
    } catch (error) {
        healthStatus.message = 'System degraded.';
        healthStatus.database = 'Disconnected';
        
        res.status(503).json(healthStatus);
    }
});

export default router;
