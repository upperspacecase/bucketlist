"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";

export default function FeedPage() {
    const [feedItems, setFeedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/feed");
                if (!res.ok) throw new Error("Failed to load feed");
                const data = await res.json();
                if (data.feedItems) setFeedItems(data.feedItems);
            } catch (error) {
                console.error("fetchFeed Error:", error);
                toast.error("Couldn't load stories right now");
            } finally {
                setLoading(false);
            }
        };
        fetchFeed();
    }, []);

    return (
        <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
            <Header />
            <main className="px-5 pt-4 max-w-md mx-auto">
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-foreground">Inspiration</h2>
                    <p className="text-sm text-muted mt-1">Dreams others have lived</p>
                </div>

                {loading ? (
                    <div className="text-center py-10 text-muted">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : feedItems.length === 0 ? (
                    <div className="text-center py-12 text-muted">
                        <p className="text-base mb-1">No stories yet</p>
                        <p className="text-sm text-muted-foreground">When people live their dreams, their stories will appear here.</p>
                    </div>
                ) : (
                    feedItems.map((item) => (
                        <FeedCard key={item.id} {...item} />
                    ))
                )}
            </main>
            <BottomNav />
        </div>
    );
}
