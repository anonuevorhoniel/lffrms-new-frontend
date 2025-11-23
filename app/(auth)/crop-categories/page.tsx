"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ax from "@/app/axios";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { CiLink } from "react-icons/ci";
import DataTable from "@/components/custom/datatable";
import { Status, StatusIndicator } from "@/components/ui/shadcn-io/status";
import { useCropTypes } from "@/global/useCropTypes";
import CreateCropTypes from "./CreateCropTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSubCategories } from "@/global/useSubCategories";
import ViewSubCategories from "./(sub-categories)/ViewSubCategories";
import SearchBar from "@/components/custom/searchbar";

export default function Page() {
  const { open, setOpen } = useCropTypes();
  const {
    open: subCategoryOpen,
    setOpen: setSubCategoryOpen,
    setCategory,
  } = useSubCategories();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);
  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ["cropTypes", page, searchValue],
    queryFn: async () =>
      await ax.get("/crop_types", {
        params: { search: searchValue, page: page },
      }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  if (isSuccess) console.log(data?.data);
  if (isError) console.log(error);
  const cropTypeData = data?.data?.data;
  const pagination = data?.data?.pagination;
  const columns = [
    {
      accessKey: "name",
      header: "Name",
    },
    {
      header: "Type",
      cell: (item: any) => (
        <>
          <Status status="online">
            <StatusIndicator /> <h1>HVC</h1>
          </Status>
        </>
      ),
    },
    {
      header: "Action",
      cell: (item: any) => (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"} variant={"outline"}>
                Action <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setSubCategoryOpen(true);
                  setCategory(item);
                }}
              >
                Sub Categories <DropdownMenuShortcut></DropdownMenuShortcut>
                <CiLink />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ),
    },
  ];
  return (
    <>
      <div>
        <div className="flex justify-between">
          <Button size={"sm"} onClick={() => setOpen(true)}>
            {" "}
            <Plus /> 
            
            Add Crop Types
          </Button>
          <div>
            <SearchBar
              search={search}
              setSearch={setSearch}
              isFetching={isFetching}
            />
          </div>
        </div>
      </div>
      <DataTable
        data={cropTypeData}
        page={page}
        setPage={setPage}
        pagination={pagination}
        isFetching={isFetching}
        columns={columns}
      />
      <CreateCropTypes />
      <ViewSubCategories />
    </>
  );
}
