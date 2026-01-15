"use client";

import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <header className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background"></div>

                <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
                    {/* Logo */}
                    <h1 className="text-2xl tracking-[0.15em] font-semibold mb-16">
                        <span className="text-white">BUCKET</span>
                        <span className="text-primary">LIST</span>
                    </h1>

                    {/* Main headline */}
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                        Life is short.<br />
                        <span className="text-primary">Don't waste the day.</span>
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                        Track your bucket list experiences, share with friends, and discover what others are doing around the world.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/app"
                            className="px-8 py-4 bg-primary text-background font-semibold rounded-xl hover:brightness-110 transition-all"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/feed"
                            className="px-8 py-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all"
                        >
                            Explore Feed
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="max-w-md mx-auto px-6 py-16">
                <div className="flex flex-col gap-4">
                    <div className="bg-card rounded-xl p-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                <rect x="3" y="5" width="6" height="6" rx="1" />
                                <path d="m3 17 2 2 4-4" />
                                <path d="M13 6h8" />
                                <path d="M13 12h8" />
                                <path d="M13 18h8" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Track Your Goals</h3>
                        <p className="text-muted-foreground text-sm">Add experiences to your list and check them off as you go.</p>
                    </div>

                    <div className="bg-card rounded-xl p-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Share with Friends</h3>
                        <p className="text-muted-foreground text-sm">Create shared lists and accomplish goals together.</p>
                    </div>

                    <div className="bg-card rounded-xl p-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" x2="22" y1="12" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold mb-2">Discover Ideas</h3>
                        <p className="text-muted-foreground text-sm">See what others are adding to their bucket lists worldwide.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8">
                <div className="max-w-4xl mx-auto px-6 text-center text-muted-foreground text-sm">
                    <p>© 2026 BucketList. Make every moment count.</p>
                </div>
            </footer>
        </div>
    );
}
