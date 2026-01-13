"use client";

import { useState, useEffect } from "react";
import { ExperienceCard } from "./ExperienceCard";
import { ExperienceCardSkeleton } from "./ExperienceCardSkeleton";

export function ExperienceGrid({ activeCategory, activeRegion }) {
    const [loading, setLoading] = useState(true);
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/experiences");
                
                if (res.status === 401) {
                    // User is not authenticated, but don't redirect from this component
                    // Let the parent page handle authentication
                    setExperiences([]);
                    return;
                }
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch experiences: ${res.status}`);
                }
                
                const data = await res.json();
                if (data.experiences) {
                    // Map MongoDB _id to id for components
                    const normalized = data.experiences.map((exp) => ({
                        ...exp,
                        id: exp._id,
                    }));
                    setExperiences(normalized);
                }
            } catch (error) {
                console.error("Failed to fetch experiences:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

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
                        <ExperienceCard
                            key={experience.id}
                            {...experience}
                            index={index}
                        />
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
