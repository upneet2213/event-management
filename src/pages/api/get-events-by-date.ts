// pages/api/events.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { date } = req.query;
    try {
      const selectedDate = new Date(parseInt(date as string));

      const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
      const events = await prisma.event.findMany({
        where: {
          // Check if eventFrom or eventTo falls within the selected day
          OR: [
            {
              eventFrom: {
                gte: startOfDay.getTime(),
                lte: endOfDay.getTime(),
              },
            },
            {
              eventTo: {
                gte: startOfDay.getTime(),
                lte: endOfDay.getTime(),
              },
            },
            // Additional condition: Check for events that span across the selected day
            {
              AND: [
                {
                  eventFrom: {
                    lt: startOfDay.getTime(),
                  },
                },
                {
                  eventTo: {
                    gt: endOfDay.getTime(),
                  },
                },
              ],
            },
          ],
        },
        orderBy: {
          eventFrom: "asc",
        },
      });

      res.status(200).json(
        events.map((event) => {
          return {
            ...event,
            eventFrom: parseInt(event.eventFrom.toString()),
            eventTo: parseInt(event.eventTo.toString()),
          };
        })
      );
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
