
async function initializeDatabase() {
    try {
        await client.connect();
        console.log("🚀 Successfully connected to PostgreSQL!");

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await client.query(createTableQuery);
        console.log(" Users table created successfully!");

    } catch (error) {
        console.error(" Database connection failed:", error);
    } finally {
        await client.end(); 
    }
}
initializeDatabase();