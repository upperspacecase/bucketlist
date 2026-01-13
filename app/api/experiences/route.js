import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Experience from "@/models/Experience";
import { auth } from "@/libs/auth";

export async function GET() {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        // Only return experiences for the authenticated user
        const experiences = await Experience.find({ userId: session.user.id }).sort({ createdAt: -1 });
        return NextResponse.json({ experiences });
    } catch (error) {
        console.error("GET /api/experiences error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        const body = await req.json();

        // Simple validation
        if (!body.title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const newExperience = await Experience.create({
            ...body,
            // Associate with authenticated user
            userId: session.user.id,
            // Defaults for quick add
            completed: false,
            addedBy: session.user.name || "You",
            image: body.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop", // generic travel placeholder
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

export async function PATCH(req) {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        const body = await req.json();
        const { id, ...updates } = body;

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        // Verify the experience belongs to the user
        const experience = await Experience.findById(id);
        if (!experience) {
            return NextResponse.json({ error: "Experience not found" }, { status: 404 });
        }
        if (experience.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedExperience = await Experience.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        return NextResponse.json({ experience: updatedExperience });
    } catch (error) {
        console.error("PATCH /api/experiences error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        // Verify the experience belongs to the user
        const experience = await Experience.findById(id);
        if (!experience) {
            return NextResponse.json({ error: "Experience not found" }, { status: 404 });
        }
        if (experience.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await Experience.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/experiences error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
