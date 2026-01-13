import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Experience from "@/models/Experience";

export async function GET() {
    try {
        await connectMongo();
        
        // Get all completed experiences from all users, sorted by completion date (most recent first)
        // We'll use updatedAt to approximate when it was completed
        const experiences = await Experience.find({ 
            completed: true 
        })
        .sort({ updatedAt: -1 })
        .limit(50); // Limit to 50 most recent

        // Format experiences for feed
        const feedItems = experiences.map((exp) => {
            const completedDate = new Date(exp.updatedAt);
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const formattedDate = `${monthNames[completedDate.getMonth()]} ${completedDate.getDate()}`;

            return {
                id: exp._id.toString(),
                user: exp.addedBy || "Anonymous",
                action: "COMPLETED",
                date: formattedDate,
                title: exp.title,
                description: exp.tips || `Completed ${exp.title} in ${exp.location}!`,
                image: exp.image,
                category: exp.category?.toUpperCase() || "ADVENTURE"
            };
        });

        return NextResponse.json({ feedItems });
    } catch (error) {
        console.error("GET /api/feed error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
