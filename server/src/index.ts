import express from 'express'
import { WebSocketServer } from 'ws'
import cors from 'cors'
const port = 8080;
const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies, if your application uses them
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const httpServer = app.listen(8080, () => {
  console.log(`HTTP server listening on port ${port}`);
});

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
    ws.on('error',console.error);
  console.log('Client connected');
  ws.on('message', function message(data) {
    console.log('received:', data.toString());
    ws.send(`Echo: ${data.toString()}`);

  });

  ws.send('Hello! Message From Server!!');
});
