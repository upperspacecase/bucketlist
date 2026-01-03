export function ExperienceCardSkeleton() {
    return (
        <article className="bg-card rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-[4/3] skeleton" />
            <div className="p-4 space-y-3">
                <div className="h-3 w-16 skeleton rounded" />
                <div className="h-5 w-3/4 skeleton rounded" />
                <div className="h-4 w-1/2 skeleton rounded" />
                <div className="h-3 w-28 skeleton rounded" />
            </div>
        </article>
    );
}
