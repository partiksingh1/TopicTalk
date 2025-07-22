
# TopicTalk - Anonymous Topic Chat App

### An open, ephemeral, anonymous real-time chat application where users can:

- Create topic-based chat rooms
- Chat anonymously with auto-generated usernames
- View messages in real-time via WebSockets
- Messages are automatically deleted after 24 hours

## 🚀 Live Demo
[🔗 Click here to open the app (deployed)](https://topictalk-vdbgrq.fly.dev/) 

## 📌 Features

- ⚡ Real-time WebSocket chat (using `ws`)
- 🧪 Anonymous names per device (stored in `localStorage`)
- 💬 Multiple topic rooms
- 🧹 Automatic message cleanup after 24 hours (via cron job)
- 🌐 REST API for room & message management
- 🎨 Clean and responsive UI using [shadcn/ui](https://ui.shadcn.com/)


## 🛠️ Tech Stack

### Frontend
- React + Vite
- TypeScript
- Shadcn UI (Radix + Tailwind)
- WebSocket (native browser)

### Backend
- Node.js with TypeScript
- Express.js
- WebSocket Server (using `ws`)
- PostgreSQL + Prisma ORM
- Cron jobs with `node-cron`

## 📚 What I Learned

### WebSockets
- **What WebSockets are**: A persistent full-duplex communication channel between client and server.
- **How `ws` works**: A minimalist WebSocket library in Node.js that gives low-level control.
- **Why not Socket.IO?**: Socket.IO adds extra metadata and abstraction. `ws` is better for lean setups and learning real WebSocket protocol.
- **How to handle real-time messaging**: Broadcast messages to connected clients in a room.
- **Room handling logic**: Track rooms and users using in-memory data structures (like `Record<string, Set<WebSocket>>`).
- **Anonymous user generation**: Persist anonymous names per device via localStorage.
- **Cron for cleanup**: Scheduled task to remove messages older than 24 hours from the database.


## ✅ To-Do (Next Steps)

- Add typing indicators
- Add message reactions or emojis
- Auto-scroll to latest messages
- Option to set nickname (optional)

## 📄 License
MIT
