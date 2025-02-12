import { Inter } from "next/font/google";
import {
  Button,
  EventCalendar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DataTable,
  DaySheet,
} from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { getEvents, useGetEvents } from "@/apis/use-get-events";
import {
  getEventsByDate,
  useGetEventsByDate,
} from "@/apis/use-get-events-by-date";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const viewOptions = [
  {
    value: "calendar",
    label: "Calendar View",
  },
  { value: "table", label: "Table View" },
];

export default function Home() {
  const params = useSearchParams();
  const router = useRouter();

  //this route renders the calendar/table and the day sheet
  //if there is a date query param, we show the sheet
  //otherwise, we don't
  //this approach of saving state in url is more manageable and future proof than saving it in usestate
  const date = params.get("date");
  const [selectedView, setSelectedView] = useState("calendar");

  //here, we get the data to be passed to our components through use query.

  //however, since we already prefetched the data in getServerSideProps, which returned a dehydrated queryClient
  //which is then rehydrated by Hydration boundary, the api call is not made. Neat.
  const { data: events } = useGetEvents();
  const { data: eventsForDate } = useGetEventsByDate(
    date ? parseInt(date) : undefined
  );

  return (
    <main
      className={`flex h-screen flex-col items-center p-12 bg-orange-100 ${inter.className}`}
    >
      <div className="flex items-center gap-4 mb-6">
        {/* wrap buttons inside links instead of attaching onClick events */}
        <Link href="add-event">
          <Button>Add Event</Button>
        </Link>
        <Select
          value={selectedView}
          onValueChange={(value) => {
            setSelectedView(value);
          }}
        >
          <SelectTrigger className="pr-1.5">
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent position="popper">
            {viewOptions.map((option, id: number) => (
              <SelectItem
                key={`${option.value}-${id}`}
                value={option.value ?? ""}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedView === "calendar" ? (
        <EventCalendar
          events={events}
          onDayClick={(props) => {
            router.push(`?date=${props.valueOf()}`);
          }}
        />
      ) : (
        <DataTable data={events ?? []} />
      )}
      {/* only render sheet if there is no date query param, remove date query param on closing sheet */}
      {date && (
        <DaySheet
          events={eventsForDate ?? []}
          open={Boolean(date)}
          setOpen={(isOpen) => {
            if (!isOpen) {
              router.replace("/");
            }
          }}
        />
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async (ctx) => {
  const date = parseInt(ctx.query.date as string);

  const queryClient = new QueryClient();

  if (date) {
    await queryClient.prefetchQuery({
      queryKey: ["events", date],
      queryFn: () => getEventsByDate(date),
    });
  }
  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
