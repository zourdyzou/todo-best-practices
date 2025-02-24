import { create } from "zustand";

interface UIState {
  searchQuery: string;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedTodoId: number | null;
}

interface UIActions {
  setSearchQuery: (query: string) => void;
  setCreateModalOpen: (open: boolean) => void;
  setEditModalOpen: (open: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  // Initial State
  searchQuery: "",
  isCreateModalOpen: false,
  isEditModalOpen: false,
  selectedTodoId: null,

  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
  setEditModalOpen: (open) => set({ isEditModalOpen: open }),
  setSelectedTodoId: (id) => set({ selectedTodoId: id }),
}));
