import { create } from "zustand";

export const useStore = create((set) => ({
  openDeleteModal: false,
  setOpenDeleteModal: (bool) => set((state) => ({ state, openDeleteModal: bool})),
}));
