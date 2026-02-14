"use client";

import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import Header from "@/components/Header";
import TabFilter from "@/components/TabFilter";
import ListItem from "@/components/ListItem";
import toast from "react-hot-toast";

export default function MyListPage() {
  const { isLoaded, isSignedIn } = useUser();
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
      toast.error("Couldn't load your list. Try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) fetchExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  const handleToggle = async (id, currentStatus) => {
    setExperiences(prev => prev.map(e => e.id === id ? { ...e, completed: !currentStatus } : e));

    if (!currentStatus) {
      toast.success("You lived it!");
    }

    try {
      const res = await fetch("/api/experiences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch {
      toast.error("Couldn't save that change");
      setExperiences(prev => prev.map(e => e.id === id ? { ...e, completed: currentStatus } : e));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this from your list?")) return;
    setExperiences(prev => prev.filter(e => e.id !== id));
    try {
      const res = await fetch(`/api/experiences?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    } catch {
      toast.error("Couldn't remove that");
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
        toast.success("Dream added!");
        setNewItemTitle("");
        setIsAdding(false);
      }
    } catch {
      toast.error("Couldn't add that right now");
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

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
        <Header />
        <main className="px-5 pt-6 max-w-md mx-auto">
          <div className="text-center py-20 text-muted">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
        <Header />
        <main className="px-5 pt-6 max-w-md mx-auto">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Your dreams, your list</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
              Sign in to start writing down the things you want to experience in this life.
            </p>
            <SignInButton mode="modal">
              <button className="px-8 py-4 bg-primary text-white font-medium rounded-xl hover:brightness-110 transition-all active:scale-[0.98]">
                Sign in to start
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
      <main className="px-5 pt-4 max-w-md mx-auto">
        <div className="mb-1">
          <h2 className="text-xl font-semibold text-foreground">My dreams</h2>
          {totalCount > 0 && (
            <p className="text-sm text-muted mt-1">
              {completedCount === 0
                ? `${totalCount} dream${totalCount === 1 ? "" : "s"} waiting`
                : `${completedCount} of ${totalCount} lived`
              }
            </p>
          )}
        </div>

        {totalCount > 0 && (
          <div className="h-1.5 bg-secondary rounded-full mb-1 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        )}

        <TabFilter activeTab={activeTab} onTabChange={setActiveTab} />

        {isAdding ? (
          <form onSubmit={handleSubmitAdd} className="mb-5 card p-4">
            <input
              autoFocus
              type="text"
              placeholder="What do you dream of doing?"
              className="w-full bg-transparent border-b border-border text-foreground font-medium outline-none mb-4 pb-2 placeholder:text-muted text-sm"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setIsAdding(false); setNewItemTitle(""); }}
                className="flex-1 py-3 text-sm font-medium text-muted-foreground bg-secondary rounded-lg hover:bg-border transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newItemTitle.trim()}
                className="flex-1 py-3 text-sm font-medium bg-primary text-white rounded-lg hover:brightness-110 transition-all disabled:opacity-40"
              >
                Add dream
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-4 mb-5 border border-dashed border-border rounded-xl font-medium text-muted hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add a dream
          </button>
        )}

        <div className="flex flex-col gap-2.5">
          {loading ? (
            <div className="text-center py-10 text-muted">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            filteredExperiences.map((item) => (
              <ListItem key={item.id} item={item} onToggle={() => handleToggle(item.id, item.completed)} onDelete={() => handleDelete(item.id)} />
            ))
          )}
          {!loading && filteredExperiences.length === 0 && (
            <div className="text-center py-12 text-muted">
              <p className="text-base mb-1">
                {totalCount === 0
                  ? "What would make your life feel complete?"
                  : activeTab === "done"
                    ? "Your lived dreams will appear here"
                    : "All caught up!"
                }
              </p>
              {totalCount === 0 && (
                <p className="text-sm text-muted-foreground">
                  Start with just one thing.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
