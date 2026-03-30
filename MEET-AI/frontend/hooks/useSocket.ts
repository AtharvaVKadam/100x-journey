import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

export const useSocket = (roomId: string, userId: number | undefined) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socketInstance = io(SOCKET_SERVER_URL);
    setSocket(socketInstance);

    socketInstance.emit("join-room", roomId, userId);

    socketInstance.on("user-connected", (newUserId) => {
      console.log(`New user joined the room! ID: ${newUserId}`);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId, userId]);

  return socket;
};
