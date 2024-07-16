import { CreateEvent, Event } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useAddEvent = () => {
  const addEvent: (data: CreateEvent) => Promise<Event> = async (data) => {
    const res = await fetch(`api/add-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(data),
    });
    return res.json();
  };
  return useMutation({
    mutationFn: addEvent,
  });
};
