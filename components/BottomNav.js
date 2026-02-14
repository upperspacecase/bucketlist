"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const BottomNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("mylist");

    useEffect(() => {
        if (pathname === "/" || pathname === "/app") setActiveTab("mylist");
        else if (pathname.includes("shared")) setActiveTab("shared");
        else if (pathname.includes("feed")) setActiveTab("feed");
    }, [pathname]);

    const navItems = [
        {
            id: "mylist",
            label: "My dreams",
            path: "/app",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            ),
        },
        {
            id: "shared",
            label: "Together",
            path: "/shared",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            id: "feed",
            label: "Inspire me",
            path: "/feed",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
            ),
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border max-w-md mx-auto">
            <div className="flex justify-around items-stretch h-16">
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
                ${isActive ? "text-primary" : "text-muted hover:text-foreground"}`}
                        >
                            <div className={`transition-transform ${isActive ? "scale-110" : "scale-100"}`}>
                                {item.icon}
                            </div>
                            <span className="text-[10px] font-medium">
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
