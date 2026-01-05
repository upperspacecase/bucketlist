"use client";

import { useState } from "react";

const ListItem = ({
    item = {},
    onToggle,
    onDelete
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { title, addedBy, category, completed, image } = item;

    // All tags are pink (accent color)
    const categoryColor = "bg-accent border-black";

    return (
        <div className={`relative bg-white border-2 border-black w-full transition-all ${completed ? "opacity-75" : ""}`}>

            {/* Main Content Row */}
            <div className="flex items-stretch min-h-[80px]">

                {/* Checkbox Section */}
                <div className="w-[60px] border-r-2 border-black flex items-center justify-center shrink-0">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle?.(!completed);
                        }}
                        className={`w-8 h-8 border-2 border-black flex items-center justify-center transition-colors
              ${completed ? "bg-secondary" : "bg-white hover:bg-gray-100"}
            `}
                    >
                        {completed && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Text Content */}
                <div className="flex-1 p-3 flex flex-col justify-center gap-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    <div className="flex justify-between items-start gap-2">
                        <h3 className={`font-bold text-sm uppercase leading-tight ${completed ? "line-through text-gray-500" : "text-black"}`}>
                            {title}
                        </h3>
                    </div>

                    <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-gray-500 font-mono uppercase">
                            {addedBy ? `Added by ${addedBy}` : "Added by You"}
                        </span>

                        {category && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 border border-black uppercase ${categoryColor} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}>
                                {category}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Expanded Content (Optional Image) */}
            {isExpanded && image && (
                <div className="border-t-2 border-black p-0">
                    {/* If we had an image URL, we'd use next/image here. Using a placeholder div for now or <img> */}
                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 flex justify-between items-center bg-gray-50">
                        <span className="text-xs font-bold">DETAILS</span>
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.();
                                }}
                                className="text-xs font-bold underline decoration-2 decoration-black hover:bg-black hover:text-white px-1"
                            >
                                DELETE
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListItem;
