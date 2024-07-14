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
  const isSunday = date.getDay() === 0;
  const dayType = isSunday
    ? "sunday"
    : events && events?.length > 0
    ? "eventDay"
    : "default";

  return (
    <div className={cn(dayContainerVariants({ dayType }))}>
      <Day date={date} displayMonth={displayMonth} />
      <div className="w-full flex gap-2 items-center justify-evenly absolute bottom-0 lg:bottom-2 left-0 px-2 overflow-auto hide-scrollbar">
        {events?.map((event) => {
          return <Tag key={event.id} event={event} />;
        })}
      </div>
    </div>
  );
};

export default CustomDay;
