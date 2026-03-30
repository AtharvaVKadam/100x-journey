import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`⚡ Client connected: ${socket.id}`);

  socket.on("join-room", (roomId: string, userId: number) => {
    socket.join(roomId);
    console.log(`👤 User ${userId} joined room: ${roomId}`);

    socket.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      console.log(`❌ User ${userId} disconnected from room: ${roomId}`);
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 MeetAI Backend running on http://localhost:${PORT}`);
});
