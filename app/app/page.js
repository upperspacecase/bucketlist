"use client";

import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import Header from "@/components/Header";
import TabFilter from "@/components/TabFilter";
import ListItem from "@/components/ListItem";
import toast from "react-hot-toast";

export default function MyListPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [activeTab, setActiveTab] = useState("all");
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");

  const fetchExperiences = async () => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/experiences/my-list");
      if (!res.ok) throw new Error("Failed to load list");
      const data = await res.json();
      if (data.experiences) {
        setExperiences(data.experiences.map((exp) => ({ ...exp, id: exp._id })));
      }
    } catch (error) {
      console.error("fetchExperiences Error:", error);
      toast.error("Failed to load list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) fetchExperiences();
  }, [isLoaded, isSignedIn]);

  const handleToggle = async (id, currentStatus) => {
    setExperiences(prev => prev.map(e => e.id === id ? { ...e, completed: !currentStatus } : e));
    try {
      const res = await fetch("/api/experiences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch (error) {
      toast.error("Failed to update status");
      setExperiences(prev => prev.map(e => e.id === id ? { ...e, completed: currentStatus } : e));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    setExperiences(prev => prev.filter(e => e.id !== id));
    try {
      const res = await fetch(`/api/experiences?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Item deleted");
    } catch (error) {
      toast.error("Failed to delete item");
      fetchExperiences();
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    try {
      const res = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newItemTitle, category: "Adventure" }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      const data = await res.json();
      if (data.experience) {
        setExperiences(prev => [{ ...data.experience, id: data.experience._id }, ...prev]);
        toast.success("Added to list!");
        setNewItemTitle("");
        setIsAdding(false);
      }
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const filteredExperiences = experiences.filter((exp) => {
    if (activeTab === "all") return true;
    if (activeTab === "todo") return !exp.completed;
    if (activeTab === "done") return exp.completed;
    return true;
  });

  const completedCount = experiences.filter(e => e.completed).length;
  const totalCount = experiences.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
        <Header />
        <main className="px-5 pt-6 max-w-md mx-auto">
          <div className="text-center py-20 text-muted-foreground">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading...
          </div>
        </main>
      </div>
    );
  }

  // Sign in CTA for anonymous users
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
        <Header />
        <main className="px-5 pt-6 max-w-md mx-auto">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect x="3" y="5" width="6" height="6" rx="1" />
                <path d="m3 17 2 2 4-4" />
                <path d="M13 6h8" />
                <path d="M13 12h8" />
                <path d="M13 18h8" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Your Bucket List</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              Sign in to create your personal bucket list and start tracking your dreams.
            </p>
            <SignInButton mode="modal">
              <button className="px-8 py-4 bg-primary text-background font-semibold rounded-xl hover:brightness-110 transition-all">
                Sign In to Get Started
              </button>
            </SignInButton>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
      <Header />
      <main className="px-5 pt-6 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg tracking-[0.15em] font-semibold text-white">My Bucket List</h2>
          <span className="text-primary text-sm font-medium">{completedCount}/{totalCount}</span>
        </div>

        <div className="h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
        </div>

        <TabFilter activeTab={activeTab} onTabChange={setActiveTab} />

        {isAdding ? (
          <form onSubmit={handleSubmitAdd} className="mb-6 bg-card rounded-xl p-4">
            <input autoFocus type="text" placeholder="Enter item title..." className="w-full bg-transparent border-b border-white/20 text-white font-medium outline-none mb-4 pb-2 placeholder:text-muted-foreground" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} />
            <div className="flex gap-2">
              <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 text-xs font-medium text-muted-foreground bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Cancel</button>
              <button type="submit" disabled={!newItemTitle.trim()} className="flex-1 py-3 text-xs font-medium bg-primary text-background rounded-lg hover:brightness-110 transition-all disabled:opacity-50">Add Item</button>
            </div>
          </form>
        ) : (
          <button onClick={() => setIsAdding(true)} className="w-full py-4 mb-6 border border-dashed border-white/20 rounded-xl font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add to Bucket List
          </button>
        )}

        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Loading...
            </div>
          ) : (
            filteredExperiences.map((item) => (
              <ListItem key={item.id} item={item} onToggle={() => handleToggle(item.id, item.completed)} onDelete={() => handleDelete(item.id)} />
            ))
          )}
          {!loading && filteredExperiences.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              {totalCount === 0 ? "Add your first bucket list item!" : "No items found"}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
