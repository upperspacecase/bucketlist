"use client";

const TabFilter = ({ activeTab = "all", onTabChange }) => {
    // Human language: "All", "Dreaming" (aspirational), "Lived" (celebratory)
    const tabs = [
        { id: "all", label: "All" },
        { id: "todo", label: "Dreaming" },
        { id: "done", label: "Lived" },
    ];

    return (
        <div className="flex gap-2 my-5">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange?.(tab.id)}
                        className={`
              px-5 py-2.5 text-sm font-medium rounded-full transition-all
              ${isActive
                                ? "bg-primary text-white"
                                : "bg-secondary text-muted-foreground hover:bg-border hover:text-foreground"
                            }
            `}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

export default TabFilter;
