"use client";

import { experiences } from "@/libs/experiences";
import { ExperienceCard } from "./ExperienceCard";

export function TrendingSection() {
    const trending = [...experiences]
        .sort((a, b) => b.savedCount - a.savedCount)
        .slice(0, 6);

    return (
        <section className="px-6 py-8 md:px-8">
            <div className="max-w-md mx-auto text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                        Trending
                    </span>
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
                        className="text-accent"
                    >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                    </svg>
                </div>
                <h2 className="text-3xl font-normal leading-tight text-balance mb-2">
                    Most <span className="italic text-muted-foreground">Popular</span>
                    <br />
                    Right Now
                </h2>
                <p className="text-sm text-muted-foreground">
                    Experiences people are adding to their lists this week.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
                {trending.map((experience, index) => (
                    <div key={experience.id} className="relative">
                        <div className="absolute -top-2 -left-2 z-10 w-7 h-7 bg-foreground text-background rounded-full flex items-center justify-center text-xs shadow-sm">
                            {index + 1}
                        </div>
                        <ExperienceCard {...experience} index={index} />
                    </div>
                ))}
            </div>
        </section>
    );
}
