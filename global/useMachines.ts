import { create } from "zustand";
import { openType } from "./openType";

export const useMachines = create<openType>((set) => ({
  open: false,
  setOpen: (state) => set({ open: state }),
}));
