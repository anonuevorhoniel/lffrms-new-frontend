import { create } from "zustand";
import { openType } from "./openType";

type fileUndefinedType = File[] | undefined;
export const useFarmer = create<
  openType & {
    viewOpen: boolean;
    setViewOpen: (state: boolean) => any;
    farmer: any;
    setFarmer: (farmer: any) => any;
    farmerImage: fileUndefinedType;
    setFarmerImage: (farmerImage: fileUndefinedType) => any;
    farmerSignatoryImage: fileUndefinedType;
    setFarmerSignatoryImage: (farmerSignatoryImage: fileUndefinedType) => any;
  }
>((set) => ({
  open: false,
  setOpen: (state) => set({ open: state }),

  viewOpen: false,
  setViewOpen: (state) => set({ viewOpen: state }),

  farmer: null,
  setFarmer: (farmer) => set({ farmer: farmer }),

  farmerImage: undefined,
  setFarmerImage: (farmerImage) => set({ farmerImage: farmerImage }),

  farmerSignatoryImage: undefined,
  setFarmerSignatoryImage: (farmerSignatoryImage) =>
    set({ farmerSignatoryImage: farmerSignatoryImage }),
}));
