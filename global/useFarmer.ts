import { create } from "zustand";
import { openType } from "./openType";

export const useFarmer = create<openType>((set) => ({
  open: false,
  setOpen: (state) => set({ open: state }),
}));
