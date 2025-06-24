import { Request, Response } from "express";
import { prisma } from "../db/prisma";

export const createRoom = async (req:Request,res:Response)=>{
    const {roomName} = req.body;
    if(!roomName){
        res.status(400).json({
            message:"Provide a room name"
        })
        return
    }
    try {
        const existingRoom = await prisma.room.findFirst({
            where:{
                name:roomName
            }
        });
        if(existingRoom){
            res.status(400).json({
                message:"Room already exists"
            });
            return
        }
        const newRoom = await prisma.room.create({
            data:{
                name:roomName
            }
        })
        if(!newRoom){
            res.status(500).json({
                message:"Error in creating room"
            });
            return
        }
        res.status(201).json({
            message:"Room created successfully",
            newRoom
        }); 
        return

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message:"Internal server error in creating room"
        });
        return
    }
}
export const getRooms = async (req:Request,res:Response)=>{
    try {
        const rooms = await prisma.room.findMany();
        if(!rooms){
            res.status(400).json({
                message:"no rooms there"
            })
            return
        }
        res.status(200).json({
            message:"all rooms fetched",
            rooms
        })
        return
    } catch (error) {
        res.status(500).json({
            message:"Internal server error in getting rooms",
            error
        })
        return
    }
}
export const getRoomById = async (req:Request,res:Response)=>{
    const {roomId} = req.params;
    if(!roomId){
        res.status(400).json({
            message:"Provide a room name"
        })
        return
    }
    try {
        const exist = await prisma.room.findUnique({
            where:{
                id:roomId
            }
        });
        if(!exist){
            res.status(400).json({
                message:"Room do not exist"
            });
            return
        }
        const room = await prisma.room.findFirst({
            where:{
                id:roomId
            }
        })
        res.status(200).json({
            message:"Room fetched successfully",
            room
        }); 
        return

    } catch (error) {
        res.status(500).json({
            message:"Internal server error in fetching room",
            error
        });
        return
    }
}
export const deleteRoomById = async (req:Request,res:Response)=>{
    const {roomId} = req.params;
    if(!roomId){
        res.status(400).json({
            message:"Provide a room name"
        })
        return
    }
    try {
        const exist = await prisma.room.findUnique({
            where:{
                id:roomId
            }
        });
        if(!exist){
            res.status(400).json({
                message:"Room do not exist"
            });
            return
        }
        const deleteRoom = await prisma.room.delete({
            where:{
                id:roomId
            }
        })
        res.status(200).json({
            message:"Room deleted successfully",
            deleteRoom
        }); 
        return

    } catch (error) {
        res.status(500).json({
            message:"Internal server error in deleted room",
            error
        });
        return
    }
}