import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as { userId: string, role: string };
        if (decoded.role !== "ADMIN") {
            return null;
        }
        return decoded;
    } catch (e) {
        return null;
    }
}
export async function verifyUser(req?: Request) {
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    // Check Authorization header if cookie missing and req provided
    if (!token && req) {
        const authHeader = req.headers.get("Authorization");
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: string };
        return decoded;
    } catch (e) {
        return null;
    }
}
