const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        message: "🚀 Hello from the AWS EC2 Instance!",
        status: "Healthy",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});