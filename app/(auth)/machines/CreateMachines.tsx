import ax from "@/app/axios";
import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { useMachines } from "@/global/useMachines";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MachineForm from "./MachineForm";

export default function CreateMachines() {
  const { open, setOpen } = useMachines();
  const form = useForm();
  const handleSubmit = (data: any) => {
    store.mutate(data);
  };
  const qclient = useQueryClient();
  const store = useMutation({
    mutationFn: async (data) => await ax.post("/machines/store", data),
    onSuccess: () => {
      toast.success("Machine Added");
      setOpen(false);
      form.reset();
      qclient.invalidateQueries({
        queryKey: ["machines"],
      });
    },
    onError: (error) => console.log(error),
  });
  return (
    <ResponsiveDialog open={open} setOpen={setOpen} title="Create Machine">
      <MachineForm
        form={form}
        handleSubmit={handleSubmit}
        isPending={store.isPending}
      />
    </ResponsiveDialog>
  );
}
