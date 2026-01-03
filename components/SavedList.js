"use client";

import { useSaved } from "./SavedContext";
import { ExperienceCard } from "./ExperienceCard";
import { experiences } from "@/libs/experiences";

export function SavedList() {
    const { savedIds } = useSaved();

    const savedExperiences = experiences.filter((exp) =>
        savedIds.includes(exp.id)
    );

    return (
        <section className="px-6 py-8 md:px-8">
            <div className="max-w-md mx-auto text-center mb-10">
                <h2 className="text-3xl font-normal leading-tight text-balance mb-2">
                    Your <span className="italic text-muted-foreground">Saved</span>
                    <br />
                    Experiences
                </h2>
                <p className="text-sm text-muted-foreground">
                    {savedIds.length} on your list
                </p>
            </div>

            {savedExperiences.length === 0 ? (
                <div className="text-center py-16 max-w-xs mx-auto">
                    <div className="w-16 h-16 mx-auto mb-4 bg-card rounded-full flex items-center justify-center shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted-foreground"
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </div>
                    <p className="italic text-muted-foreground mb-2">
                        Your list is empty
                    </p>
                    <p className="text-[11px] tracking-wider text-muted-foreground">
                        Tap the heart on any experience to save it here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
                    {savedExperiences.map((experience, index) => (
                        <ExperienceCard key={experience.id} {...experience} index={index} />
                    ))}
                </div>
            )}
        </section>
    );
}
