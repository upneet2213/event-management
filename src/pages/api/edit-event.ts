import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, eventName, eventType, eventFrom, eventTo } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Event id is required" });
    }
    try {
      const updatedEvent = await prisma.event.update({
        where: { id },
        data: {
          eventFrom,
          eventName,
          eventTo,
          eventType,
        },
      });
      res.status(200).json({
        ...updatedEvent,

        eventFrom: parseInt(updatedEvent.eventFrom.toString()),
        eventTo: parseInt(updatedEvent.eventTo.toString()),
      });
    } catch (error) {
      //eslint-disable-next-line
      console.log(error);
      res.status(500).json({ error: "Failed to update event" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
