"use client";

const TabFilter = ({ activeTab = "all", onTabChange }) => {
    const tabs = [
        { id: "all", label: "All" },
        { id: "todo", label: "To Do" },
        { id: "done", label: "Done" },
    ];

    return (
        <div className="flex gap-2 my-6">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange?.(tab.id)}
                        className={`
              px-5 py-2.5 text-xs font-medium tracking-wider uppercase rounded-full transition-all
              ${isActive
                                ? "bg-primary text-background"
                                : "bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-white"
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
