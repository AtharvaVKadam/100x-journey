import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 5000; 

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'active',
        service: 'MeetAI Core API',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
    });
});

app.use(cors()); 
app.use(express.json()); 

app.use('/api', authRoutes); 
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`🚀 MeetAI Backend running securely on http://localhost:${PORT}`);
});