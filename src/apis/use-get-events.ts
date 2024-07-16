import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types";
import { API_URLS } from "./urls";

export const getEvents: () => Promise<Event[]> = async () => {
  const res = await fetch(API_URLS["get-events"]);
  return await res.json();
};

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
};
