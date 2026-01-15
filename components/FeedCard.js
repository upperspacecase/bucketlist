"use client";

const FeedCard = ({
    user = "Alex",
    action = "completed",
    date = "Jan 2",
    title = "See the Northern Lights",
    description = "Finally witnessed the aurora in Norway!",
    image,
    category = "Adventure"
}) => {
    return (
        <div className="bg-card rounded-xl overflow-hidden mb-4">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} alt={user} className="w-full h-full" />
                    </div>
                    <div>
                        <h3 className="font-medium text-sm text-white">{user}</h3>
                        <p className="text-[11px] text-muted-foreground capitalize">{action} · {date}</p>
                    </div>
                </div>
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider">
                    Done
                </span>
            </div>

            {/* Hero Image */}
            <div className="w-full aspect-[16/10] bg-secondary relative overflow-hidden">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-4">
                <span className="text-[10px] text-primary uppercase tracking-widest">
                    {category}
                </span>
                <h2 className="text-lg font-semibold text-white mt-1 mb-2 leading-tight">
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Actions */}
            <div className="flex border-t border-white/10">
                <button className="flex-1 py-3 flex items-center justify-center gap-2 text-muted-foreground hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                    <span className="text-xs">Like</span>
                </button>
                <button className="flex-1 py-3 flex items-center justify-center gap-2 text-muted-foreground hover:text-white transition-colors border-l border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                    <span className="text-xs">Comment</span>
                </button>
                <button className="flex-1 py-3 flex items-center justify-center gap-2 text-muted-foreground hover:text-white transition-colors border-l border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                    <span className="text-xs">Share</span>
                </button>
            </div>
        </div>
    );
};

export default FeedCard;
