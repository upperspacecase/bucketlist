import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectMongo from "@/libs/mongoose";
import SharedList from "@/models/SharedList";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();

        const sharedLists = await SharedList.find({
            $or: [
                { createdBy: userId },
                { participants: userId }
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
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        const body = await req.json();

        if (!body.name || !body.name.trim()) {
            return NextResponse.json({ error: "List name is required" }, { status: 400 });
        }

        const newSharedList = await SharedList.create({
            name: body.name,
            createdBy: userId,
            participants: [userId, ...(body.participants || [])],
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
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        const body = await req.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: "Shared list ID required" }, { status: 400 });
        }

        const sharedList = await SharedList.findById(id);
        if (!sharedList) {
            return NextResponse.json({ error: "Shared list not found" }, { status: 404 });
        }

        const isParticipant = sharedList.createdBy === userId || sharedList.participants.includes(userId);

        if (!isParticipant) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedSharedList = await SharedList.findByIdAndUpdate(id, updates, { new: true });
        return NextResponse.json({ sharedList: updatedSharedList });
    } catch (error) {
        console.error("PATCH /api/shared-lists error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
