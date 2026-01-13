import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import SharedList from "@/models/SharedList";
import { auth } from "@/libs/auth";

export async function GET() {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        
        // Get all shared lists where user is a participant
        const sharedLists = await SharedList.find({
            $or: [
                { createdBy: session.user.id },
                { participants: session.user.id }
            ]
        }).sort({ updatedAt: -1 });

        return NextResponse.json({ sharedLists });
    } catch (error) {
        console.error("GET /api/shared-lists error:", error);
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

        // Validation
        if (!body.name || !body.name.trim()) {
            return NextResponse.json({ error: "List name is required" }, { status: 400 });
        }

        // Create shared list with creator as first participant
        const newSharedList = await SharedList.create({
            name: body.name,
            createdBy: session.user.id,
            participants: [session.user.id, ...(body.participants || [])],
            items: [],
        });

        return NextResponse.json({ sharedList: newSharedList });
    } catch (error) {
        console.error("POST /api/shared-lists error:", error);
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

        if (!id) {
            return NextResponse.json({ error: "Shared list ID required" }, { status: 400 });
        }

        // Verify user is a participant
        const sharedList = await SharedList.findById(id);
        if (!sharedList) {
            return NextResponse.json({ error: "Shared list not found" }, { status: 404 });
        }

        const isParticipant = sharedList.createdBy === session.user.id || 
                              sharedList.participants.includes(session.user.id);
        
        if (!isParticipant) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Update the shared list
        const updatedSharedList = await SharedList.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        return NextResponse.json({ sharedList: updatedSharedList });
    } catch (error) {
        console.error("PATCH /api/shared-lists error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
