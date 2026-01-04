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

  // New state for inline adding
  const [isAdding, setIsAdding] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");

  const fetchExperiences = async () => {
    try {
      // Don't set loading true on refetch to avoid flicker
      const res = await fetch("/api/experiences");
      const data = await res.json();
      if (data.experiences) {
        // Map MongoDB _id to id
        const normalized = data.experiences.map((exp) => ({
          ...exp,
          id: exp._id,
        }));
        setExperiences(normalized);
      }
    } catch (error) {
      console.error("fetchExperiences Error:", error);
      toast.error("Failed to load list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleToggle = async (id, currentStatus) => {
    console.log("Toggling item:", id, "Current status:", currentStatus);
    // Optimistic Update
    setExperiences(prev => prev.map(e =>
      e.id === id ? { ...e, completed: !currentStatus } : e
    ));

    try {
      const res = await fetch("/api/experiences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
    } catch (error) {
      console.error("handleToggle Error:", error);
      toast.error("Failed to update status");
      // Revert optimism
      setExperiences(prev => prev.map(e =>
        e.id === id ? { ...e, completed: currentStatus } : e
      ));
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting item:", id);
    if (!confirm("Are you sure you want to delete this?")) return;

    // Optimistic Update
    setExperiences(prev => prev.filter(e => e.id !== id));

    try {
      const res = await fetch(`/api/experiences?id=${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Item deleted");
    } catch (error) {
      console.error("handleDelete Error:", error);
      toast.error("Failed to delete item");
      fetchExperiences(); // Revert
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    console.log("Adding item:", newItemTitle);

    // Optimistic add (optional, but let's wait for server response for ID)
    try {
      const res = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newItemTitle,
          category: "Adventure"
        }),
      });
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

  return (
    <div className="min-h-screen bg-background pb-32 font-sans text-foreground">
      <Header />

      <main className="px-5 pt-8 max-w-md mx-auto">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">
          My Bucket List
        </h2>

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

        <TabFilter activeTab={activeTab} onTabChange={setActiveTab} />

        {isAdding ? (
          <form onSubmit={handleSubmitAdd} className="mb-8 border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <input
              autoFocus
              type="text"
              placeholder="Enter item title..."
              className="w-full border-b-2 border-black font-bold outline-none mb-4 uppercase placeholder:text-gray-300"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 py-3 text-xs font-bold border-2 border-black hover:bg-gray-50 uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newItemTitle.trim()}
                className="flex-1 py-3 text-xs font-bold bg-primary border-2 border-black hover:brightness-110 uppercase disabled:opacity-50"
              >
                Save Item
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-4 mb-8 border-2 border-dashed border-black font-bold uppercase tracking-wide hover:bg-white/50 transition-colors flex items-center justify-center gap-2 active:scale-95 duration-100 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add to Bucket List
          </button>
        )}

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-10 font-bold animate-pulse">LOADING...</div>
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
            <div className="text-center py-10 text-gray-400 font-bold">
              NO ITEMS FOUND
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
