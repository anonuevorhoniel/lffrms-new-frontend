"use client";
import SearchBar from "@/components/custom/searchbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Machines from "./(machines)/Machines";
import Funds from "./(funds)/Funds";

export default function Page() {
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);
  return (
    <>
      <Tabs>
        <TabsList>
          <TabsTrigger value="postHarvests">Post Harvests </TabsTrigger>
          <TabsTrigger value="machines">Machines </TabsTrigger>
          <TabsTrigger value="funds">Funds </TabsTrigger>
        </TabsList>
        <TabsContent value="postHarvests">
          <div className="flex justify-between">
            <Button>
              <Plus /> Add Post Harvests
            </Button>
            <div>
              <SearchBar
                search={search}
                setSearch={setSearch}
                isFetching={false}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="machines">
          <Machines />
        </TabsContent>
        <TabsContent value="funds">
          <Funds />
        </TabsContent>
      </Tabs>
    </>
  );
}
