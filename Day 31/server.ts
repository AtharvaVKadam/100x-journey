import express from 'express';
import cors from 'cors';
import authRoutes from './authRoutes';
import uploadRoutes from './uploadRoutes';

app.use('/api/upload', uploadRoutes);

const app = express();
const PORT = 5000; 


app.use(cors()); 
app.use(express.json()); 


app.use('/api', authRoutes); 

app.listen(PORT, () => {
    console.log(`🚀 MeetAI Backend running securely on http://localhost:${PORT}`);
});