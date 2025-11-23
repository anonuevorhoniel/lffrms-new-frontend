"use client";

import ax from "@/app/axios";
import FormFieldComponent from "@/components/custom/form-field";
import { MultiSelect } from "@/components/custom/multi-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { House, Plus } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function FarmInformationForm({ form }: { form: UseFormReturn }) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const cropTypeId = form.watch("crop_type_id");

  const { data: cropTypeData, isFetching: cropTypeIsFetching } = useQuery({
    queryKey: ["cropTypesFarm"],
    queryFn: async () =>
      await ax.get("/crop_types", { params: { no_pagination: true } }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const {
    data: subCategoryData,
    isSuccess,
    isError,
    error,
    isFetching: subCategoriesIsFetching,
  } = useQuery({
    queryKey: ["subCategoriesFarm", cropTypeId],
    queryFn: async () => await ax.get(`/sub_categories/${cropTypeId}`),
    refetchOnWindowFocus: false,
    enabled: !!cropTypeId,
  });

  const options =
    subCategoryData?.data?.data?.map((item: any) => ({
      value: item.id,
      label: item.name,
    })) || [];

  if (isError) console.log(error);
  if (isSuccess) console.log(subCategoryData?.data?.data);

  const cropTypes = cropTypeData?.data?.data;

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-bold text-lg flex items-center gap-2">
          Farm Information
        </h1>
        <div className="border space-y-4 shadow-md rounded-md">
          <Label className="font-bold border bg-secondary p-2 rounded-tl-md rounded-tr-md">
            Farm Information # 1
          </Label>
          <div className="grid gap-5 px-4 py-5 pb-10 ">
            <div className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <FormFieldComponent
                  name="crop_type_id"
                  label={
                    cropTypeIsFetching ? (
                      <div className="flex gap-2 items-center">
                        <h1>Crop Types # 1</h1> <Spinner size={15} />
                      </div>
                    ) : (
                      "Crop Types # 1"
                    )
                  }
                  form={form}
                  type="select"
                  selectItems={cropTypes?.map((type: any) => (
                    <SelectItem value={`${type.id}`} key={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                />
                <div className="sm:col-span-2 space-y-2">
                  <Label>
                    Sub Categories{" "}
                    {subCategoriesIsFetching && <Spinner size={15} />}
                  </Label>
                  <div
                    className={`${
                      (subCategoriesIsFetching ||
                        !subCategoryData?.data?.data) &&
                      "pointer-events-none"
                    }`}
                  >
                    <MultiSelect
                      options={options}
                      onValueChange={setSelectedValues}
                      defaultValue={selectedValues}
                    />
                  </div>
                </div>
              </div>
              <Button type="button" size={"sm"}>
                <Plus /> Add Crop Types
              </Button>
            </div>
            <div className="grid sm:grid-cols-4 gap-5">
              <FormFieldComponent
                name="farm_area"
                label="Farm Area"
                form={form}
              />
              <FormFieldComponent
                name="farmer_type"
                label="Farmer Type"
                form={form}
              />
              <FormFieldComponent
                name="physical_areas"
                label="Physical Areas"
                form={form}
              />
              <FormFieldComponent
                name="started_tenant_year"
                label="Started Tenant Year"
                form={form}
              />
              <FormFieldComponent
                name="municipality_code"
                label="City / Municipality"
                form={form}
              />
              <FormFieldComponent
                name="barangay_code"
                label="Barangay"
                form={form}
              />
              <FormFieldComponent name="street" label="Street" form={form} />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-6 items-center">
          <Button>
            <Plus /> Add Farm Information
          </Button>
        </div>
      </div>
    </>
  );
}
