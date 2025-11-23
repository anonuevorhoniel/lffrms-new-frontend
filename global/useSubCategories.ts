import { create } from "zustand";
import { openType } from "./openType";

type useSubCategoryType = {
    category: any;
    setCategory: (category: any) => any;
}
export const useSubCategories = create<openType & useSubCategoryType>((set) => ({
    open: false,
    setOpen: (state) => set({open: state}),

    category: null,
    setCategory: (category) => set({category: category}),
}))