// pages/api/addEvent.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { eventName, eventType, eventFrom, eventTo } = req.body;

    try {
      const newEvent = await prisma.event.create({
        data: {
          eventName,
          eventType,
          eventFrom,
          eventTo,
        },
      });
      res.status(201).json({
        ...newEvent,
        eventFrom: parseInt(newEvent.eventFrom.toString()),
        eventTo: parseInt(newEvent.eventTo.toString()),
      });
    } catch (error) {
      //eslint-disable-next-line
      console.log(error);

      res.status(500).json({ error: "Failed to add event" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
