"use client";

import ax from "@/app/axios";
import DataTable from "@/components/custom/datatable";
import SearchBar from "@/components/custom/searchbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MapPin, Plus } from "lucide-react";
import Link from "next/link";
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
      <div className=" w-full">
        <div className="flex justify-between">
          <Link href={"/farmers/create"}>
            <Button>
              <Plus /> Add Farmers
            </Button>
          </Link>
          <div>
            <SearchBar />
          </div>
        </div>
        <div className="grid grid-cols-4 mt-4">
          <Card className="px-6 hover:border-primary pb-3 hover:cursor-zoom-in">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-full h-20 w-20 border"></div>
                <div>
                  <h1 className="font-bold">Farmer Name</h1>
                  <div className="flex items-center gap-1">
                    <h1 className="text-xs opacity-70">Brgy. Wawa, Lumban</h1>
                    <MapPin size={13} />
                  </div>
                  <h1 className="text-sm">53 Y.O.</h1>
                </div>
              </div>
              <div className="space-y-1 mt-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-sm opacity-80">Farms Owned:</h1>
                  <h1 className="text-sm">1</h1>
                </div>
                {/* <div className="flex items-center justify-between">
                  <h1 className="text-sm opacity-80">RSBSA Number:</h1>
                  <h1 className="text-sm">2135781</h1>
                </div> */}
                <div className="flex items-center justify-between">
                  <h1 className="text-sm opacity-80">Assistance Given:</h1>
                  <h1 className="text-sm">2</h1>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-sm opacity-80">Last Assistance:</h1>
                  <h1 className="text-sm">Nov 3, 2025</h1>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button size={"sm"}>Edit</Button>
              <Button size={"sm"}>More</Button>
            </div>
          </Card>
        </div>
        {/* <DataTable
          data={data?.data?.farmers}
          columns={columns}
          pagination={data?.data?.pagination}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
        /> */}
      </div>
    </>
  );
}
