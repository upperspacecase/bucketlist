"use client";

import { cn } from "@/libs/utils";

const navItems = [
    { id: "home", icon: "home", label: "Home" },
    { id: "search", icon: "search", label: "Search" },
    { id: "trending", icon: "trending", label: "Trending" },
    { id: "saved", icon: "heart", label: "Saved" },
    { id: "profile", icon: "user", label: "Profile" },
];

export function BottomNav({ activeTab, setActiveTab, onSearchClick }) {
    const handleClick = (id) => {
        if (id === "search") {
            onSearchClick();
        } else {
            setActiveTab(id);
        }
    };

    const icons = {
        home: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        search: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
        ),
        trending: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
        heart: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        ),
        user: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/50 z-40">
            <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const isActive =
                        activeTab === item.id || (item.id === "search" && false);
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 min-h-[44px] min-w-[44px] transition-colors rounded-lg",
                                isActive ? "text-foreground" : "text-muted-foreground"
                            )}
                            aria-label={item.label}
                        >
                            {icons[item.icon]}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
