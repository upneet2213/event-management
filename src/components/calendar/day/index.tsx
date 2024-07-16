import { cn } from "@/lib/utils";
import { Event } from "@/types";
import React from "react";
import { Day, DayClickEventHandler } from "react-day-picker";
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
  const isSunday = date.getDay() === 0;
  const dayType = isSunday
    ? "sunday"
    : events && events?.length > 0
    ? "eventDay"
    : "default";

  return (
    <div className={cn(dayContainerVariants({ dayType }))}>
      <Day date={date} displayMonth={displayMonth} />
      {/* {events?.length && events?.length > 0 ? (
        <div className="rounded-full w-6 h-6 absolute top-0 right-0">
          <span>{events?.length}</span>
        </div>
      ) : null} */}
      <div
        className="items-center w-full absolute h-full top-6 left-1/2 -translate-x-1/2 px-1 overflow-hidden"
        style={{
          height: `calc(100% - 28px)`,
        }}
      >
        {events?.map((event, index) => (
          <Tag key={event.id} event={event} />
        ))}
        {/* {events && events?.length > 2 && (
          <div className="hidden lg:block text-sm text-gray-500">
            {events.length - 1} more
          </div>
        )} */}
        {/* {events?.slice(0, 2).map((event, index) => (
          <Tag key={event.id} event={event} />
        ))} */}

        {/* {events && events?.length > 1 && (
          <div className="absolute hidden md:block lg:hidden text-sm text-gray-500">
            {events?.length - 1} more
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CustomDay;
