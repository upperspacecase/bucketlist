"use client";

import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ListItem from "@/components/ListItem";
import toast from "react-hot-toast";

export default function SharedPage() {
    const { isLoaded, isSignedIn } = useUser();
    const [sharedLists, setSharedLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedLists, setExpandedLists] = useState(new Set());
    const [isCreating, setIsCreating] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [addingToIndex, setAddingToIndex] = useState(null);
    const [newItemTitle, setNewItemTitle] = useState("");

    useEffect(() => {
        if (isLoaded && isSignedIn) fetchSharedLists();
        else if (isLoaded) setLoading(false);
    }, [isLoaded, isSignedIn]);

    const fetchSharedLists = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/shared-lists");
            if (!res.ok) throw new Error("Failed to load shared lists");
            const data = await res.json();
            if (data.sharedLists) setSharedLists(data.sharedLists);
        } catch {
            toast.error("Couldn't load shared lists");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateList = async (e) => {
        e.preventDefault();
        if (!newListName.trim()) return;
        try {
            const res = await fetch("/api/shared-lists", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newListName.trim() }),
            });
            if (!res.ok) throw new Error("Failed to create list");
            const data = await res.json();
            if (data.sharedList) {
                setSharedLists(prev => [data.sharedList, ...prev]);
                toast.success("List created!");
                setNewListName("");
                setIsCreating(false);
            }
        } catch {
            toast.error("Couldn't create that list");
        }
    };

    const handleAddItem = async (sharedListId, e) => {
        e.preventDefault();
        if (!newItemTitle.trim()) return;
        try {
            const res = await fetch("/api/shared-lists/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sharedListId, title: newItemTitle.trim(), category: "Adventure" }),
            });
            if (!res.ok) throw new Error("Failed to add item");
            const data = await res.json();
            if (data.sharedList) {
                setSharedLists(prev => prev.map(list => list._id === sharedListId ? data.sharedList : list));
                toast.success("Dream added!");
                setNewItemTitle("");
                setAddingToIndex(null);
            }
        } catch {
            toast.error("Couldn't add that");
        }
    };

    const handleToggleItem = async (sharedListId, itemIndex, currentStatus) => {
        try {
            const res = await fetch("/api/shared-lists/items", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sharedListId, itemIndex, completed: !currentStatus }),
            });
            if (!res.ok) throw new Error("Failed to update item");
            const data = await res.json();
            if (data.sharedList) {
                setSharedLists(prev => prev.map(list => list._id === sharedListId ? data.sharedList : list));
            }
            if (!currentStatus) {
                toast.success("Lived it!");
            }
        } catch {
            toast.error("Couldn't update that");
        }
    };

    const toggleListExpanded = (listId) => {
        setExpandedLists(prev => {
            const newSet = new Set(prev);
            if (newSet.has(listId)) newSet.delete(listId);
            else newSet.add(listId);
            return newSet;
        });
    };

    const getCompletedCount = (items) => items.filter(item => item.completed).length;

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
                <Header />
                <main className="px-5 pt-6 max-w-md mx-auto">
                    <div className="text-center py-20 text-muted">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                </main>
                <BottomNav />
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
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">Dream together</h2>
                        <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                            Sign in to create shared bucket lists with friends and family.
                        </p>
                        <SignInButton mode="modal">
                            <button className="px-8 py-4 bg-primary text-white font-medium rounded-xl hover:brightness-110 transition-all active:scale-[0.98]">
                                Sign in to start
                            </button>
                        </SignInButton>
                    </div>
                </main>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
            <Header />
            <main className="px-5 pt-4 max-w-md mx-auto">
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-foreground">Together</h2>
                    <p className="text-sm text-muted mt-1">Shared lists with people you love</p>
                </div>

                {isCreating ? (
                    <form onSubmit={handleCreateList} className="mb-5 card p-4">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Name this list..."
                            className="w-full bg-transparent border-b border-border text-foreground font-medium outline-none mb-4 pb-2 placeholder:text-muted text-sm"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button type="button" onClick={() => { setIsCreating(false); setNewListName(""); }} className="flex-1 py-3 text-sm font-medium text-muted-foreground bg-secondary rounded-lg hover:bg-border transition-colors">Cancel</button>
                            <button type="submit" disabled={!newListName.trim()} className="flex-1 py-3 text-sm font-medium bg-primary text-white rounded-lg hover:brightness-110 transition-all disabled:opacity-40">Create</button>
                        </div>
                    </form>
                ) : (
                    <button onClick={() => setIsCreating(true)} className="w-full py-4 mb-5 border border-dashed border-border rounded-xl font-medium text-muted hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Start a shared list
                    </button>
                )}

                {loading ? (
                    <div className="text-center py-10 text-muted">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : sharedLists.length === 0 ? (
                    <div className="text-center py-12 text-muted">
                        <p className="text-base mb-1">Adventures are better shared</p>
                        <p className="text-sm text-muted-foreground">Create a list with someone you care about.</p>
                    </div>
                ) : (
                    sharedLists.map((list) => {
                        const isExpanded = expandedLists.has(list._id.toString());
                        const completedCount = getCompletedCount(list.items || []);
                        const totalCount = list.items?.length || 0;
                        const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

                        return (
                            <div key={list._id} className="card overflow-hidden mb-3">
                                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/50 transition-colors" onClick={() => toggleListExpanded(list._id.toString())}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {list.participants?.slice(0, 3).map((userId, idx) => (
                                                <div key={idx} className="w-8 h-8 rounded-full overflow-hidden border-2 border-card">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`} alt="" className="w-full h-full" />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-foreground text-sm">{list.name}</h3>
                                            <p className="text-xs text-muted">
                                                {totalCount === 0
                                                    ? "No dreams yet"
                                                    : `${completedCount} of ${totalCount} lived`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                                </div>

                                {isExpanded && (
                                    <>
                                        {totalCount > 0 && (
                                            <div className="h-1 bg-secondary mx-4">
                                                <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                                            </div>
                                        )}
                                        <div className="p-4 pt-3 border-t border-border mt-2">
                                            {addingToIndex === list._id.toString() ? (
                                                <form onSubmit={(e) => handleAddItem(list._id.toString(), e)} className="mb-3">
                                                    <input autoFocus type="text" placeholder="What do you dream of doing?" className="w-full bg-transparent border-b border-border text-foreground text-sm outline-none mb-3 pb-2 placeholder:text-muted" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} />
                                                    <div className="flex gap-2">
                                                        <button type="button" onClick={() => { setAddingToIndex(null); setNewItemTitle(""); }} className="flex-1 py-2 text-xs font-medium text-muted-foreground bg-secondary rounded-lg hover:bg-border transition-colors">Cancel</button>
                                                        <button type="submit" disabled={!newItemTitle.trim()} className="flex-1 py-2 text-xs font-medium bg-primary text-white rounded-lg hover:brightness-110 transition-all disabled:opacity-40">Add</button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <button onClick={() => setAddingToIndex(list._id.toString())} className="w-full py-2 mb-3 text-xs font-medium text-muted hover:text-primary transition-colors flex items-center justify-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                                    Add a dream
                                                </button>
                                            )}
                                            <div className="space-y-2">
                                                {list.items?.map((item, itemIndex) => (
                                                    <ListItem key={itemIndex} item={{ ...item, id: `${list._id}-${itemIndex}` }} onToggle={() => handleToggleItem(list._id.toString(), itemIndex, item.completed)} />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })
                )}
            </main>
            <BottomNav />
        </div>
    );
}
