import express from 'express'
import { WebSocketServer } from 'ws'
import cors from 'cors'
import { roomRouter } from './routes/roomRoute';
const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies, if your application uses them
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use('/',roomRouter)
const httpServer = app.listen(8000, () => {
  console.log(`HTTP server listening on port 8000`);
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
