
import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Experience from "@/models/Experience";

export async function GET() {
    try {
        await connectMongo();
        const experiences = await Experience.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ experiences });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
