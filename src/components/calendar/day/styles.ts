import { cva } from "class-variance-authority";

export const dayVariants = cva(
  `hidden md:block cursor-pointer text-xs lg:text-sm font-medium rounded mb-2 relative whitespace-nowrap truncate px-2`,
  {
    variants: {
      eventType: {
        "1": "bg-blue-100 text-blue-700",
        "2": "bg-purple-100 text-purple-700",
        "3": "bg-green-100 text-green-700",
      },
    },
  }
);

export const dayContainerVariants = cva(`relative rounded`, {
  variants: {
    dayType: {
      sunday: "bg-white",
      eventDay: "bg-orange-200",
      default: "bg-white",
    },
  },
});
