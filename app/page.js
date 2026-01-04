"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import TabFilter from "@/components/TabFilter";
import ListItem from "@/components/ListItem";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all"); // For filter: all, todo, done
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch experiences
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/experiences");
        const data = await res.json();
        if (data.experiences) {
          // Map MongoDB _id to id
          const normalized = data.experiences.map((exp) => ({
            ...exp,
            id: exp._id,
            // Add mocked fields if missing
            addedBy: "Alex",
            completed: Math.random() > 0.7 // Randomly mark some as done for demo
          }));
          setExperiences(normalized);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const filteredExperiences = experiences.filter((exp) => {
    if (activeTab === "all") return true;
    if (activeTab === "todo") return !exp.completed;
    if (activeTab === "done") return exp.completed;
    return true;
  });

  const completedCount = experiences.filter(e => e.completed).length;
  const totalCount = experiences.length;

  return (
    <div className="min-h-screen bg-background pb-32 font-sans text-foreground">
      <Header />

      <main className="px-5 pt-8 max-w-md mx-auto">
        {/* Page Title */}
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">
          My Bucket List
        </h2>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-4 border-2 border-black bg-white relative">
            <div
              className="absolute top-0 left-0 bottom-0 bg-secondary transition-all duration-500"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            ></div>
          </div>
          <span className="text-lg font-bold font-mono">
            {completedCount}/{totalCount}
          </span>
        </div>

        {/* Filters */}
        <TabFilter activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Add Button */}
        <button className="w-full py-4 mb-8 border-2 border-dashed border-black font-bold uppercase tracking-wide hover:bg-white/50 transition-colors flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add to Bucket List
        </button>

        {/* List */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-10 font-bold animate-pulse">LOADING...</div>
          ) : (
            filteredExperiences.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onToggle={() => {
                  // Optimistic update
                  setExperiences(prev => prev.map(e =>
                    e.id === item.id ? { ...e, completed: !e.completed } : e
                  ));
                }}
              />
            ))
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
