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
            toast.error("Failed to load shared lists");
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
                toast.success("Shared list created!");
                setNewListName("");
                setIsCreating(false);
            }
        } catch {
            toast.error("Failed to create list");
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
                toast.success("Item added!");
                setNewItemTitle("");
                setAddingToIndex(null);
            }
        } catch {
            toast.error("Failed to add item");
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
        } catch {
            toast.error("Failed to update item");
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
                    <div className="text-center py-20 text-muted-foreground">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        Loading...
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
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">Shared Lists</h2>
                        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Sign in to create shared bucket lists with friends.</p>
                        <SignInButton mode="modal">
                            <button className="px-8 py-4 bg-primary text-background font-semibold rounded-xl hover:brightness-110 transition-all">Sign In to Get Started</button>
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
            <main className="px-5 pt-6 max-w-md mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg tracking-[0.15em] font-semibold text-white">Shared Lists</h2>
                </div>

                {isCreating ? (
                    <form onSubmit={handleCreateList} className="mb-6 bg-card rounded-xl p-4">
                        <input autoFocus type="text" placeholder="Enter list name..." className="w-full bg-transparent border-b border-white/20 text-white font-medium outline-none mb-4 pb-2 placeholder:text-muted-foreground" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
                        <div className="flex gap-2">
                            <button type="button" onClick={() => { setIsCreating(false); setNewListName(""); }} className="flex-1 py-3 text-xs font-medium text-muted-foreground bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Cancel</button>
                            <button type="submit" disabled={!newListName.trim()} className="flex-1 py-3 text-xs font-medium bg-primary text-background rounded-lg hover:brightness-110 transition-all disabled:opacity-50">Create List</button>
                        </div>
                    </form>
                ) : (
                    <button onClick={() => setIsCreating(true)} className="w-full py-4 mb-6 border border-dashed border-white/20 rounded-xl font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        Create Shared List
                    </button>
                )}

                {loading ? (
                    <div className="text-center py-10 text-muted-foreground">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        Loading...
                    </div>
                ) : sharedLists.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">Create your first shared list!</div>
                ) : (
                    sharedLists.map((list) => {
                        const isExpanded = expandedLists.has(list._id.toString());
                        const completedCount = getCompletedCount(list.items || []);
                        const totalCount = list.items?.length || 0;
                        const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

                        return (
                            <div key={list._id} className="bg-card rounded-xl overflow-hidden mb-4">
                                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => toggleListExpanded(list._id.toString())}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {list.participants?.slice(0, 3).map((userId, idx) => (
                                                <div key={idx} className="w-8 h-8 rounded-full overflow-hidden border-2 border-card">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`} alt="" className="w-full h-full" />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white text-sm">{list.name}</h3>
                                            <p className="text-[11px] text-muted-foreground">{completedCount}/{totalCount} done</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                                </div>

                                {isExpanded && (
                                    <>
                                        <div className="h-1 bg-white/10 mx-4"><div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }}></div></div>
                                        <div className="p-4 pt-3 border-t border-white/10 mt-3">
                                            {addingToIndex === list._id.toString() ? (
                                                <form onSubmit={(e) => handleAddItem(list._id.toString(), e)} className="mb-3">
                                                    <input autoFocus type="text" placeholder="Enter item title..." className="w-full bg-transparent border-b border-white/20 text-white text-sm outline-none mb-3 pb-2 placeholder:text-muted-foreground" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} />
                                                    <div className="flex gap-2">
                                                        <button type="button" onClick={() => { setAddingToIndex(null); setNewItemTitle(""); }} className="flex-1 py-2 text-xs font-medium text-muted-foreground bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Cancel</button>
                                                        <button type="submit" disabled={!newItemTitle.trim()} className="flex-1 py-2 text-xs font-medium bg-primary text-background rounded-lg hover:brightness-110 transition-all disabled:opacity-50">Add</button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <button onClick={() => setAddingToIndex(list._id.toString())} className="w-full py-2 mb-3 text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                                    Add Item
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
