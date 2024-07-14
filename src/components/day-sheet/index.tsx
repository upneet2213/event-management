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
import { getDateFormat } from "../../../utils/date";
import { useState } from "react";
import { ArrowUpDown, Expand, MoreHorizontal, Shrink } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { Event } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

type Props = {
  open: boolean;
  setOpen: (flag: boolean) => void;
};

const event1Date = new Date(2024, 6, 12); // July 12, 2024
const event2Date = new Date(2024, 6, 13); // July 13, 2024
const event3Date = new Date(2024, 6, 14); // July 14, 2024
const event4Date = new Date(2024, 6, 15); // July 15, 2024

const data = [
  {
    id: "101",
    eventName: "Event1",
    eventType: "1",
    eventFrom: event1Date,
    eventTo: event2Date,
  },
  {
    id: "102",
    eventName: "Event2",
    eventType: "2",
    eventFrom: event2Date,
    eventTo: event2Date,
  },
  {
    id: "103",
    eventName: "Event3",
    eventType: "3",
    eventFrom: event2Date,
    eventTo: event4Date,
  },
];

export function DaySheet({ open, setOpen }: Props) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const params = useSearchParams();
  const dateParam = params.get("date");
  const dateString = dateParam ?? "";

  const columns: ColumnDef<Event>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "eventName",
      header: "Event Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("eventName")}</div>
      ),
    },
    {
      accessorKey: "eventType",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Event Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase flex items-center justify-center">
          {row.getValue("eventType")}
        </div>
      ),
    },
    {
      accessorKey: "eventFrom",
      header: () => <div className="text-center">From</div>,
      cell: ({ row }) => {
        const fromDate = new Date(row.getValue("eventFrom"));

        const formatted = getDateFormat(fromDate);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "eventTo",
      header: () => <div className="text-center">To</div>,
      cell: ({ row }) => {
        const toDate = new Date(row.getValue("eventTo"));

        const formatted = getDateFormat(toDate);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const event = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const currEvents = data.filter((event) => {
    return (
      event.eventFrom.valueOf() <= parseInt(dateString ?? "") &&
      event.eventTo.valueOf() >= parseInt(dateString)
    );
  });

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
            {getDateFormat(new Date(parseInt(dateString)))}
          </SheetTitle>

          <SheetDescription>See all your events here</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {/* {currEvents.length > 0 ? ( */}
          <DataTable data={currEvents} columns={columns} />
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
