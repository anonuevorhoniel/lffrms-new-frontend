"use client";

import ax from "@/app/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FarmerForm from "./(forms)/FarmerForm";
import { useEffect, useState } from "react";
import { useTitle } from "@/global/useTitle";

export default function Page() {
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle({
      link: "/farmers",
      name: "Farmers",
      pages: ["Create"],
    });
  }, []);
  const form = useForm();
  const handleSubmit = (data: any) => {
    store.mutate(data);
    console.log(data);
  };
  const qclient = useQueryClient();
  const store = useMutation({
    mutationFn: async (data) => await ax.post("/farmers/store", data),
    onSuccess: () => {
      toast.success("Farmer Added");
      form.reset();
      qclient.invalidateQueries({
        queryKey: ["farmers"],
      });
      qclient.removeQueries({
        queryKey: ["municipalities"],
      });
      qclient.removeQueries({
        queryKey: ["barangays"],
      });
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
