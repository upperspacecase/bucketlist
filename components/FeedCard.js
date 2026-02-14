"use client";

const FeedCard = ({
    user = "Someone",
    // eslint-disable-next-line no-unused-vars
    action = "completed",
    date = "Recently",
    title = "See the Northern Lights",
    description = "Finally witnessed the aurora in Norway!",
    image,
    category = "Adventure"
}) => {
    return (
        <div className="card overflow-hidden mb-3">
            {/* Who & when — simple, human */}
            <div className="p-4 pb-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary overflow-hidden shrink-0">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} alt={user} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                        <span className="font-medium">{user}</span>
                        {" "}
                        <span className="text-muted">lived a dream</span>
                    </p>
                    <p className="text-xs text-muted">{date}</p>
                </div>
            </div>

            {/* Image — if available */}
            {image ? (
                <div className="w-full aspect-[16/10] bg-secondary overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
            ) : null}

            {/* The dream itself */}
            <div className="p-4 pt-3">
                <h3 className="text-base font-semibold text-foreground mb-1 leading-snug">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                )}
                {category && (
                    <span className="inline-block mt-2 text-xs text-primary font-medium bg-primary-light px-2.5 py-1 rounded-full">
                        {category}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FeedCard;
