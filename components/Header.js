"use client";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm w-full max-w-md mx-auto pt-6 pb-4 px-5">
      <div className="flex justify-between items-center">
        {/* Logotype */}
        <h1 className="text-xl tracking-[0.15em] font-semibold">
          <span className="text-white">BUCKET</span>
          <span className="text-primary">LIST</span>
        </h1>

        {/* Search Icon */}
        <button className="p-2 text-muted-foreground hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
