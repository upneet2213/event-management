import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components";
import { cn } from "@/lib/utils";
import { add, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TimePicker } from "./time-picker";

type Props = {
  date?: Date;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  onChangeDate: (date?: Date) => void;
};

export function DatePicker({
  date,
  onChangeDate,
  minDate,
  maxDate,
  className,
}: Props) {
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      onChangeDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    onChangeDate(newDateFull);
  };

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
          {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          //   min={minDate?.valueOf()}
          //   max={minDate?.valueOf()}
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
          fromYear={1960}
          toYear={2030}
        />
        <div className="p-3 border-t border-border">
          <TimePicker setDate={onChangeDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
