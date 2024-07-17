"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DropdownProps, Head } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import CustomDay from "./day";
import { Event } from "@/types";
import {
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { endOfDay, startOfDay } from "date-fns";
type EventCalendarProps = {
  events?: Array<Event>;
};

export type CalendarProps = React.ComponentProps<typeof DayPicker> &
  EventCalendarProps;

function EventCalendar({
  events,
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown-buttons"
      fromYear={1960}
      toYear={2030}
      className={cn("p-3", className)}
      //classnames for styling the calendar
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-lg font-medium",
        caption_dropdowns: "flex justify-center gap-1",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-11 md:w-[88px] lg:w-[120px] font-normal text-[0.8rem]",
        row: "flex w-full mt-2 gap-2",
        cell: "w-9 h-9 md:w-20 md:h-20 lg:w-28 lg:h-28 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "calendar" }),
          "w-9 h-9 md:h-20 md:w-20 lg:h-28 lg:w-28 relative z-10 p-1 font-normal aria-selected:opacity-100 border text-orange-700"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today:
          "text-accent-foreground underline decoration-2 underline-offset-2",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        //custom rendering month and year selection dropdowns to match the design
        Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
          const options = React.Children.toArray(
            children
          ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
          const selected = options.find((child) => child.props.value === value);
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value);
              }}
            >
              <SelectTrigger className="pr-1.5">
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <ScrollArea className="h-80">
                  {options.map((option, id: number) => (
                    <SelectItem
                      key={`${option.props.value}-${id}`}
                      value={option.props.value?.toString() ?? ""}
                    >
                      {option.props.children}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          );
        },
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        Day: ({ ...dayProps }) => {
          const eventsOnDay = events?.filter((currEvent) => {
            //logic to check all events on a day to display tags and other relevant information
            const eventFromDate = new Date(currEvent.eventFrom); // Ensure correct conversion
            const eventToDate = new Date(currEvent.eventTo); //

            const dayStart = startOfDay(dayProps.date).valueOf();
            const dayEnd = endOfDay(dayProps.date).valueOf();

            return (
              eventFromDate.valueOf() <= dayEnd &&
              eventToDate.valueOf() >= dayStart
            );
          });

          return (
            <CustomDay
              events={eventsOnDay}
              displayMonth={dayProps.displayMonth}
              date={dayProps.date}
            />
          );
        },
      }}
      {...props}
    />
  );
}
EventCalendar.displayName = "EventCalendar";

export { EventCalendar };
