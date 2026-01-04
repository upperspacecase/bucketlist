"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import FeedCard from "@/components/FeedCard";

export default function FeedPage() {
    const feedItems = [
        {
            id: 1,
            user: "ALEX",
            action: "COMPLETED",
            date: "JAN 2",
            title: "SEE THE NORTHERN LIGHTS",
            description: "Finally witnessed the aurora in Norway!",
            image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
            category: "ADVENTURE"
        },
        {
            id: 2,
            user: "SARAH",
            action: "WANTS TO DO",
            date: "JAN 1",
            title: "SKYDIVING IN DUBAI",
            description: "Looking for someone to join me on this craziness!",
            image: "https://images.unsplash.com/photo-1529520935529-68875ea48937?w=800&h=600&fit=crop",
            category: "ADVENTURE"
        },
        {
            id: 3,
            user: "MIKE",
            action: "COMPLETED",
            date: "DEC 30",
            title: "LEARN TO SURF",
            description: "Caught my first wave in Bali. Harder than it looks but so worth it.",
            image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=600&fit=crop",
            category: "SPORT"
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-32 font-sans text-foreground">
            <Header />

            <main className="px-5 pt-8 max-w-md mx-auto">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                    WHAT EVERYONE&apos;S DOING
                </h2>

                {feedItems.map((item) => (
                    <FeedCard key={item.id} {...item} />
                ))}
            </main>

            <BottomNav />
        </div>
    );
}
