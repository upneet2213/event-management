import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Expand, Shrink } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { Event } from "@/types";
import { format } from "date-fns";

type Props = {
  events: Event[];
  open: boolean;
  setOpen: (flag: boolean) => void;
};

export function DaySheet({ events, open, setOpen }: Props) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const params = useSearchParams();
  const dateParam = params.get("date");
  const dateString = dateParam ?? "";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className={`sm:max-w-none  overflow-y-auto ${
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
            {format(new Date(parseInt(dateString)), "PPP")}
          </SheetTitle>

          <SheetDescription>See all your events here</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <DataTable data={events} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
