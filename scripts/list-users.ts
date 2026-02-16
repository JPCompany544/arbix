import { prisma } from "../lib/prisma";

async function list() {
    const users = await prisma.user.findMany();
    for (const user of users) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}

list().catch(console.error);
