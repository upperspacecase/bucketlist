import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectMongo from "@/libs/mongoose";
import Experience from "@/models/Experience";

// GET - Returns only the logged-in user's experiences
export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ experiences: [] });
        }

        await connectMongo();
        const experiences = await Experience.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json({ experiences });
    } catch (error) {
        console.error("GET /api/experiences/my-list error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
