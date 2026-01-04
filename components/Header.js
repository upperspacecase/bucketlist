"use client";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background w-full max-w-md mx-auto pt-6 pb-2 px-5">
      <div className="flex justify-between items-center">
        {/* Logotype */}
        <h1 className="text-2xl tracking-tighter font-black">
          <span className="text-accent">BUCKET</span>
          <span className="text-secondary">LIST</span>
        </h1>

        {/* Decorative Dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-primary border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="w-3 h-3 rounded-full bg-secondary border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="w-3 h-3 rounded-full bg-accent border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
        </div>
      </div>

      {/* Yellow Underline Bar */}
      <div className="w-full h-1 bg-primary mt-4"></div>
    </header>
  );
};

export default Header;
