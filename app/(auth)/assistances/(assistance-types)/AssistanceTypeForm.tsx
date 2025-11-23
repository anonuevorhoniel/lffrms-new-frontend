import ButtonLoad from "@/components/custom/button-load";
import FormFieldComponent from "@/components/custom/form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formType } from "@/global/formType";

export default function AssistanceTypeForm({
  form,
  handleSubmit,
  isPending,
}: formType) {
  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2"
      >
        <FormFieldComponent form={form} label="Name" name="name" />
        <FormFieldComponent form={form} label="Value" name="value" type="number" />
        <FormFieldComponent form={form} label="Sponsor" name="sponsor" />
        <FormFieldComponent form={form} label="Other Information" type="textarea" name="other_information" />
        <div className="flex justify-center">
          <ButtonLoad isPending={isPending} className="mt-5 w-full" />
        </div>
      </form>
    </Form>
  );
}
