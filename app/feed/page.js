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
                toast.error("Failed to load feed");
            } finally {
                setLoading(false);
            }
        };
        fetchFeed();
    }, []);

    return (
        <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
            <Header />
            <main className="px-5 pt-6 max-w-md mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg tracking-[0.15em] font-semibold text-white">Discover</h2>
                </div>

                {loading ? (
                    <div className="text-center py-10 text-muted-foreground">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        Loading...
                    </div>
                ) : feedItems.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                        No experiences yet
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
