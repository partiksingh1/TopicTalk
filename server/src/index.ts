import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import { roomRouter } from "./routes/roomRoute";
import { setupWebSocket } from "./socket";
const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies, if your application uses them
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use("/", roomRouter);
export const httpServer = http.createServer(app);
httpServer.listen(8000, () => {
  console.log("Listining to port 8000");
});
setupWebSocket(httpServer);
