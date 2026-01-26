"use client";

import { useState } from "react";
import { cn } from "@/libs/utils";
import { useSaved } from "./SavedContext";

const difficultyLabels = {
    easy: "Easy",
    moderate: "Moderate",
    "bucket-list": "Epic",
};

export function ExperienceCard({
    id,
    title,
    location,
    category,
    savedCount,
    difficulty,
    bestTime,
    budget,
    tips,
    website,
    index = 0,
}) {
    const { toggleSaved, isSaved } = useSaved();
    const [expanded, setExpanded] = useState(false);
    const liked = isSaved(id);

    return (
        <>
            <article
                className="group bg-card rounded-xl overflow-hidden cursor-pointer animate-fade-slide-up transition-transform duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setExpanded(true)}
            >
                {/* Header section */}
                <div className="p-4 pb-2 flex justify-between items-start">
                    <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-primary mb-1">
                            {category}
                        </p>
                        <h3 className="text-white text-base font-medium leading-snug line-clamp-2">
                            {title}
                        </h3>
                    </div>

                    {/* Like button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSaved(id);
                        }}
                        className="p-2.5 bg-black/40 backdrop-blur-sm rounded-full transition-all hover:bg-black/60 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={liked ? "Remove from favorites" : "Add to favorites"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill={liked ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={cn(
                                "transition-colors",
                                liked ? "text-primary" : "text-white"
                            )}
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </button>
                </div>

                {/* Content section */}
                <div className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground mb-3">{location}</p>
                    <div className="flex justify-between items-center">
                        <span className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-[10px] tracking-wider uppercase text-white">
                            {difficultyLabels[difficulty]}
                        </span>
                        <p className="text-[11px] text-muted-foreground whitespace-nowrap">
                            {savedCount.toLocaleString()} saved
                        </p>
                    </div>
                </div>
            </article>

            {/* Expanded Modal */}
            {expanded && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center"
                    onClick={() => setExpanded(false)}
                >
                    <div
                        className="bg-card w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl animate-fade-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-card rounded-t-2xl p-4 flex items-center justify-between border-b border-white/10">
                            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                                Experience Details
                            </span>
                            <button
                                onClick={() => setExpanded(false)}
                                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-[11px] tracking-[0.15em] uppercase text-primary mb-2">
                                {category} · {difficultyLabels[difficulty]}
                            </p>

                            <h2 className="text-2xl font-semibold leading-snug text-white mb-1">
                                {title}
                            </h2>
                            <p className="text-base text-muted-foreground mb-6">
                                {location}
                            </p>

                            <div className="space-y-0 border-t border-white/10">
                                {bestTime && (
                                    <DetailRow icon="clock" label="Best Time" value={bestTime} />
                                )}
                                {budget && (
                                    <DetailRow icon="dollar" label="Budget" value={budget} />
                                )}
                                {tips && (
                                    <DetailRow icon="lightbulb" label="Pro Tip" value={tips} />
                                )}
                                {website && (
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between py-4 text-left min-h-[44px] border-b border-white/10 group/link"
                                    >
                                        <div className="flex items-center gap-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-muted-foreground"
                                            >
                                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                            </svg>
                                            <span className="text-sm text-white">Visit Website</span>
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-muted-foreground group-hover/link:translate-x-1 transition-transform"
                                        >
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </a>
                                )}
                            </div>

                            <p className="text-sm text-muted-foreground mt-6 mb-6">
                                {savedCount.toLocaleString()} people have this on their list
                            </p>

                            <button
                                onClick={() => toggleSaved(id)}
                                className={cn(
                                    "w-full py-4 flex items-center justify-center gap-2 text-sm tracking-wide transition-all min-h-[44px] rounded-xl font-medium",
                                    liked
                                        ? "bg-white/10 text-white border border-white/20"
                                        : "bg-primary text-background hover:brightness-110"
                                )}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill={liked ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                                {liked ? "Saved to My List" : "Add to My List"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function DetailRow({ icon, label, value }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-4 text-left min-h-[44px]"
            >
                <div className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                    >
                        {icon === "clock" && (
                            <>
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </>
                        )}
                        {icon === "dollar" && (
                            <>
                                <line x1="12" x2="12" y1="2" y2="22" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </>
                        )}
                        {icon === "lightbulb" && (
                            <>
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                <path d="M9 18h6" />
                                <path d="M10 22h4" />
                            </>
                        )}
                    </svg>
                    <span className="text-sm text-white">{label}</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                        "text-muted-foreground transition-transform",
                        open && "rotate-180"
                    )}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            {open && (
                <div className="pb-4 pl-7 pr-4 text-sm text-muted-foreground">
                    {value}
                </div>
            )}
        </div>
    );
}
