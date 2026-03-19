import { Client } from 'pg';
import 'dotenv/config';

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
});

async function setupDatabase() {
    try {
        await client.connect();
        console.log("🔌 Connected to PostgreSQL...");

        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        await client.query(createUsersTable);
        console.log("Users table successfully created!");

    } catch (error) {
        console.error("Database error:", error);
    } finally {
        await client.end();
    }
}

setupDatabase();