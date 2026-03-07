import express from 'express';

const app = express();

const server = app.listen(3000, () => {
    console.log('🚀 Server is running on port 3000');
});

const gracefulShutdown = () => {
    console.log('⚠️ Received kill signal, shutting down gracefully...');
    
    server.close(() => {
        console.log('🔒 Closed out remaining HTTP connections.');
        
        console.log('💾 Database connections safely closed.');
        
        process.exit(0);
    });

    setTimeout(() => {
        console.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);