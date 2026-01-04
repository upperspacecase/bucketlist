"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ListItem from "@/components/ListItem";

export default function SharedPage() {
    return (
        <div className="min-h-screen bg-background pb-32 font-sans text-foreground">
            <Header />

            <main className="px-5 pt-8 max-w-md mx-auto">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                    SHARED LISTS
                </h2>

                {/* Create Shared List Button */}
                <button className="w-full py-6 mb-8 border-2 border-dashed border-black font-bold uppercase tracking-wide bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    CREATE SHARED LIST
                </button>

                {/* Shared List Group */}
                <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center justify-between p-4 border-b-2 border-black cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-4">
                                <div className="w-8 h-8 rounded-full bg-gray-300 border border-black z-0">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="You" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-400 border border-black z-10">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold uppercase text-sm">TRIP WITH ALEX</h3>
                                <p className="text-[10px] text-gray-500 font-mono">1/2 done</p>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>

                    <div className="h-1.5 w-full bg-gray-100 border-b-2 border-black flex">
                        <div className="h-full bg-secondary w-1/2"></div>
                    </div>

                    <div className="bg-white">
                        <button className="w-full py-3 text-xs font-bold uppercase border-b-2 border-black hover:bg-gray-50 flex items-center justify-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            ADD ITEM
                        </button>

                        <ListItem
                            item={{
                                title: "ROAD TRIP ROUTE 66",
                                addedBy: "Alex",
                                category: "TRAVEL",
                                completed: false
                            }}
                        />
                        <ListItem
                            item={{
                                title: "GRAND CANYON HELICOPTER",
                                addedBy: "You",
                                category: "ADVENTURE",
                                completed: true
                            }}
                        />
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
