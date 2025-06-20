import express, { Router } from "express";
import {
  createRoom,
  deleteRoomById,
  getRoomById,
  getRooms,
} from "../controller/roomController";
import { getMessagesById } from "../controller/messageController";

export const roomRouter = express.Router();

roomRouter.post("/room", createRoom);
roomRouter.get("/rooms", getRooms);
roomRouter.get("/room/:roomId", getRoomById);
roomRouter.delete("/room/:roomId", deleteRoomById);

roomRouter.get("/messages/:roomId", getMessagesById);
