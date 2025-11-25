"use client";

import ax from "@/app/axios";
import ButtonLoad from "@/components/custom/button-load";
import FormFieldComponent from "@/components/custom/form-field";
import { MultiSelect } from "@/components/custom/multi-select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { formType } from "@/global/formType";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { House, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FarmInformationForm from "./FarmInformationForm";
import { useFieldArray } from "react-hook-form";
import CustomFormField from "@/components/custom/custom-form-field";
import CommandSelect from "@/components/custom/command-select";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function FarmerForm({
  form,
  handleSubmit,
  isPending,
}: formType) {
  const [farmerImage, setFarmerImage] = useState<File[] | undefined>();
  const [farmerSignatory, setFarmerSignatory] = useState<File[] | undefined>();

  const handleFarmerImageDrop = (files: File[]) => {
    console.log(files);
    setFarmerImage(files);
  };
  const handleFarmerSignatoryDrop = (files: File[]) => {
    console.log(files);
    setFarmerSignatory(files);
  };

  const district_id = form.watch("district_id");
  const municipalityCode = form.watch("municipality_code");

  const { data: municipalityData, isFetching: municipalityIsFetching } = useQuery({
    queryKey: ["municipalities", district_id],
    queryFn: async () =>
      await ax.get("/municipalities", { params: { district_id: district_id } }),
    refetchOnWindowFocus: false,
    enabled: !!district_id,
  });

  const { data: barangayData, isFetching: barangayIsFetching } = useQuery({
    queryKey: ["barangays", municipalityCode],
    queryFn: async () =>
      await ax.get(`/barangays`, {
        params: { municipality_code: municipalityCode },
      }),
    refetchOnWindowFocus: false,
    enabled: !!municipalityCode,
  });

  const { remove, fields, append } = useFieldArray({
    name: "farm_information",
    control: form.control,
  });

  const municipalities = municipalityData?.data?.map((municipality: any) => ({
    label: municipality.name,
    value: municipality.code,
  }));
  const barangays = barangayData?.data.map((barangay: any) => ({
    label: barangay.name,
    value: barangay.code,
  }));

  return (
    <Form {...form}>
      <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <h1 className="font-bold text-lg">Farmer Information</h1>
          <div className="grid sm:grid-cols-4 gap-5">
            <div className="sm:col-span-2">
              <FormFieldComponent
                name="first_name"
                form={form}
                label="First Name"
              />
            </div>
            <div className="sm:col-span-2">
              <FormFieldComponent
                name="middle_name"
                form={form}
                label="Middle Name"
              />
            </div>
            <div className="sm:col-span-2">
              <FormFieldComponent
                name="last_name"
                form={form}
                label="Last Name"
              />
            </div>
            <FormFieldComponent
              name="name_extension"
              form={form}
              label="Name Extension"
            />
            <FormFieldComponent
              name="sex"
              type="select"
              form={form}
              label="Sex"
              selectItems={
                <>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </>
              }
            />
            <FormFieldComponent
              name="birth_date"
              type="date"
              form={form}
              label="Birth Date"
            />
            <div className="space-y-2">
              <Label>Senior</Label>
              <Input className="cursor-not-allowed" readOnly />
            </div>
            <div className="sm:col-span-2">
              <FormFieldComponent
                name="birth_place"
                form={form}
                label="Birth Place"
              />
            </div>
            <FormFieldComponent
              name="civil_status"
              form={form}
              label="Civil Status"
              type="select"
              selectItems={
                <>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed / Widower">
                    Widowed / Widower
                  </SelectItem>
                </>
              }
            />
            <FormFieldComponent
              name="blood_type"
              form={form}
              label="Blood Type"
              type="select"
              selectItems={
                //i-map konalang
                <>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </>
              }
            />
            <FormFieldComponent
              name="contact_number"
              form={form}
              label="Contact Number"
            />
            <FormFieldComponent
              name="rsbsa_no"
              form={form}
              label="RSBSA No. / Fish R No."
            />
            <FormFieldComponent
              name="district_id"
              form={form}
              label="District"
              type="select"
              selectItems={
                <>
                  <SelectItem value="1">District I</SelectItem>
                  <SelectItem value="2">District II</SelectItem>
                  <SelectItem value="3">District III</SelectItem>
                  <SelectItem value="4">District IV</SelectItem>
                </>
              }
            />
            <CustomFormField
              name={`municipality_code`}
              form={form}
              label={
                municipalityIsFetching ? (
                  <div className="flex gap-2 items-center">
                    City / Municipality <Spinner size={15} />
                  </div>
                ) : (
                  "City / Municipality"
                )
              }
              element={
                <CommandSelect
                  values={municipalities}
                  name={`municipality_code`}
                  form={form}
                />
              }
            />
            <CustomFormField
              name={`barangay_code`}
              form={form}
              label={
                barangayIsFetching ? (
                  <div className="flex gap-2 items-center">
                    Barangay <Spinner size={15} />
                  </div>
                ) : (
                  "Barangay"
                )
              }
              element={
                <CommandSelect
                  values={barangays}
                  name={`barangay_code`}
                  form={form}
                />
              }
            />
            <FormFieldComponent
              name="street"
              form={form}
              label="House No. / Street"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Farmer Image</Label>
              <Dropzone
                accept={{ "image/*": [] }}
                maxFiles={10}
                maxSize={1024 * 1024 * 10}
                // minSize={1024}
                onDrop={handleFarmerImageDrop}
                onError={(error) => toast.error(error.message)}
                src={farmerImage}
              >
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>
            </div>
            <div className="space-y-2">
              <Label>Farmer Signatory</Label>
              <Dropzone
                accept={{ "image/*": [] }}
                maxFiles={10}
                maxSize={1024 * 1024 * 10}
                // minSize={1024}
                onDrop={handleFarmerSignatoryDrop}
                onError={(error) => toast.error(error.message)}
                src={farmerSignatory}
              >
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>
            </div>
            <div className="sm:col-span-2">
              <FormFieldComponent
                type="textarea"
                name="other_information"
                label="Other Information"
                form={form}
              />
            </div>
          </div>
          <Separator className="my-5" />
          <h1 className="font-bold text-lg flex items-center gap-2">
            Farm Information
          </h1>
          {fields?.map((field, index) => (
            <FarmInformationForm
              key={field.id}
              form={form}
              field={field}
              index={index}
              remove={remove}
              length={fields.length}
            />
          ))}
          <Button
            type="button"
            size={"sm"}
            onClick={() =>
              append({
                crop_types: [
                  {
                    id: null,
                    sub_categories: [{}],
                  },
                ],
              })
            }
          >
            <Plus /> Add Farm Information
          </Button>
          <div className="flex justify-center sticky bottom-5">
            <ButtonLoad
              isPending={isPending}
              className="mt-3 sm:mr-10 w-full sm:w-40"
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
{
  /* <FormFieldComponent name="def" label="def" form={form} /> */
}
