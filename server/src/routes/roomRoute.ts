import express, { Router } from 'express'
import { createRoom, deleteRoomById, getRoomById, getRooms } from '../controller/roomController';

export const roomRouter = express.Router();

roomRouter.post("/room",createRoom);
roomRouter.get('/rooms',getRooms);
roomRouter.get('/room/:roomId',getRoomById);
roomRouter.delete('/room/:roomId',deleteRoomById);