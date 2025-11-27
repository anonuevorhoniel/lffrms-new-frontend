"use client";

import ax from "@/app/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FarmerForm from "./(forms)/FarmerForm";
import { useEffect, useState } from "react";
import { useTitle } from "@/global/useTitle";
import { useFarmer } from "@/global/useFarmer";

export default function Page() {
  const { setTitle } = useTitle();
  const { farmerImage, farmerSignatoryImage } = useFarmer();
  useEffect(() => {
    setTitle({
      link: "/farmers",
      name: "Farmers",
      pages: ["Create"],
    });
  }, []);
  const form = useForm<any>({
    defaultValues: {
      farm_informations: [
        {
          crop_types: [{}],
          id: null,
        },
      ],
    },
  });
  const handleSubmit = (data: any) => {
    const newFormData = new FormData();
    Object.keys(data).forEach((key: any) => {
      if (key === "farm_informations") {
        newFormData.append(key, JSON.stringify(data[key]));
      } else {
        newFormData.append(key, data[key]);
      }
    });

    if (farmerImage) {
      newFormData.append("farmer_image", farmerImage[0]);
    }
    if (farmerSignatoryImage) {
      newFormData.append("farmer_image_signatory", farmerSignatoryImage[0]);
    }
   console.log(data?.farm_informations)
    store.mutate(newFormData);
  };
  const store = useMutation({
    mutationFn: async (data: any) => await ax.post("/farmers/store", data),
    onSuccess: (data) => {
      toast.success("Farmer Added");
      // form.reset();
      // qclient.invalidateQueries({
      //   queryKey: ["farmers"],
      // });
      // qclient.removeQueries({
      //   queryKey: ["municipalities"],
      // });
      // qclient.removeQueries({
      //   queryKey: ["barangays"],
      // });
      // setFarmerImage(undefined);
      // setFarmerSignatoryImage(undefined);
      console.log(data?.data);
    },
    onError: (error) => console.log(error),
  });
  return (
    <FarmerForm
      form={form}
      handleSubmit={handleSubmit}
      isPending={store.isPending}
    />
  );
}
