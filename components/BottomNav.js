"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const BottomNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("mylist");

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
            activeColor: "bg-primary", // Yellow
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="6" height="6" rx="1" />
                    <path d="m3 17 2 2 4-4" />
                    <path d="M13 6h8" />
                    <path d="M13 12h8" />
                    <path d="M13 18h8" />
                </svg>
            ),
        },
        {
            id: "shared",
            label: "SHARED",
            path: "/shared",
            activeColor: "bg-primary", // Yellow
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
            activeColor: "bg-primary", // Yellow
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-black max-w-md mx-auto">
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
                ${isActive ? item.activeColor : "bg-white hover:bg-gray-50"}`}
                        >
                            <div className={`relative ${isActive ? "scale-110" : "scale-100"}`}>
                                {item.icon}
                                {item.id === "mylist" && !isActive && (
                                    <span className="absolute -top-1 -right-2 bg-accent text-black text-[10px] font-bold px-1 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">1</span>
                                )}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wide`}>
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
