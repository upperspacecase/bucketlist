"use client";

const TabFilter = ({ activeTab = "all", onTabChange }) => {
    const tabs = [
        { id: "all", label: "ALL" },
        { id: "todo", label: "TO DO" },
        { id: "done", label: "DONE" },
    ];

    return (
        <div className="flex gap-3 my-6 px-1">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange?.(tab.id)}
                        className={`
              px-4 py-2 text-xs font-bold border-2 border-black transition-all
              ${isActive ? "bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"}
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
