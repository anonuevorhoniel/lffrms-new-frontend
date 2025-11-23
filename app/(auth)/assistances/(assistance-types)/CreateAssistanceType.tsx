import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { useAssistanceType } from "@/global/useAssistanceType";
import AssistanceTypeForm from "./AssistanceTypeForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ax from "@/app/axios";
import { toast } from "sonner";

export default function CreateAssistanceType() {
  const { open, setOpen } = useAssistanceType();
  const form = useForm();
  const handleSubmit = (data: any) => {
    store.mutate(data);
  };
  const qclient = useQueryClient();
  const store = useMutation({
    mutationFn: async (data) => await ax.post("/assistance_types/store", data),
    onSuccess: () => {
      toast.success("Assistance Type Added");
      qclient.invalidateQueries({
        queryKey: ["assistanceTypes"],
      });
      form.reset();
      setOpen(false);
    },
    onError: (error) => console.log(error),
  });
  return (
    <ResponsiveDialog
      open={open}
      setOpen={setOpen}
      title="Create Assistance Type"
    >
      <AssistanceTypeForm
        form={form}
        isPending={store.isPending}
        handleSubmit={handleSubmit}
      />
    </ResponsiveDialog>
  );
}
