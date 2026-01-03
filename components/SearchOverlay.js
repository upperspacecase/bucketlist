"use client";

import { useState, useEffect, useRef } from "react";
import { experiences } from "@/libs/experiences";

export function SearchOverlay({ isOpen, onClose }) {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setQuery("");
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const results =
        query.length > 1
            ? experiences.filter(
                (exp) =>
                    exp.title.toLowerCase().includes(query.toLowerCase()) ||
                    exp.location.toLowerCase().includes(query.toLowerCase()) ||
                    exp.category.toLowerCase().includes(query.toLowerCase())
            )
            : [];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-background z-50 animate-fade-slide-up">
            {/* Search header */}
            <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3 max-w-2xl mx-auto">
                    <button
                        onClick={onClose}
                        className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-muted rounded-full transition-colors"
                        aria-label="Go back"
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
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                    </button>
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search destinations, experiences..."
                            className="w-full bg-muted/50 rounded-full px-5 py-3 text-base font-serif outline-none placeholder:text-muted-foreground focus:bg-muted transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-2xl mx-auto p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                {query.length > 1 && (
                    <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                        {results.length} result{results.length !== 1 ? "s" : ""}
                    </p>
                )}

                {query.length <= 1 && (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground italic">
                            Start typing to search...
                        </p>
                    </div>
                )}

                {query.length > 1 && results.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground italic">
                            No experiences found for &quot;{query}&quot;
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    {results.map((exp) => (
                        <button
                            key={exp.id}
                            onClick={onClose}
                            className="w-full flex items-center gap-4 p-3 bg-card rounded-xl hover:bg-muted transition-colors text-left shadow-sm"
                        >
                            <img
                                src={exp.image || "/placeholder.svg"}
                                alt={exp.title}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                                    {exp.category}
                                </p>
                                <h3 className="font-normal truncate">{exp.title}</h3>
                                <p className="text-sm italic text-muted-foreground truncate">
                                    {exp.location}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
