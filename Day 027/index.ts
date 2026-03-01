import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'


const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL, 
}).$extends(withAccelerate())

async function createRelationalData(userId: number, postTitle: string) {
    try {
        console.log("Connecting via serverless connection pool...");

        const newPost = await prisma.post.create({
            data: {
                title: postTitle,
                author: {
                    connect: { id: userId }
                }
            },
            include: {
                author: true 
            }
        });
        
        console.log("Securely inserted relational data:", newPost);
        return newPost;

    } catch (error) {
        console.error("❌Database operation failed:", error);
    }
}