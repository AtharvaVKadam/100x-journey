import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function hashPassword(plainTextPassword: string): Promise<string> {
    if (!plainTextPassword || plainTextPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }
    
    const hashedPassword = await bcrypt.hash(plainTextPassword, SALT_ROUNDS);
    return hashedPassword;
}

export async function verifyPassword(loginAttempt: string, storedHash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(loginAttempt, storedHash);
    return isMatch;
}

async function testAuth() {
    const myHash = await hashPassword("superSecretP@ssword!");
    console.log("🔒 Stored in DB:", myHash);
    
    const loginSuccess = await verifyPassword("superSecretP@ssword!", myHash);
    console.log("✅ Login Successful?", loginSuccess);
}
testAuth();