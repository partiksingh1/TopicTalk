import { WebSocket, WebSocketServer } from "ws";
import { PrismaClient } from "@prisma/client";
import { Server as HTTPServer } from "http";
import { httpServer } from ".";

const prisma = new PrismaClient();

const rooms: Record<string, Set<WebSocket>> = {};
export const setupWebSocket = (server: HTTPServer) => {
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws: WebSocket) => {
    let currentRoom: string = "";
    ws.on("message", async (data) => {
      try {
        let message = JSON.parse(data.toString());
        if (message.type === "join") {
          const { roomId } = message;
          currentRoom = roomId;
          if (!rooms[currentRoom]) {
            rooms[currentRoom] = new Set();
          }
          rooms[currentRoom].add(ws);
          ws.send(
            JSON.stringify({
              type: "joined",
              roomId: currentRoom,
            })
          );
        }
        if (message.type === "message") {
          const { roomId, text, senderName } = message;
          const newMessage = await prisma.message.create({
            data: {
              text: text,
              roomId: roomId,
              senderName: senderName,
            },
          });
          if (!newMessage) {
            return console.log("Error in sending message");
          }
          rooms[roomId]?.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "MESSAGE",
                  ...newMessage,
                })
              );
            }
          });
        }
      } catch (error) {
        console.error("WebSocket Error:", error);
      }
    });
    ws.on("close", () => {
      if (currentRoom && rooms[currentRoom]) {
        rooms[currentRoom].delete(ws);
      }
    });
  });
};
