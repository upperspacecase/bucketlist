"use client";

import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero — question-based headline activates personal reflection */}
            <header className="relative">
                <div className="max-w-md mx-auto px-6 pt-16 pb-20">
                    <p className="text-sm font-medium text-primary mb-16">
                        bucket list
                    </p>

                    <h1 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-4">
                        What do you dream<br />of doing in this life?
                    </h1>

                    <p className="text-base text-muted-foreground max-w-sm mb-10 leading-relaxed">
                        A simple place to hold your dreams, check them off as you live them, and share the journey with people you love.
                    </p>

                    {/* Single primary CTA — reduces decision paralysis (Hick's Law) */}
                    <Link
                        href="/app"
                        className="inline-block px-8 py-4 bg-primary text-white font-medium rounded-xl hover:brightness-110 transition-all active:scale-[0.98]"
                    >
                        Start your list
                    </Link>
                </div>
            </header>

            {/* Value props — concrete, human, benefit-oriented */}
            <section className="max-w-md mx-auto px-6 pb-16">
                <div className="flex flex-col gap-3">
                    <div className="card p-5">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Write it down, make it real</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Your dreams deserve more than living in your head. Put them somewhere you can see them.</p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-5">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Dream together</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Create shared lists with friends, partners, or family. The best adventures are shared ones.</p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-5">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <circle cx="12" cy="12" r="10" />
                                    <polygon points="10 8 16 12 10 16 10 8" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Get inspired</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">See what others have lived. Sometimes the best ideas come from someone else&apos;s story.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-border py-8">
                <div className="max-w-md mx-auto px-6 text-center text-muted text-sm">
                    <p>Made for dreamers, by dreamers.</p>
                </div>
            </footer>
        </div>
    );
}
