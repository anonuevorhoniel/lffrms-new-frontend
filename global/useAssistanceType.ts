import { create } from "zustand";
import { openType } from "./openType";

export const useAssistanceType = create<openType>((set) => ({
  open: false,
  setOpen: (state) => set({ open: state }),
}));
