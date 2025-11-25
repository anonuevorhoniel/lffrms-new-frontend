"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export default function CommandSelect({
  values,
  form,
  name,
}: {
  values: { label: string; value: string }[];
  name: string;
  form: UseFormReturn;
}) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("Select");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="flex justify-between ">
          <div className={label !== "Select" ? "" : "opacity-80"}>{label}</div>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {values?.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    setOpen(false);
                    form.setValue(name, item.value);
                    setLabel(item.label);
                  }}
                >
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
