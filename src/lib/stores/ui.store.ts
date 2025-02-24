import { create } from "zustand";

interface UIState {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedTodoId: number | null;
  setCreateModalOpen: (open: boolean) => void;
  setEditModalOpen: (open: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCreateModalOpen: false,
  isEditModalOpen: false,
  selectedTodoId: null,
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
  setEditModalOpen: (open) =>
    set({
      isEditModalOpen: open,
      // Reset selectedTodoId when closing the modal
      ...(open === false && { selectedTodoId: null }),
    }),
  setSelectedTodoId: (id) => set({ selectedTodoId: id }),
}));
