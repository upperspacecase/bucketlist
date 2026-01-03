"use client";

export function Header({ onSearchClick }) {
    return (
        <header className="px-6 pt-8 pb-4 md:px-8 md:pt-10">
            <div className="flex items-center justify-center max-w-5xl mx-auto">
                <h1 className="text-lg md:text-xl tracking-wide">
                    <span className="italic">bucket</span>
                    <span className="text-muted-foreground">list</span>
                    <span className="font-mono text-xs md:text-sm text-muted-foreground">
                        _inspo
                    </span>
                </h1>
            </div>
        </header>
    );
}
