import { ResponsiveDialog } from "@/components/custom/responsive-dialog";
import SearchBar from "@/components/custom/searchbar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSubCategories } from "@/global/useSubCategories";
import { useState } from "react";

export default function ViewSubCategories() {
  const { open, setOpen } = useSubCategories();
  const { category } = useSubCategories();
  const subCategories = category?.sub_categories;
  const [search, setSearch] = useState("");
  const subCategoriesNew = subCategories?.filter((item: any) =>
    item?.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">{category?.name || 'Sub Categories'}</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <SearchBar search={search} setSearch={setSearch} isFetching={false} />
        </div>
        <div>
          {/* {subCategories?.map((subCategory: any) => (
            <div
              key={subCategory.id}
              className="flex justify-between hover:bg-secondary py-2 px-4 rounded-md"
            >
              <h1>{subCategory.name}</h1>
              <div>
                <Button size={"sm"}>Edit</Button>
              </div>
            </div>
          ))} */}
          {subCategoriesNew?.map((subCategory: any) => (
            <div
              key={subCategory.id}
              className="flex justify-between hover:bg-secondary py-2 px-4 rounded-md"
            >
              <h1>{subCategory.name}</h1>
              <div>
                <Button size={"sm"}>Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
