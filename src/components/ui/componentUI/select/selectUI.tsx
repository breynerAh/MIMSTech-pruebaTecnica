"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { TSelectProps } from "./types";

export function SelectUI({
  data,
  setSelectedFont,
  selectedFont,
}: TSelectProps) {
  return (
    <Select value={selectedFont} onValueChange={setSelectedFont}>
      <SelectTrigger className="w-[100px] mr-3 border-none shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((data) => (
            <SelectItem key={data?.value} value={data?.value}>
              {data?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
