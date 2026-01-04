"use client";

const FeedCard = ({
    user = "Alex",
    action = "COMPLETED",
    date = "JAN 2",
    title = "SEE THE NORTHERN LIGHTS",
    description = "Finally witnessed the aurora in Norway!",
    image,
    category = "ADVENTURE"
}) => {
    return (
        <div className="bg-white border-2 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b-2 border-black">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-black overflow-hidden">
                        {/* Avatar placeholder */}
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} alt={user} className="w-full h-full" />
                    </div>
                    <div>
                        <h3 className="font-black text-sm uppercase">{user}</h3>
                        <p className="text-[10px] text-gray-500 font-mono tracking-wider">{action} {date}</p>
                    </div>
                </div>
                <div className="bg-secondary border border-black px-2 py-0.5 text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    DONE
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full aspect-video bg-gray-100 border-b-2 border-black relative overflow-hidden">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase">No Image</div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <span className="bg-secondary border border-black text-[10px] font-bold px-2 py-0.5 uppercase mb-2 inline-block">
                    {category}
                </span>
                <h2 className="text-xl font-black uppercase mb-2 leading-tight">
                    {title}
                </h2>
                <p className="text-sm font-serif text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 border-t-2 border-black divide-x-2 divide-black">
                <button className="py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                    <span className="text-xs font-bold uppercase">LIKE</span>
                </button>
                <button className="py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                    <span className="text-xs font-bold uppercase">COMMENT</span>
                </button>
                <button className="py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                    <span className="text-xs font-bold uppercase">SHARE</span>
                </button>
            </div>
        </div>
    );
};

export default FeedCard;
