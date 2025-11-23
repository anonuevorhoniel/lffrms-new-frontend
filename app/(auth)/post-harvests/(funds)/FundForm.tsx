import ButtonLoad from "@/components/custom/button-load";
import FormFieldComponent from "@/components/custom/form-field";
import { Form } from "@/components/ui/form";
import { formType } from "@/global/formType";

export default function FundForm({
  form,
  handleSubmit,
  isPending,
}: formType) {
  return (
    <Form {...form}>
      <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormFieldComponent name="name" form={form} label="Name" />
        <ButtonLoad isPending={isPending} className="w-full mt-3" />
      </form>
    </Form>
  );
}
