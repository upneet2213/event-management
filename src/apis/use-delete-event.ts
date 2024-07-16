import { Event } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useDeleteEvents = () => {
  const deleteEvents: (ids: string[]) => Promise<unknown> = async (ids) => {
    const res = await fetch(`api/delete-events`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify({
        ids,
      }),
    });
    return res.json();
  };
  return useMutation({
    mutationFn: deleteEvents,
  });
};
