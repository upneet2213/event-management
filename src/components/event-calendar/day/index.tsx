import { cn } from "@/lib/utils";
import { Event } from "@/types";
import React from "react";
import { Day } from "react-day-picker";
import { dayContainerVariants, dayVariants } from "./styles";

type Props = {
  displayMonth: Date;
  date: Date;
  events?: Array<Event>;
};

const Tag = ({ event }: { event: Event }) => {
  return (
    <span
      className={cn(
        dayVariants({ eventType: event.eventType as "1" | "2" | "3" })
      )}
    >
      {event.eventName}
    </span>
  );
};

const CustomDay: React.FC<Props> = ({ events, date, displayMonth }) => {
  const dayType = events && events?.length > 0 ? "eventDay" : "default";

  return (
    <div className={cn(dayContainerVariants({ dayType }))}>
      {/* render the default day, plus more items like tags, total number events */}
      <Day date={date} displayMonth={displayMonth} />

      {/* total number of events */}
      {events?.length && events?.length > 0 ? (
        <div className="rounded-full w-6 h-6 absolute -top-2 -right-2 bg-red-400 text-white flex items-center justify-center z-20">
          <span>{events?.length}</span>
        </div>
      ) : null}

      {/* tags */}
      <div
        className="items-center w-full absolute h-full top-7 left-1/2 -translate-x-1/2 px-1 overflow-hidden"
        style={{
          height: `calc(100% - 42px)`,
        }}
      >
        {events?.map((event) => (
          <Tag key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default CustomDay;
