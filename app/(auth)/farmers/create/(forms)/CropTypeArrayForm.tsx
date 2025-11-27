"use client";

import ax from "@/app/axios";
import FormFieldComponent from "@/components/custom/form-field";
import { MultiSelect } from "@/components/custom/multi-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();
export default function CropTypeArrayForm({
  index,
  form,
}: {
  index: number;
  form: UseFormReturn;
}) {
  const { append, remove, fields } = useFieldArray({
    name: `farm_informations.${index}.crop_types`,
    control: form.control,
  });

  return (
    <>
      {fields?.map((field, subIndex) => (
        <div className="flex items-end gap-2" key={field.id}>
          <div className="w-full">
            <CropTypeItem
              field={field}
              index={index}
              subIndex={subIndex}
              form={form}
            />
          </div>
          {fields.length > 1 && (
            <Button
              className="mb-0.5"
              onClick={() => remove(subIndex)}
              type="button"
            >
              <X />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" size={"sm"} onClick={() => append({})}>
        <Plus /> Add Crop Types
      </Button>
    </>
  );
}

function CropTypeItem({
  field,
  index,
  subIndex,
  form,
}: {
  field: any;
  index: number;
  subIndex: number;
  form: UseFormReturn;
}) {
  const [subCategorySelected, setSubCategorySelected] = useState<string[]>([]);
  const { setValue, watch } = form;
  const cropTypeId = watch(
    `farm_informations.${index}.crop_types.${subIndex}.crop_type_id`
  );
  const { data: cropTypeData, isFetching: cropTypeIsFetching } = useQuery({
    queryKey: ["cropTypesFarm"],
    queryFn: async () =>
      await ax.get("/crop_types", { params: { no_pagination: true } }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const { data: subCategoryData, isFetching: subCategoriesIsFetching } =
    useQuery({
      queryKey: ["subCategoriesFarm", cropTypeId],
      queryFn: async () => await ax.get(`/sub_categories/${cropTypeId}`),
      refetchOnWindowFocus: false,
      enabled: !!cropTypeId,
    });

  const options =
    subCategoryData?.data?.data?.map((item: any) => ({
      value: String(item.id),
      label: item.name,
    })) || [];

  const cropTypes = cropTypeData?.data?.data;
  const subCategories = watch(
    `farm_informations.${index}.crop_types.${subIndex}.subCategories`
  );

  return (
    <div className="grid sm:grid-cols-3 gap-3">
      <FormFieldComponent
        name={`farm_informations.${index}.crop_types.${subIndex}.crop_type_id`}
        label={
          cropTypeIsFetching ? (
            <div className="flex gap-2 items-center">
              <h1>Crop Types # 1</h1> <Spinner size={15} />
            </div>
          ) : (
            `Crop Types # ${subIndex + 1}`
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
      <div className="flex gap-2 sm:col-span-2 items-end">
        <div className=" w-full space-y-2">
          <Label>
            Sub Categories {subCategoriesIsFetching && <Spinner size={15} />}
          </Label>
          <div
            className={`${
              (subCategoriesIsFetching || !subCategoryData?.data?.data) &&
              "pointer-events-none"
            }`}
          >
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={
                subCategories?.map((item) => ({
                  label: item.name,
                  value: String(item.id),
                })) ?? []
              }
              name={`farm_informations.${index}.crop_types.${subIndex}.sub_categories`}
              options={options}
              onChange={(e) => {
                const transformback = e?.map((item) => ({
                  id: String(item.value),
                  name: item.label,
                }));
                setValue(
                  `farm_informations.${index}.crop_types.${subIndex}.subCategories`,
                  transformback
                );
                console.log(transformback);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
