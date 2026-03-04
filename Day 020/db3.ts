import { Client } from 'pg';

const client = new Client({
    user: 'your_user',
    password: 'your_password',
    host: 'localhost',
    port: 5432,
    database: 'your_database',
});

async function updateAndDelete() {
    try {
        await client.connect();
        console.log("🚀 Connected to PostgreSQL!");

        const updateQuery = `
            UPDATE users 
            SET email = $1 
            WHERE username = $2 
            RETURNING id, username, email;
        `;
        const updateValues = ['updated_email@meetai.com', 'atharva_dev'];
        
        const updateRes = await client.query(updateQuery, updateValues);
        if (updateRes.rows.length > 0) {
            console.log("✏️ User Updated:", updateRes.rows[0]);
        } else {
            console.log("⚠️ No user found to update.");
        }

        const deleteQuery = `
            DELETE FROM users 
            WHERE username = $1 
            RETURNING id, username;
        `;
        const deleteValues = ['atharva_dev']; 
        
        const deleteRes = await client.query(deleteQuery, deleteValues);
        if (deleteRes.rows.length > 0) {
            console.log("🗑️ User Deleted:", deleteRes.rows[0]);
        } else {
            console.log("⚠️ No user found to delete.");
        }

    } catch (error) {
        console.error("❌ Database operation failed:", error);
    } finally {
        await client.end(); 
        console.log("🔌 Connection closed.");
    }
}

updateAndDelete();