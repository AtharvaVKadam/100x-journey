import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let userHistory = [
    { id: 1, name: "Pricing Table Component", time: "10 mins ago" },
    { id: 2, name: "Authentication Modal", time: "1 hour ago" },
];

let userCredits = 10; 

app.get('/api/v1/history', (req, res) => {
    res.status(200).json({ history: userHistory });
});

app.get('/api/v1/stats', (req, res) => {
    res.status(200).json({
        totalGenerations: userHistory.length,
        creditsRemaining: userCredits
    });
});

app.post('/api/v1/generate', (req, res) => {
    const { prompt } = req.body;
    
    if (userCredits <= 0) {
        return res.status(403).json({ error: "Out of credits. Please upgrade to Pro." });
    }

    const newItem = {
        id: Date.now(),
        name: prompt ? `${prompt} Component` : "Hero Section Component",
        time: "Just now"
    };

    userHistory.unshift(newItem); 
    userCredits -= 1;       

    setTimeout(() => {
        res.status(201).json({
            message: "Component generated successfully!",
            creditsLeft: userCredits,
            data: newItem
        });
    }, 1500);
});

app.delete('/api/v1/history/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const initialLength = userHistory.length;
    
    userHistory = userHistory.filter(item => item.id !== idToDelete);
    
    if (userHistory.length === initialLength) {
        return res.status(404).json({ error: "Component not found" });
    }

    res.status(200).json({ 
        message: "Component deleted successfully",
        remainingHistory: userHistory
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 MeetAI Backend running on http://localhost:${PORT}`);
});