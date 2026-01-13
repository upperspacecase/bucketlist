"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ListItem from "@/components/ListItem";
import toast from "react-hot-toast";

export default function SharedPage() {
    const [sharedLists, setSharedLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedLists, setExpandedLists] = useState(new Set());
    const [isCreating, setIsCreating] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [addingToIndex, setAddingToIndex] = useState(null);
    const [newItemTitle, setNewItemTitle] = useState("");

    useEffect(() => {
        fetchSharedLists();
    }, []);

    const fetchSharedLists = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/shared-lists");
            
            if (res.status === 401) {
                window.location.href = "/api/auth/signin";
                return;
            }
            
            if (!res.ok) {
                throw new Error("Failed to load shared lists");
            }
            
            const data = await res.json();
            if (data.sharedLists) {
                setSharedLists(data.sharedLists);
            }
        } catch (error) {
            console.error("fetchSharedLists Error:", error);
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

            if (res.status === 401) {
                window.location.href = "/api/auth/signin";
                return;
            }

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to create list");
            }

            const data = await res.json();
            if (data.sharedList) {
                setSharedLists(prev => [data.sharedList, ...prev]);
                toast.success("Shared list created!");
                setNewListName("");
                setIsCreating(false);
            }
        } catch (error) {
            console.error("handleCreateList Error:", error);
            toast.error(error.message || "Failed to create list");
        }
    };

    const handleAddItem = async (sharedListId, e) => {
        e.preventDefault();
        if (!newItemTitle.trim()) return;

        try {
            const res = await fetch("/api/shared-lists/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sharedListId,
                    title: newItemTitle.trim(),
                    category: "Adventure"
                }),
            });

            if (res.status === 401) {
                window.location.href = "/api/auth/signin";
                return;
            }

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to add item");
            }

            const data = await res.json();
            if (data.sharedList) {
                setSharedLists(prev => prev.map(list => 
                    list._id === sharedListId ? data.sharedList : list
                ));
                toast.success("Item added!");
                setNewItemTitle("");
                setAddingToIndex(null);
            }
        } catch (error) {
            console.error("handleAddItem Error:", error);
            toast.error(error.message || "Failed to add item");
        }
    };

    const handleToggleItem = async (sharedListId, itemIndex, currentStatus) => {
        try {
            const res = await fetch("/api/shared-lists/items", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sharedListId,
                    itemIndex,
                    completed: !currentStatus
                }),
            });

            if (res.status === 401) {
                window.location.href = "/api/auth/signin";
                return;
            }

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to update item");
            }

            const data = await res.json();
            if (data.sharedList) {
                setSharedLists(prev => prev.map(list => 
                    list._id === sharedListId ? data.sharedList : list
                ));
            }
        } catch (error) {
            console.error("handleToggleItem Error:", error);
            toast.error(error.message || "Failed to update item");
        }
    };

    const toggleListExpanded = (listId) => {
        setExpandedLists(prev => {
            const newSet = new Set(prev);
            if (newSet.has(listId)) {
                newSet.delete(listId);
            } else {
                newSet.add(listId);
            }
            return newSet;
        });
    };

    const getCompletedCount = (items) => {
        return items.filter(item => item.completed).length;
    };

    return (
        <div className="min-h-screen bg-background pb-32 font-sans text-foreground">
            <Header />

            <main className="px-5 pt-8 max-w-md mx-auto">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">
                    SHARED LISTS
                </h2>

                {/* Create Shared List */}
                {isCreating ? (
                    <form onSubmit={handleCreateList} className="mb-8 border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Enter list name..."
                            className="w-full border-b-2 border-black font-bold outline-none mb-4 uppercase placeholder:text-gray-300"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreating(false);
                                    setNewListName("");
                                }}
                                className="flex-1 py-3 text-xs font-bold border-2 border-black hover:bg-gray-50 uppercase"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!newListName.trim()}
                                className="flex-1 py-3 text-xs font-bold bg-primary border-2 border-black hover:brightness-110 uppercase disabled:opacity-50"
                            >
                                Create List
                            </button>
                        </div>
                    </form>
                ) : (
                    <button 
                        onClick={() => setIsCreating(true)}
                        className="w-full py-6 mb-8 border-2 border-dashed border-black font-bold uppercase tracking-wide bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        CREATE SHARED LIST
                    </button>
                )}

                {loading ? (
                    <div className="text-center py-10 font-bold animate-pulse">LOADING...</div>
                ) : sharedLists.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 font-bold">
                        NO SHARED LISTS YET
                    </div>
                ) : (
                    sharedLists.map((list) => {
                        const isExpanded = expandedLists.has(list._id.toString());
                        const completedCount = getCompletedCount(list.items || []);
                        const totalCount = list.items?.length || 0;

                        return (
                            <div key={list._id} className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                                <div 
                                    className="flex items-center justify-between p-4 border-b-2 border-black cursor-pointer hover:bg-gray-50"
                                    onClick={() => toggleListExpanded(list._id.toString())}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-4">
                                            {list.participants?.slice(0, 3).map((userId, idx) => (
                                                <div key={idx} className={`w-8 h-8 rounded-full bg-gray-${300 + idx * 100} border border-black z-${idx * 10}`}>
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`} alt={`User ${idx + 1}`} />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <h3 className="font-bold uppercase text-sm">{list.name}</h3>
                                            <p className="text-[10px] text-gray-500 font-mono">
                                                {completedCount}/{totalCount} done
                                            </p>
                                        </div>
                                    </div>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </div>

                                {isExpanded && (
                                    <>
                                        <div className="h-1.5 w-full bg-gray-100 border-b-2 border-black flex">
                                            <div 
                                                className="h-full bg-secondary transition-all duration-500"
                                                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                                            ></div>
                                        </div>

                                        <div className="bg-white">
                                            {addingToIndex === list._id.toString() ? (
                                                <form 
                                                    onSubmit={(e) => handleAddItem(list._id.toString(), e)}
                                                    className="p-3 border-b-2 border-black"
                                                >
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Enter item title..."
                                                        className="w-full border-b-2 border-black font-bold outline-none mb-2 text-xs uppercase placeholder:text-gray-300"
                                                        value={newItemTitle}
                                                        onChange={(e) => setNewItemTitle(e.target.value)}
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setAddingToIndex(null);
                                                                setNewItemTitle("");
                                                            }}
                                                            className="flex-1 py-2 text-xs font-bold border border-black hover:bg-gray-50 uppercase"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={!newItemTitle.trim()}
                                                            className="flex-1 py-2 text-xs font-bold bg-primary border border-black hover:brightness-110 uppercase disabled:opacity-50"
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <button 
                                                    onClick={() => setAddingToIndex(list._id.toString())}
                                                    className="w-full py-3 text-xs font-bold uppercase border-b-2 border-black hover:bg-gray-50 flex items-center justify-center gap-1"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                                    ADD ITEM
                                                </button>
                                            )}

                                            {list.items?.map((item, itemIndex) => (
                                                <ListItem
                                                    key={itemIndex}
                                                    item={{
                                                        ...item,
                                                        id: `${list._id}-${itemIndex}`,
                                                    }}
                                                    onToggle={() => handleToggleItem(list._id.toString(), itemIndex, item.completed)}
                                                />
                                            ))}
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
