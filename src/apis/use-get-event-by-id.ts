import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types";
import { API_URLS } from "./urls";

export const getEventById: (id?: string) => Promise<Event> = async (id) => {
  const res = await fetch(`${API_URLS["get-event-by-id"]}/${id}`);

  const data = await res.json();

  return data;
};

export const useGetEventById = (id?: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });
};
