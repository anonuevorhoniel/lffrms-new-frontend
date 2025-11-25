"use client";

import ax from "@/app/axios";
import FormFieldComponent from "@/components/custom/form-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import CropTypeArrayForm from "./CropTypeArrayForm";
import CustomFormField from "@/components/custom/custom-form-field";
import CommandSelect from "@/components/custom/command-select";
import { SelectItem } from "@/components/ui/select";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function FarmInformationForm({
  form,
  remove,
  field,
  index,
  length,
}: {
  form: UseFormReturn;
  remove: any;
  field: FieldArrayWithId;
  index: number;
  length: number;
}) {
  const municipalityCode = form.watch(
    `farm_information.${index}.municipality_code`
  );

  const { data: municipalityData, isFetching: municipalityIsFetching } =
    useQuery({
      queryKey: ["municipalitiesFarmInfo"],
      queryFn: async () => await ax.get("/municipalities"),
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
    });

  const { data: barangayData, isFetching: barangayIsFetching } = useQuery({
    queryKey: ["barangaysFarmInfo", municipalityCode],
    queryFn: async () =>
      await ax.get("/barangays", {
        params: { municipality_code: municipalityCode },
      }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled: !!municipalityCode,
  });

  const { data: physicalAreasData, isFetching: physicalAreasIsFetching } =
    useQuery({
      queryKey: ["physicalAreasFarmInfo"],
      queryFn: async () => await ax.get("/physical_areas"),
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
    });

  const municipalities = municipalityData?.data?.map((item: any) => ({
    value: item.code,
    label: item.name,
  }));

  const barangays = barangayData?.data?.map((item: any) => ({
    value: item.code,
    label: item.name,
  }));

  const physicalAreas = physicalAreasData?.data;

  return (
    <div className="space-y-4">
      <div className="border space-y-4 shadow-md rounded-md" key={field.id}>
        <div className="flex justify-between p-2 border rounded-tl-md rounded-tr-md h-14">
          <Label className="font-bold">Farm Information # {index + 1}</Label>
          {length > 1 && (
            <Button type="button" onClick={() => remove(index)}>
              <X />
            </Button>
          )}
        </div>
        <div className="grid gap-5 px-4 py-5 pb-10 ">
          <div className="space-y-4">
            <CropTypeArrayForm form={form} index={index} />
          </div>
          <div className="grid sm:grid-cols-4 gap-5">
            <FormFieldComponent
              name={`farm_information.${index}.size`}
              label="Farm Area"
              form={form}
            />
            <FormFieldComponent
              name={`farm_information.${index}.farmer_type_id`}
              label="Farmer Type"
              form={form}
            />
            <FormFieldComponent
              name={`farm_information.${index}.physical_areas`}
              label="Physical Areas"
              form={form}
              type="select"
              selectItems={physicalAreas?.map((item: any) => (
                <SelectItem value={`${item.id}`} key={item.id}>{item.type}</SelectItem>
              ))}
            />
            <FormFieldComponent
              name={`farm_information.${index}.started_tenant_year`}
              label="Started Tenant Year"
              form={form}
            />
            <CustomFormField
              name={`farm_information.${index}.municipality_code`}
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
                  name={`farm_information.${index}.municipality_code`}
                  form={form}
                />
              }
            />
            <CustomFormField
              name={`farm_information.${index}.barangay_code`}
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
                  name={`farm_information.${index}.barangay_code`}
                  form={form}
                />
              }
            />
            <FormFieldComponent
              name={`farm_information.${index}.street`}
              label="Street"
              form={form}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// barangayData?.data?.map((barangay) => (
//                 <SelectItem value={`${barangay.code}`} key={barangay.id}>
//                   {barangay.name}
//                 </SelectItem>
//               ))
