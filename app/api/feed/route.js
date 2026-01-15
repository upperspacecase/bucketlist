import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Experience from "@/models/Experience";

export async function GET() {
    try {
        await connectMongo();

        // Get ALL experiences from all users, sorted by most recent first
        const experiences = await Experience.find({})
            .sort({ createdAt: -1 })
            .limit(100);

        // Format experiences for feed
        const feedItems = experiences.map((exp) => {
            const addedDate = new Date(exp.createdAt);
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const formattedDate = `${monthNames[addedDate.getMonth()]} ${addedDate.getDate()}`;

            return {
                id: exp._id.toString(),
                user: exp.addedBy || "Anonymous",
                action: exp.completed ? "completed" : "added",
                date: formattedDate,
                title: exp.title,
                description: exp.tips || exp.location || "Bucket list experience",
                image: exp.image,
                category: exp.category || "Adventure",
                completed: exp.completed
            };
        });

        return NextResponse.json({ feedItems });
    } catch (error) {
        console.error("GET /api/feed error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
