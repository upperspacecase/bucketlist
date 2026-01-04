"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const BottomNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("mylist");

    // Sync active tab with pathname if needed, or handle internal state
    useEffect(() => {
        if (pathname === "/") setActiveTab("mylist");
        else if (pathname.includes("shared")) setActiveTab("shared");
        else if (pathname.includes("feed")) setActiveTab("feed");
    }, [pathname]);

    const navItems = [
        {
            id: "mylist",
            label: "MY LIST",
            path: "/",
            color: "bg-primary", // Yellow
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <list className="lucide lucide-list-checks"><path d="m3 17 2 2 4-4" /><path d="m3 7 2 2 4-4" /><path d="M13 6h8" /><path d="M13 12h8" /><path d="M13 18h8" /></list>
                    <path d="M9 6l1 1-1 1" /> {/* Manual adjustment for check-list look if needed, but generic list is fine */}
                    <rect x="3" y="5" width="6" height="6" rx="1" />
                    <path d="m3 17 2 2 4-4" />
                    <path d="M13 6h8" />
                    <path d="M13 12h8" />
                    <path d="M13 18h8" />
                </svg>
            ),
            iconActive: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="4" />
                </svg>
            )
        },
        {
            id: "shared",
            label: "SHARED",
            path: "/shared",
            color: "bg-primary", // Shared uses same yellow in mock, or maybe green? Mock 1 uses yellow for "shared" header? No, mock 1 shows a list. Mock 3 footer has "Shared" in middle.
            // Let's match the mock: My List (Left), Shared (Middle), Feed (Right).
            // Mock active state for Shared isn't explicitly yellow but My List is yellow. Let's use Yellow for all or specific colors. 
            // The mocks show "My List" active is Yellow. "Feed" active is Yellow. It seems the active color is consistently Yellow or the primary brand color.
            // Wait, mock 1 shows "Shared Lists" header, maybe different.
            // I'll stick to Yellow (primary) for active state for now to be safe, or alternate if specified.
            // The mocks actually show a colored dot for each: Yellow, Green, Pink.
            // Maybe I should match: My List = Yellow, Shared = Green, Feed = Pink?
            // Let's try that for fun/variety as requested "Neo-Brutalism".
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            id: "feed",
            label: "FEED",
            path: "/feed",
            color: "bg-primary",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-black max-w-md mx-auto">
            <div className="flex justify-between items-stretch h-20">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                router.push(item.path);
                            }}
                            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 
                ${isActive ? "bg-primary" : "bg-white hover:bg-gray-50"}`}
                        >
                            {/* Badge for notification if needed */}
                            {item.id === "mylist" && (
                                <div className="absolute top-4 right-1/2 translate-x-4">
                                    {/* Optional red badge placeholder */}
                                </div>
                            )}

                            <div className={`relative ${isActive ? "scale-110" : "scale-100"}`}>
                                {item.icon}
                                {item.id === "mylist" && !isActive && (
                                    <span className="absolute -top-1 -right-2 bg-accent text-black text-[10px] font-bold px-1 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">1</span>
                                )}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wide ${isActive ? "opacity-100" : "opacity-100"}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
