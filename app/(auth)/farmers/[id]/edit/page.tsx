"use client";

import ax from "@/app/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import FarmerForm from "../../create/(forms)/FarmerForm";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFarmer } from "@/global/useFarmer";

export default function Page() {
  const { id } = useParams();
  const { farmer, setFarmer } = useFarmer();
  const form = useForm();
  const handleSubmit = () => {};
  const update = useMutation({
    mutationFn: async () => await ax.post(`/farmers/${id}/update`),
  });
  const {
    data: farmerData,
    isSuccess,
    isFetching,
    isError,
    error
  } = useQuery({
    queryKey: ["farmerShow"],
    queryFn: async () => await ax.get(`/farmers/${id}`),
    refetchOnWindowFocus: false,
  });
  if (isSuccess) {
    console.log(farmerData?.data);
  }
  if(isError) {
    console.log(error);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isSuccess) {
        form.reset(farmerData?.data);
        setFarmer(farmerData?.data);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [isSuccess, form, farmerData]);

  if (isFetching) {
    return <>Loading...</>;
  }
  return (
    <>
      <FarmerForm
        form={form}
        handleSubmit={handleSubmit}
        isPending={update.isPending}
      />
    </>
  );
}
