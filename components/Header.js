"use client";

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm w-full max-w-md mx-auto pt-6 pb-4 px-5">
      <div className="flex justify-between items-center">
        {/* Logotype */}
        <h1 className="text-xl tracking-[0.15em] font-semibold">
          <span className="text-white">BUCKET</span>
          <span className="text-primary">LIST</span>
        </h1>

        {/* Auth Button */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-primary border border-primary/50 rounded-lg hover:bg-primary/10 transition-colors">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9"
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
