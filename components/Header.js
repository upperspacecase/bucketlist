"use client";

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm w-full max-w-md mx-auto pt-5 pb-3 px-5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-primary">
          bucket list
        </p>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-primary bg-primary-light rounded-lg hover:bg-primary hover:text-white transition-colors">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
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
