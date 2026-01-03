"use client";

import { useState } from "react";
import { Header } from "@/components/HeaderBucket";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { BottomNav } from "@/components/BottomNav";
import { SearchOverlay } from "@/components/SearchOverlay";
import { SavedList } from "@/components/SavedList";
import { TrendingSection } from "@/components/TrendingSection";
import { SavedProvider } from "@/components/SavedContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeRegion, setActiveRegion] = useState("all");

  return (
    <SavedProvider>
      <main className="min-h-screen bg-background pb-24">
        <Header onSearchClick={() => setSearchOpen(true)} />

        {activeTab === "home" && (
          <>
            <HeroSection />
            <CategoryFilter
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeRegion={activeRegion}
              setActiveRegion={setActiveRegion}
            />
            <ExperienceGrid
              activeCategory={activeCategory}
              activeRegion={activeRegion}
            />
          </>
        )}

        {activeTab === "trending" && <TrendingSection />}
        {activeTab === "saved" && <SavedList />}

        <SearchOverlay
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSearchClick={() => setSearchOpen(true)}
        />
      </main>
    </SavedProvider>
  );
}
