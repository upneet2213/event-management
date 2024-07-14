import { cva } from "class-variance-authority";

export const dayVariants = cva(
  `hidden md:block p-1 cursor-pointer rounded font-medium`,
  {
    variants: {
      eventType: {
        "1": "bg-red-200 text-red-700",
        "2": "bg-purple-200 text-purple-700",
        "3": "bg-green-200 text-green-700",
      },
    },
  }
);

export const dayContainerVariants = cva(`relative rounded`, {
  variants: {
    dayType: {
      sunday: "bg-red-200",
      eventDay: "bg-orange-300",
      default: "bg-orange-200",
    },
  },
});
