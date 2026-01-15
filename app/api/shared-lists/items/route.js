import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectMongo from "@/libs/mongoose";
import SharedList from "@/models/SharedList";

export async function POST(req) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        const body = await req.json();
        const { sharedListId, title, category } = body;

        if (!sharedListId || !title) {
            return NextResponse.json({ error: "Shared list ID and title are required" }, { status: 400 });
        }

        const sharedList = await SharedList.findById(sharedListId);
        if (!sharedList) {
            return NextResponse.json({ error: "Shared list not found" }, { status: 404 });
        }

        const isParticipant = sharedList.createdBy === userId || sharedList.participants.includes(userId);
        if (!isParticipant) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const newItem = {
            title: title.trim(),
            addedBy: "You",
            category: category || "Adventure",
            completed: false,
        };

        sharedList.items.push(newItem);
        await sharedList.save();

        return NextResponse.json({ sharedList, item: newItem });
    } catch (error) {
        console.error("POST /api/shared-lists/items error:", error);
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
        const { sharedListId, itemIndex, completed } = body;

        if (sharedListId === undefined || itemIndex === undefined) {
            return NextResponse.json({ error: "Shared list ID and item index are required" }, { status: 400 });
        }

        const sharedList = await SharedList.findById(sharedListId);
        if (!sharedList) {
            return NextResponse.json({ error: "Shared list not found" }, { status: 404 });
        }

        const isParticipant = sharedList.createdBy === userId || sharedList.participants.includes(userId);
        if (!isParticipant) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        if (sharedList.items[itemIndex]) {
            sharedList.items[itemIndex].completed = completed !== undefined ? completed : !sharedList.items[itemIndex].completed;
            if (sharedList.items[itemIndex].completed) {
                sharedList.items[itemIndex].completedBy = userId;
                sharedList.items[itemIndex].completedAt = new Date();
            } else {
                sharedList.items[itemIndex].completedBy = undefined;
                sharedList.items[itemIndex].completedAt = undefined;
            }
            await sharedList.save();
        }

        return NextResponse.json({ sharedList });
    } catch (error) {
        console.error("PATCH /api/shared-lists/items error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
