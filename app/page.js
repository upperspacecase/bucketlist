"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import TabFilter from "@/components/TabFilter";
import ListItem from "@/components/ListItem";
import toast from "react-hot-toast";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experiences");

      if (!res.ok) {
        throw new Error(`Failed to load list: ${res.status}`);
      }

      const data = await res.json();
      if (data.experiences) {
        const normalized = data.experiences.map((exp) => ({
          ...exp,
          id: exp._id,
        }));
        setExperiences(normalized);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("fetchExperiences Error:", error);
      toast.error(error.message || "Failed to load list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleToggle = async (id, currentStatus) => {
    setExperiences(prev => prev.map(e =>
      e.id === id ? { ...e, completed: !currentStatus } : e
    ));

    try {
      const res = await fetch("/api/experiences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !currentStatus }),
      });

      if (res.status === 401) {
        toast.error("Sign in to save changes");
        setExperiences(prev => prev.map(e =>
          e.id === id ? { ...e, completed: currentStatus } : e
        ));
        return;
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update status");
      }
    } catch (error) {
      console.error("handleToggle Error:", error);
      toast.error(error.message || "Failed to update status");
      setExperiences(prev => prev.map(e =>
        e.id === id ? { ...e, completed: currentStatus } : e
      ));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    setExperiences(prev => prev.filter(e => e.id !== id));

    try {
      const res = await fetch(`/api/experiences?id=${id}`, {
        method: "DELETE"
      });

      if (res.status === 401) {
        toast.error("Sign in to delete items");
        fetchExperiences();
        return;
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete");
      }

      toast.success("Item deleted");
    } catch (error) {
      console.error("handleDelete Error:", error);
      toast.error(error.message || "Failed to delete item");
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
        body: JSON.stringify({
          title: newItemTitle,
          category: "Adventure"
        }),
      });

      if (res.status === 401) {
        toast.error("Sign in to add items");
        return;
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to add item");
      }

      const data = await res.json();
      if (data.experience) {
        setExperiences(prev => [{ ...data.experience, id: data.experience._id }, ...prev]);
        toast.success("Added to list!");
        setNewItemTitle("");
        setIsAdding(false);
      } else {
        throw new Error("No data returned");
      }
    } catch (error) {
      console.error("handleSubmitAdd Error:", error);
      toast.error(error.message || "Failed to add item");
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

  return (
    <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
      <Header />

      <main className="px-5 pt-6 max-w-md mx-auto">
        {/* Section header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg tracking-[0.15em] font-semibold text-white">
            Bucket List
          </h2>
          <span className="text-primary text-sm font-medium">
            {completedCount}/{totalCount}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <TabFilter activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Add new item */}
        {isAdding ? (
          <form onSubmit={handleSubmitAdd} className="mb-6 bg-card rounded-xl p-4">
            <input
              autoFocus
              type="text"
              placeholder="Enter item title..."
              className="w-full bg-transparent border-b border-white/20 text-white font-medium outline-none mb-4 pb-2 placeholder:text-muted-foreground"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 py-3 text-xs font-medium text-muted-foreground bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newItemTitle.trim()}
                className="flex-1 py-3 text-xs font-medium bg-primary text-background rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
              >
                Add Item
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-4 mb-6 border border-dashed border-white/20 rounded-xl font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add to Bucket List
          </button>
        )}

        {/* List items */}
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Loading...
            </div>
          ) : (
            filteredExperiences.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onToggle={() => handleToggle(item.id, item.completed)}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
          {!loading && filteredExperiences.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No items found
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
