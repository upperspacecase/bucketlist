"use client";

import { useState } from "react";

const ListItem = ({
    item = {},
    onToggle,
    onDelete
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [justCompleted, setJustCompleted] = useState(false);
    const { title, addedBy, category, completed, image } = item;

    const handleToggle = (e) => {
        e.stopPropagation();
        if (!completed) {
            setJustCompleted(true);
            setTimeout(() => setJustCompleted(false), 600);
        }
        onToggle?.(!completed);
    };

    return (
        <div
            className={`card overflow-hidden transition-all ${justCompleted ? "animate-celebrate" : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex items-center gap-3.5 p-4 cursor-pointer">
                {/* Checkbox — large enough for easy tapping (Fitts's Law: 44px minimum) */}
                <button
                    onClick={handleToggle}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shrink-0
                        ${completed
                            ? "bg-primary border-primary"
                            : "border-border hover:border-primary"
                        }`}
                >
                    {completed && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    )}
                </button>

                <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-sm leading-tight ${completed ? "line-through text-muted" : "text-foreground"}`}>
                        {title}
                    </h3>
                    {category && (
                        <span className="text-xs text-muted mt-0.5 inline-block">
                            {category}
                        </span>
                    )}
                </div>

                {/* Subtle expand indicator */}
                {(onDelete || image) && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`text-muted transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                )}
            </div>

            {/* Expanded: minimal details, delete tucked away */}
            {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-border">
                    {image && (
                        <div className="w-full h-40 rounded-xl overflow-hidden mt-3 mb-3">
                            <img src={image} alt={title} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                        {addedBy && addedBy !== "You" && (
                            <span className="text-xs text-muted">Added by {addedBy}</span>
                        )}
                        {!addedBy || addedBy === "You" ? <span></span> : null}
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.();
                                }}
                                className="text-xs text-danger hover:text-danger/80 transition-colors font-medium"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListItem;
