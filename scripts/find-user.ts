import { prisma } from "../lib/prisma";

async function check() {
    const user = await prisma.user.findUnique({
        where: { id: "cmlkl86iz000bawdiv41snfgtg" } // Guessing the full ID from previous snippets
    });
    console.log("User:", user);
}

check();
