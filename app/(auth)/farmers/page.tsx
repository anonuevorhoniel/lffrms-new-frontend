"use client";

import ax from "@/app/axios";
import DataTable from "@/components/custom/datatable";
import { Button } from "@/components/ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const { data, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["farmers", page],
    queryFn: async () => await ax.get("/farmers", { params: { page: page } }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
  if (isSuccess) console.log(data?.data);
  if (isError) console.log(error);
  const columns = [
    {
      header: "Full Name",
      cell: (farmer: any) => (
        <>
          <h1>
            {farmer?.first_name} {farmer?.middle_name} {farmer?.last_name}{" "}
            {farmer?.name_extension} {data?.data?.pagination?.total_page}
          </h1>
        </>
      ),
    },

    {
      header: "Farm count",
      cell: (farmer: any) => (
        <>
          <h1>1</h1>
        </>
      ),
    },
    {
      header: "Last Modified",
      cell: (farmer: any) => (
        <>
          <h1>user</h1>
        </>
      ),
    },
    {
      header: "Action",
      cell: (farmer: any) => (
        <>
          <h1>
            <Button size={"sm"}>Action</Button>
          </h1>
        </>
      ),
    },
  ];
  return (
    <>
      <title>LFFRMS | Farmers</title>
      <div className="space-y-4 w-full">
        <Button>
          <Plus /> Add Farmers
        </Button>
        <DataTable
          data={data?.data?.farmers}
          columns={columns}
          pagination={data?.data?.pagination}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
        />
      </div>
    </>
  );
}
