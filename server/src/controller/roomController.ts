import { Request, Response } from "express";
import { prisma } from "../db/prisma";

export const createRoom = async (req:Request,res:Response):Promise<any>=>{
    const {roomName} = req.body;
    if(!roomName){
        return res.status(400).json({
            message:"Provide a room name"
        })
    }
    try {
        const existingRoom = await prisma.room.findFirst({
            where:{
                name:roomName
            }
        });
        if(existingRoom){
            return res.status(400).json({
                message:"Room already exists"
            });
        }
        const newRoom = await prisma.room.create({
            data:{
                name:roomName
            }
        })
        if(!newRoom){
            return res.status(500).json({
                message:"Error in creating room"
            });
        }
        return res.status(201).json({
            message:"Room created successfully",
            newRoom
        }); 

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Internal server error in creating room"
        });
    }
}
export const getRooms = async (req:Request,res:Response):Promise<any>=>{
    try {
        const rooms = await prisma.room.findMany();
        if(!rooms){
            return res.status(400).json({
                message:"no rooms there"
            })
        }
        return res.status(200).json({
            message:"all rooms fetched",
            rooms
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in getting rooms"
        })
    }
}
export const getRoomById = async (req:Request,res:Response):Promise<any>=>{
    const {roomId} = req.params;
    if(!roomId){
        return res.status(400).json({
            message:"Provide a room name"
        })
    }
    try {
        const exist = await prisma.room.findUnique({
            where:{
                id:roomId
            }
        });
        if(!exist){
            return res.status(400).json({
                message:"Room do not exist"
            });
        }
        const room = await prisma.room.findFirst({
            where:{
                id:roomId
            }
        })
        return res.status(200).json({
            message:"Room fetched successfully",
            room
        }); 

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Internal server error in fetching room"
        });
    }
}
export const deleteRoomById = async (req:Request,res:Response):Promise<any>=>{
    const {roomId} = req.params;
    if(!roomId){
        return res.status(400).json({
            message:"Provide a room name"
        })
    }
    try {
        const exist = await prisma.room.findUnique({
            where:{
                id:roomId
            }
        });
        if(!exist){
            return res.status(400).json({
                message:"Room do not exist"
            });
        }
        const deleteRoom = await prisma.room.delete({
            where:{
                id:roomId
            }
        })
        return res.status(200).json({
            message:"Room deleted successfully",
            deleteRoom
        }); 

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Internal server error in deleted room"
        });
    }
}