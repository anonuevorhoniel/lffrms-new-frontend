import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import CroptypesForm from "./(form)/CropTypesForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ax from "@/app/axios";
import { toast } from "sonner";
import { useCropTypes } from "@/global/useCropTypes";

export default function CreateCropTypes() {
  const { open, setOpen } = useCropTypes();
  const form = useForm();
  const handleSubmit = (data: any) => {
    store.mutate(data);
  };  
  const qclient = useQueryClient();
  const store = useMutation({
    mutationFn: async (data) => await ax.post("/crop_types/store", data),
    onSuccess: () => {
      toast.success("Crop Category Added");
      setOpen(false);
      form.reset();
      qclient.invalidateQueries({
        queryKey: ['cropTypes'],
      })
    },
    onError: (error) => console.log(error),
  });
  return (
    <ResponsiveDialog open={open} setOpen={setOpen} title="Create Crop types">
      <CroptypesForm
        form={form}
        handleSubmit={handleSubmit}
        isPending={store.isPending}
      />
    </ResponsiveDialog>
  );
}
