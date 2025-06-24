import { Request, Response } from "express";
import { prisma } from "../db/prisma";
export const getMessagesById = async (
  req: Request,
  res: Response
):Promise<any>=> {
  const { roomId } = req.params;
  if (!roomId) {
    res.status(400).json({
      message: "Provide a room id",
    });
    return
  }
  try {
    const exist = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!exist) {
      res.status(400).json({
        message: "Room do not exist",
      });
      return
    }
    const messages = await prisma.message.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({
      message: "messages fetched successfully",
      messages,
    });
    return
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error in fetching messagess",
    });
    return
  }
};
