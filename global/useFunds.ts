import { create } from "zustand";
import { openType } from "./openType";

export const useFunds = create<openType>((set) => ({
  open: false,
  setOpen: (state) => set({ open: state }),
}));
