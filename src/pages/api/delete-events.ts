import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ error: "Event ids must be provided as a non-empty array" });
    }
    try {
      await prisma.event.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      res.status(200).json({
        message: "Events deleted sucessfully",
      });
    } catch (error) {
      //eslint-disable-next-line
      console.log(error);
      res.status(500).json({ error: "Failed to delete events" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
