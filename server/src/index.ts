import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import { roomRouter } from "./routes/roomRoute";
import { setupWebSocket } from "./socket";
import "./jobs/messageCleanup";
const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies, if your application uses them
};
const port = process.env.PORT || 8000;

export const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use("/", roomRouter);
export const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  console.log(`Listining to port ${port}`);
});
setupWebSocket(httpServer);
