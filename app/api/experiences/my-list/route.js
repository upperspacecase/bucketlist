import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Experience from "@/models/Experience";
import { auth } from "@/libs/auth";

// GET - Returns only the logged-in user's experiences
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ experiences: [] });
        }

        await connectMongo();
        const experiences = await Experience.find({ userId: session.user.id }).sort({ createdAt: -1 });
        return NextResponse.json({ experiences });
    } catch (error) {
        console.error("GET /api/experiences/my-list error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
