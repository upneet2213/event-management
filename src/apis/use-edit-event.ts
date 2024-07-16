import { Event } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useEditEvent = () => {
  const editEvent: (data: Event) => Promise<Event> = async (data) => {
    const res = await fetch(`api/edit-event`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(data),
    });
    return res.json();
  };
  return useMutation({
    mutationFn: editEvent,
  });
};
