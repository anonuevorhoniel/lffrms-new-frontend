"use client";

import ax from "@/app/axios";
import DataTable from "@/components/custom/datatable";
import SearchBar from "@/components/custom/searchbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFarmer } from "@/global/useFarmer";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ViewFarmer from "./(view)/ViewFarmer";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";

export default function Page() {
  const [page, setPage] = useState(1);
  const { farmer, setFarmer, setViewOpen } = useFarmer();
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
            {farmer?.name_extension ?? ""}
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
        <div className="sm:flex justify-between">
          <Link href={"/farmers/create"}>
            <Button>
              <Plus /> Add Farmers
            </Button>
          </Link>
          <div className="mt-3 sm:mt-0">
            <SearchBar />
          </div>
        </div>
        <div className="grid sm:grid-cols-4 mt-4 gap-4">
          {data?.data?.farmers?.map((farmer: any) => {
            const fullName = `${farmer.first_name} ${
              farmer.middle_name ?? ""
            } ${farmer.last_name} ${farmer.name_extension ?? ""}`;
            return (
              <Card
                className="hover:shadow-lg hover:-translate-y-1 transition-all pb-0 hover:cursor-pointer"
                key={farmer.id}
                onClick={() => {
                  setFarmer(farmer);
                  setViewOpen(true);
                }}
              >
                <div className="px-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="w-30 h-30 shadow-lg">
                      <ImageZoom>
                        <AvatarImage src={farmer.image_url} />
                      </ImageZoom>
                    </Avatar> 
                    <div className="flex flex-col items-center">
                      <h1 className="font-bold">{fullName}</h1>
                      <div className="flex items-center gap-1">
                        <MapPin size={13} className="opacity-70" />
                        <h1 className="text-xs opacity-70 italic">
                          Brgy. {farmer?.barangay?.name},{" "}
                          {farmer?.municipality?.name}
                        </h1>
                      </div>
                      <h1 className="text-sm">{farmer.age} Y.O.</h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-3"></div>
                  <div className="space-y-1 mt-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-sm opacity-80">Farms Owned:</h1>
                      <h1 className="text-sm">
                        {farmer.farm_informations_count}
                      </h1>
                    </div>
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

                <div className="grid grid-cols-2 border-t">
                  {" "}
                  {/* Added border-t here */}
                  <Link href={`/farmers/${farmer.id}/edit`} className="w-full">
                    <Button
                      size={"sm"}
                      variant={"ghost"}
                      className="w-full rounded-none h-10 rounded-bl-lg hover:bg-muted"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size={"sm"}
                    className="rounded-none h-10 rounded-br-lg hover:bg-muted"
                    variant={"ghost"}
                    onClick={(e) => e.stopPropagation()}
                  >
                    More
                  </Button>
                </div>
              </Card>
            );
          })}
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
      <ViewFarmer />
    </>
  );
}
