import ButtonLoad from "@/components/custom/button-load";
import FormFieldComponent from "@/components/custom/form-field";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { formType } from "@/global/formType";

export default function CropCategoriesForm({
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
        <FormFieldComponent name="name" form={form} label="Name" />
        <FormFieldComponent
          name="hvc"
          form={form}
          label="HVC"
          type="select"
          selectItems={
            <>
              <SelectItem value="1">YES</SelectItem>
              <SelectItem value="2">NO</SelectItem>
            </>
          }
        />
        <ButtonLoad isPending={isPending} className="w-full mt-3" />
      </form>
    </Form>
  );
}
