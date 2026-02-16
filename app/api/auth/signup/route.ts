import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Signup API is working" });
}

export async function POST(req: Request) {
    console.log("Signup request received");
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // Generate token so user is logged in immediately
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json({
            message: "User created successfully",
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });

        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
    } catch (error: any) {
        console.error("Signup error details:", {
            message: error.message,
            stack: error.stack,
            error
        });
        return NextResponse.json({
            error: error.message || "Internal server error",
            details: process.env.NODE_ENV === "development" ? error.stack : undefined
        }, { status: 500 });
    }
}

