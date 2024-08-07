import { create } from "zustand";

export const useStore = create((set) => ({
  openDeleteModal: true,
  setOpenDeleteModal: (bool) =>
    set((state) => ({ state, openDeleteModal: bool })),
}));
