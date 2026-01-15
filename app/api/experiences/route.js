import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectMongo from "@/libs/mongoose";
import Experience from "@/models/Experience";

// GET - Public access to all experiences
export async function GET() {
    try {
        await connectMongo();
        const experiences = await Experience.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ experiences });
    } catch (error) {
        console.error("GET /api/experiences error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Requires auth to add new items
export async function POST(req) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Sign in to add items" }, { status: 401 });
        }

        await connectMongo();
        const body = await req.json();

        if (!body.title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const newExperience = await Experience.create({
            ...body,
            userId,
            completed: false,
            addedBy: "You",
            image: body.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
            location: body.location || "Worldwide",
            country: body.country || "Worldwide",
            category: body.category || "Adventure",
            region: body.region || "americas",
            difficulty: "easy"
        });

        return NextResponse.json({ experience: newExperience });
    } catch (error) {
        console.error("POST /api/experiences error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PATCH - Requires auth to update items
export async function PATCH(req) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Sign in to update items" }, { status: 401 });
        }

        await connectMongo();
        const body = await req.json();
        const { id, ...updates } = body;

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const experience = await Experience.findById(id);
        if (!experience) {
            return NextResponse.json({ error: "Experience not found" }, { status: 404 });
        }

        if (experience.userId && experience.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedExperience = await Experience.findByIdAndUpdate(id, updates, { new: true });
        return NextResponse.json({ experience: updatedExperience });
    } catch (error) {
        console.error("PATCH /api/experiences error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Requires auth to delete items
export async function DELETE(req) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Sign in to delete items" }, { status: 401 });
        }

        await connectMongo();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const experience = await Experience.findById(id);
        if (!experience) {
            return NextResponse.json({ error: "Experience not found" }, { status: 404 });
        }

        if (experience.userId && experience.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await Experience.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/experiences error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
