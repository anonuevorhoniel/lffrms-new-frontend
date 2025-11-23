import ax from "@/app/axios";
import { Button } from "@/components/ui/button";
import { useMachines } from "@/global/useMachines";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import CreateMachines from "../../machines/CreateMachines";
import DataTable from "@/components/custom/datatable";

export default function Machines() {
  const { open, setOpen } = useMachines();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);
  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ["machines", page, searchValue],
    queryFn: async () =>
      await ax.get("/machines", {
        params: { search: searchValue, page: page },
      }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  if (isSuccess) console.log(data?.data);
  if (isError) console.log(error);
  const columns = [
    {
      accessKey: "name",
      header: "Name",
    },
    {
      header: "Action",
      cell: () => (
        <>
          <Button size={"sm"}>Action</Button>
        </>
      ),
    },
  ];
  const machineData = data?.data?.data;
  const pagination = data?.data?.pagination;
  return (
    <>
      <div className="space-y-3">
        <Button onClick={() => setOpen(true)}>
          <Plus /> Add Machines
        </Button>
        <DataTable
          data={machineData}
          isFetching={isFetching}
          columns={columns}
          page={page}
          setPage={setPage}
          pagination={pagination}
        />
        <CreateMachines />  
      </div>
    </>
  );
}
