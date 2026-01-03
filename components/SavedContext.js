"use client";

import { createContext, useContext, useState } from "react";

const SavedContext = createContext(undefined);

export function SavedProvider({ children }) {
    const [savedIds, setSavedIds] = useState([]);

    const toggleSaved = (id) => {
        setSavedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const isSaved = (id) => savedIds.includes(id);

    return (
        <SavedContext.Provider value={{ savedIds, toggleSaved, isSaved }}>
            {children}
        </SavedContext.Provider>
    );
}

export function useSaved() {
    const context = useContext(SavedContext);
    if (!context) throw new Error("useSaved must be used within SavedProvider");
    return context;
}
