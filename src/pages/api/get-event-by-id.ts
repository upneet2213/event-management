// pages/api/events.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.id as string;
    try {
      const events = await prisma.event.findUnique({
        where: {
          id,
        },
      });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
