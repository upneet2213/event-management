// pages/api/events.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const events = await prisma.event.findMany({
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
