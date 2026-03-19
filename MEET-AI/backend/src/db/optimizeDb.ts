import { Client } from 'pg';

const client = new Client({
    user: 'atharva191',
    password: '*****',
    host: 'localhost',
    port: 5432,
    database: 'your_database',
});

async function addEmailIndex() {
    try {
        await client.connect();
        console.log(" Connected to PostgreSQL!");

        const indexQuery = `
            CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email 
            ON users(email);
        `;
        
        await client.query(indexQuery);
        console.log(" B-Tree Index created on users(email). Login queries optimized!");

    } catch (error) {
        console.error(" Database operation failed:", error);
    } finally {
        await client.end(); 
        console.log("🔌 Connection closed.");
    }
}

addEmailIndex();