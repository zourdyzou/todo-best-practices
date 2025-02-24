import { create } from "zustand";

interface UIState {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedTodoId: number | null;
}

interface UIActions {
  setCreateModalOpen: (open: boolean) => void;
  setEditModalOpen: (open: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  // Initial State
  isCreateModalOpen: false,
  isEditModalOpen: false,
  selectedTodoId: null,

  // Actions
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
  setEditModalOpen: (open) => set({ isEditModalOpen: open }),
  setSelectedTodoId: (id) => set({ selectedTodoId: id }),
}));
