"use client";

import { useState } from "react";
import { experiences } from "@/libs/experiences";

export function HeroSection() {
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);

    const featured = experiences[featuredIndex];

    const handleSurprise = () => {
        setIsShuffling(true);
        const randomIndex = Math.floor(Math.random() * experiences.length);
        setTimeout(() => {
            setFeaturedIndex(randomIndex);
            setIsShuffling(false);
        }, 300);
    };

    return (
        <section className="px-6 py-8 md:px-8 md:py-12">
            <div className="max-w-md mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-normal leading-tight text-balance mb-3">
                    Turn <span className="italic text-muted-foreground">Someday</span>
                    <br />
                    into <span className="italic">Reservations</span>.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    A directory of remarkable experiences to add to your list.
                </p>
            </div>

            <div className="relative max-w-xs mx-auto mb-8">
                {/* Shadow cards behind - offset and slightly darker */}
                <div className="absolute inset-0 bg-card rounded-lg translate-x-2 translate-y-2 shadow-sm" />
                <div className="absolute inset-0 bg-card rounded-lg translate-x-1 translate-y-1 shadow-sm" />

                {/* Main card */}
                <div
                    className={`relative bg-card rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${isShuffling ? "opacity-0 scale-95" : "opacity-100 scale-100"
                        }`}
                >
                    <div className="aspect-[3/4] relative">
                        <img
                            src={featured.image || "/placeholder.svg"}
                            alt={featured.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-5">
                        <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                            {featured.location}
                        </p>
                        <h3 className="text-lg font-normal leading-snug mb-1">
                            {featured.title}
                        </h3>
                        <p className="text-sm italic text-muted-foreground">
                            {featured.savedCount.toLocaleString()} have this on their list
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleSurprise}
                    className="flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground rounded-full text-sm tracking-wide hover:brightness-95 transition-all min-h-[44px] shadow-sm"
                >
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
                    >
                        <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
                        <path d="m18 2 4 4-4 4" />
                        <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
                        <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
                        <path d="m18 14 4 4-4 4" />
                    </svg>
                    Surprise me
                </button>
            </div>
        </section>
    );
}
