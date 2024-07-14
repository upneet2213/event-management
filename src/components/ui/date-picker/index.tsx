import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type Props = {
  date: Date;
  className?: string;
  onChangeDate: (date?: Date) => void;
};

export function DatePicker({ date, onChangeDate, className }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={
            (cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            ),
            className)
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={onChangeDate}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
}
