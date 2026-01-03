"use client";

import { cn } from "@/libs/utils";

const categories = [
    { id: "all", label: "All" },
    { id: "adventure", label: "Adventure" },
    { id: "culture", label: "Culture" },
    { id: "nature", label: "Nature" },
    { id: "food", label: "Food" },
    { id: "festivals", label: "Festivals" },
    { id: "wellness", label: "Wellness" },
];

const regions = [
    { id: "all", label: "Worldwide" },
    { id: "asia", label: "Asia" },
    { id: "europe", label: "Europe" },
    { id: "africa", label: "Africa" },
    { id: "americas", label: "Americas" },
    { id: "oceania", label: "Oceania" },
];

export function CategoryFilter({
    activeCategory,
    setActiveCategory,
    activeRegion,
    setActiveRegion,
}) {
    return (
        <section className="py-6 px-6 md:px-8">
            <div className="max-w-xl mx-auto">
                {/* Region filter */}
                <div className="mb-5">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                        Region
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
                        {regions.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => setActiveRegion(region.id)}
                                className={cn(
                                    "px-4 py-2 text-sm rounded-full border transition-all min-h-[44px] whitespace-nowrap flex-shrink-0",
                                    activeRegion === region.id
                                        ? "bg-foreground text-background border-foreground"
                                        : "bg-card text-foreground border-border hover:border-muted-foreground"
                                )}
                            >
                                {region.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category filter */}
                <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                        Category
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={cn(
                                    "px-4 py-2 text-sm rounded-full border transition-all min-h-[44px] whitespace-nowrap flex-shrink-0",
                                    activeCategory === category.id
                                        ? "bg-foreground text-background border-foreground"
                                        : "bg-card text-foreground border-border hover:border-muted-foreground"
                                )}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
