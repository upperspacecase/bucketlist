"use client";

import { useState } from "react";

const ListItem = ({
    item = {},
    onToggle,
    onDelete
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { title, addedBy, category, completed, image } = item;

    return (
        <div
            className={`relative bg-card rounded-xl overflow-hidden transition-all ${completed ? "opacity-60" : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Main Content Row */}
            <div className="flex items-center gap-4 p-4 cursor-pointer">
                {/* Checkbox */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle?.(!completed);
                    }}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shrink-0
                        ${completed
                            ? "bg-primary border-primary"
                            : "border-muted-foreground hover:border-primary"
                        }`}
                >
                    {completed && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-background">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    )}
                </button>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-sm leading-tight truncate ${completed ? "line-through text-muted-foreground" : "text-white"}`}>
                        {title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-[11px] text-muted-foreground">
                            {addedBy ? `Added by ${addedBy}` : "Added by You"}
                        </span>
                        {category && (
                            <span className="text-[10px] text-primary uppercase tracking-wider">
                                {category}
                            </span>
                        )}
                    </div>
                </div>

                {/* Chevron */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-white/10">
                    {image && (
                        <div className="w-full h-40 rounded-lg overflow-hidden mt-4 mb-3">
                            <img src={image} alt={title} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-muted-foreground">Details</span>
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.();
                                }}
                                className="text-xs text-red-400 hover:text-red-300 transition-colors"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListItem;
