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
                if (!res.ok) {
                    throw new Error("Failed to load feed");
                }
                const data = await res.json();
                if (data.feedItems) {
                    setFeedItems(data.feedItems);
                }
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
        <div className="min-h-screen bg-background pb-32 font-sans text-foreground">
            <Header />

            <main className="px-5 pt-8 max-w-md mx-auto">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                    WHAT EVERYONE&apos;S DOING
                </h2>

                {loading ? (
                    <div className="text-center py-10 font-bold animate-pulse">LOADING...</div>
                ) : feedItems.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 font-bold">
                        NO COMPLETED ITEMS YET
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
