import { Request, Response } from "express";
import { prisma } from "../db/prisma";
export const getMessagesById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { roomId } = req.params;
  if (!roomId) {
    return res.status(400).json({
      message: "Provide a room id",
    });
  }
  try {
    const exist = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!exist) {
      return res.status(400).json({
        message: "Room do not exist",
      });
    }
    const messages = await prisma.message.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.status(200).json({
      message: "messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error in fetching messages",
    });
  }
};
