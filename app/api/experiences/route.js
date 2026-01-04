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

export async function POST(req) {
    try {
        await connectMongo();
        const body = await req.json();

        // Simple validation
        if (!body.title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const newExperience = await Experience.create({
            ...body,
            // Defaults for quick add
            completed: false,
            addedBy: "You",
            image: body.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop", // generic travel placeholder
            location: body.location || "Worldwide",
            country: body.country || "Worldwide",
            category: body.category || "Adventure",
            region: body.region || "americas",
            difficulty: "easy"
        });

        return NextResponse.json({ experience: newExperience });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await connectMongo();
        const body = await req.json();
        const { id, ...updates } = body;

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const updatedExperience = await Experience.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        return NextResponse.json({ experience: updatedExperience });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectMongo();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await Experience.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
