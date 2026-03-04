import { Client } from 'pg';

const client = new Client({
    user: 'your_user',
    password: 'your_password',
    host: 'localhost',
    port: 5432,
    database: 'your_database',
});

async function manageUsers() {
    try {
        await client.connect();
        console.log("🚀 Connected to PostgreSQL!");

        const insertQuery = `
            INSERT INTO users (username, email) 
            VALUES ($1, $2) 
            RETURNING id, username, email;
        `;
        const newUserValues = ['atharva_dev', 'atharva@meetai.com'];
        
        const insertRes = await client.query(insertQuery, newUserValues);
        console.log("User Inserted:", insertRes.rows[0]);

        const fetchQuery = `SELECT * FROM users WHERE username = $1;`;
        const fetchRes = await client.query(fetchQuery, ['atharva_dev']);
        
        console.log("User Fetched from DB:", fetchRes.rows[0]);

    } catch (error) {
        console.error("Database operation failed:", error);
    } finally {
        await client.end(); 
    }
}

manageUsers();