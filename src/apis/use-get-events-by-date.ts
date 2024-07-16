import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types";
import { API_URLS } from "./urls";

export const getEventsByDate: (date?: number) => Promise<Event[]> = async (
  date
) => {
  const res = await fetch(`${API_URLS["get-events-by-date"]}?date=${date}`);
  const data = await res.json();

  return data;
};

export const useGetEventsByDate = (date?: number) => {
  return useQuery({
    queryKey: ["events", date],
    queryFn: () => getEventsByDate(date),
    enabled: !!date,
  });
};
