import { create } from "zustand";

interface FilterState {
  searchQuery: string;
  selectedUserId: number | null;
  setSearchQuery: (query: string) => void;
  setSelectedUserId: (userId: number | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: "",
  selectedUserId: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
}));
