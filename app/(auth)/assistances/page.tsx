"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import CreateAssistanceType from "./(assistance-types)/CreateAssistanceType";
import { useAssistanceType } from "@/global/useAssistanceType";
import DataTable from "@/components/custom/datatable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ax from "@/app/axios";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBar from "@/components/custom/searchbar";

export default function Page() {
  const { setOpen: setOpenAssistanceType } = useAssistanceType();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchValue] = useDebounce(search, 500);
  const { data, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["assistanceTypes", searchValue],
    queryFn: async () =>
      await ax.get("/assistance_types", {
        params: { search: searchValue, page: page },
      }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  const assistanceTypes = data?.data?.data;
  const pagination = data?.data?.pagination;
  const columns = [
    {
      accessKey: "name",
      header: "Name",
    },
    {
      accessKey: "value",
      header: "Value",
    },
    {
      accessKey: "sponsor",
      header: "Sponsor",
    },
    {
      accessKey: "other_information",
      header: "Other Information",
    },
    {
      header: "Action",
      cell: (item: any) => <Button size={'sm'}>Action</Button>,
    },
  ];
  if (isSuccess) console.log(data?.data);
  if (isError) console.log(error);
  return (
    <>
      <Tabs defaultValue={"assistancesGiven"}>
        <TabsList>
          <TabsTrigger value="assistancesGiven">Assistances Given</TabsTrigger>
          <TabsTrigger value="assistanceTypes">Assistance Types</TabsTrigger>
        </TabsList>
        <TabsContent value="assistancesGiven">
          <h1>
            <Button>
              <Plus /> Add Assistances Given
            </Button>
          </h1>
        </TabsContent>
        <TabsContent value="assistanceTypes">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Button onClick={() => setOpenAssistanceType(true)}>
                <Plus /> Add Assistance Types
              </Button>

              <div>
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                  isFetching={isFetching}
                />
              </div>
            </div>
            <DataTable
              columns={columns}
              data={assistanceTypes}
              pagination={pagination}
              page={page}
              setPage={setPage}
              isFetching={isFetching}
            />
          </div>
        </TabsContent>
      </Tabs>
      <CreateAssistanceType />
    </>
  );
}
