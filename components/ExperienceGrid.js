"use client";

import { useState, useEffect } from "react";
import { ExperienceCard } from "./ExperienceCard";
import { ExperienceCardSkeleton } from "./ExperienceCardSkeleton";
import { experiences } from "@/libs/experiences";

export function ExperienceGrid({ activeCategory, activeRegion }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [activeCategory, activeRegion]);

    const filteredExperiences = experiences.filter((exp) => {
        const categoryMatch =
            activeCategory === "all" ||
            exp.category.toLowerCase() === activeCategory;
        const regionMatch = activeRegion === "all" || exp.region === activeRegion;
        return categoryMatch && regionMatch;
    });

    return (
        <section className="px-6 py-8 md:px-8">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6 text-center">
                {filteredExperiences.length} Experience
                {filteredExperiences.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <ExperienceCardSkeleton key={i} />
                    ))
                    : filteredExperiences.map((experience, index) => (
                        <ExperienceCard key={experience.id} {...experience} index={index} />
                    ))}
            </div>

            {!loading && filteredExperiences.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground italic">
                        No experiences found for these filters.
                    </p>
                </div>
            )}
        </section>
    );
}
