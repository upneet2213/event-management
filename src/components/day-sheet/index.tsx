import { Button } from "@/components/ui/button";
import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
// import { getDateFormat } from "../../utils/date";
import { useState } from "react";
import { ArrowUpDown, Expand, MoreHorizontal, Shrink } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { Event } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

type Props = {
  events: Event[];
  open: boolean;
  setOpen: (flag: boolean) => void;
};

// const event1Date = new Date(2024, 6, 12); // July 12, 2024
// const event2Date = new Date(2024, 6, 13); // July 13, 2024
// const event3Date = new Date(2024, 6, 14); // July 14, 2024
// const event4Date = new Date(2024, 6, 15); // July 15, 2024

// const data = [
//   {
//     id: "101",
//     eventName: "Event1",
//     eventType: "1",
//     eventFrom: event1Date,
//     eventTo: event2Date,
//   },
//   {
//     id: "102",
//     eventName: "Event2",
//     eventType: "2",
//     eventFrom: event2Date,
//     eventTo: event2Date,
//   },
//   {
//     id: "103",
//     eventName: "Event3",
//     eventType: "3",
//     eventFrom: event2Date,
//     eventTo: event4Date,
//   },
// ];

export function DaySheet({ events, open, setOpen }: Props) {
  const router = useRouter();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const params = useSearchParams();
  const dateParam = params.get("date");
  const dateString = dateParam ?? "";

  // const currEvents = events.filter((event) => {
  //   return (
  //     event.eventFrom.valueOf() <= parseInt(dateString ?? "") &&
  //     event.eventTo.valueOf() >= parseInt(dateString)
  //   );
  // });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className={`sm:max-w-none ${
          isFullScreen ? "sm:w-11/12" : "sm:w-[600px]"
        } transition-all duration-200`}
      >
        <SheetHeader>
          <div className="absolute right-10 top-4">
            {!isFullScreen ? (
              <Expand
                size={14}
                onClick={() => {
                  setIsFullScreen(true);
                }}
              />
            ) : (
              <Shrink
                size={14}
                onClick={() => {
                  setIsFullScreen(false);
                }}
              />
            )}
          </div>
          <SheetTitle className="flex items-center justify-between">
            {/* {getDateFormat(new Date(parseInt(dateString)))}
             */}
            {format(new Date(parseInt(dateString)), "PPP")}
          </SheetTitle>

          <SheetDescription>See all your events here</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {/* {currEvents.length > 0 ? ( */}
          <DataTable data={events} />
          {/* ) : (
            <div>
              <p className="text-gray-400 mb-4">No Events</p>
              <Button type="button" variant={"default"}>
                Add Event
              </Button>
            </div>
          )} */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
