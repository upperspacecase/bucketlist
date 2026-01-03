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
    image,
    category,
    savedCount,
    difficulty,
    bestTime,
    budget,
    tips,
    index = 0,
}) {
    const { toggleSaved, isSaved } = useSaved();
    const [expanded, setExpanded] = useState(false);
    const liked = isSaved(id);

    return (
        <>
            <article
                className="group bg-card rounded-xl overflow-hidden shadow-sm cursor-pointer animate-fade-slide-up hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setExpanded(true)}
            >
                {/* Image section */}
                <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Like button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSaved(id);
                        }}
                        className="absolute top-3 right-3 p-2.5 bg-card/90 backdrop-blur-sm rounded-full transition-all hover:bg-card min-h-[44px] min-w-[44px] flex items-center justify-center shadow-sm"
                        aria-label={liked ? "Remove from favorites" : "Add to favorites"}
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
                            className={cn(
                                "transition-colors",
                                liked ? "text-foreground" : "text-foreground"
                            )}
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </button>

                    {/* Difficulty badge */}
                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-[10px] tracking-wider uppercase">
                        {difficultyLabels[difficulty]}
                    </div>
                </div>

                {/* Content section */}
                <div className="p-4">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        {category}
                    </p>
                    <h3 className="text-base font-normal leading-snug text-balance mb-1">
                        {title}
                    </h3>
                    <p className="text-sm italic text-muted-foreground">{location}</p>
                    <p className="text-[11px] text-muted-foreground mt-3">
                        {savedCount.toLocaleString()} have this on their list
                    </p>
                </div>
            </article>

            {expanded && (
                <div
                    className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-end justify-center"
                    onClick={() => setExpanded(false)}
                >
                    <div
                        className="bg-card w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl animate-fade-slide-up shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-card rounded-t-2xl p-4 flex items-center justify-between border-b border-border">
                            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                                Experience Details
                            </span>
                            <button
                                onClick={() => setExpanded(false)}
                                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-muted rounded-full transition-colors"
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
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Image */}
                        <div className="aspect-[16/10] relative">
                            <img
                                src={image || "/placeholder.svg"}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                                {category} · {difficultyLabels[difficulty]}
                            </p>

                            <h2 className="text-2xl font-normal leading-snug text-balance mb-1">
                                {title}
                            </h2>
                            <p className="text-base italic text-muted-foreground mb-6">
                                {location}
                            </p>

                            <div className="space-y-0 border-t border-border">
                                {bestTime && (
                                    <DetailRow icon="clock" label="Best Time" value={bestTime} />
                                )}
                                {budget && (
                                    <DetailRow icon="dollar" label="Budget" value={budget} />
                                )}
                                {tips && (
                                    <DetailRow icon="lightbulb" label="Pro Tip" value={tips} />
                                )}
                            </div>

                            <p className="text-sm text-muted-foreground mt-6 mb-6">
                                {savedCount.toLocaleString()} people have this on their list
                            </p>

                            <button
                                onClick={() => toggleSaved(id)}
                                className={cn(
                                    "w-full py-4 flex items-center justify-center gap-2 text-sm tracking-wide transition-all min-h-[44px] rounded-full",
                                    liked
                                        ? "bg-foreground text-background"
                                        : "bg-accent text-accent-foreground hover:brightness-95"
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
                                {liked ? "Saved to My List" : "+ Add to My List"}
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

    const iconPaths = {
        clock: <path d="M12 6v6l4 2" />,
        dollar: (
            <>
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </>
        ),
        lightbulb: (
            <>
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
            </>
        ),
    };

    return (
        <div className="border-b border-border">
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
                        {icon === "dollar" && iconPaths.dollar}
                        {icon === "lightbulb" && iconPaths.lightbulb}
                    </svg>
                    <span className="text-sm font-normal">{label}</span>
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
