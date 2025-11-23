import ax from "@/app/axios";
import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFunds } from "@/global/useFunds";
import FundForm from "./FundForm";

export default function CreateFund() {
  const { open, setOpen } = useFunds();
  const form = useForm();
  const handleSubmit = (data: any) => {
    store.mutate(data);
  };
  const qclient = useQueryClient();
  const store = useMutation({
    mutationFn: async (data) => await ax.post("/funds/store", data),
    onSuccess: () => {
      toast.success("Fund Added");
      setOpen(false);
      form.reset();
      qclient.invalidateQueries({
        queryKey: ["funds"],
      });
    },
    onError: (error) => console.log(error),
  });
  return (
    <ResponsiveDialog open={open} setOpen={setOpen} title="Create Fund">
      <FundForm
        form={form}
        handleSubmit={handleSubmit}
        isPending={store.isPending}
      />
    </ResponsiveDialog>
  );
}
