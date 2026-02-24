import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🚀 Starting Prisma Operations...");

    const newUser = await prisma.user.create({
        data: {
            username: "atharva_100x",
            email: "atharva@100xdevs.com",
            todos: {
                create: {
                    title: "Master Prisma ORM",
                    description: "Complete Day 4 lecture and push to GitHub"
                }
            }
        }
    });
    console.log("✅ Created User:", newUser.username);

    const userWithTodos = await prisma.user.findUnique({
        where: {
            email: "atharva@100xdevs.com"
        },
        include: {
            todos: true 
        }
    });

    console.log("🔍 User Data with nested Todos:");
    console.dir(userWithTodos, { depth: null, colors: true });
}

main()
    .catch((error) => {
        console.error("❌ Prisma Error:", error);
    })
    .finally(async () => {
        await prisma.$disconnect(); 
        console.log("🔌 Database connection closed.");
    });