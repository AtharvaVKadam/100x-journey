import { useState, useEffect, useCallback } from "react";
import { Socket } from "socket.io-client";

export interface ChatMessage {
  id: string;
  senderId: number | string;
  senderName: string;
  text: string;
  timestamp: string;
}

export const useChat = (
  socket: Socket | null,
  roomId: string,
  currentUser: any,
) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-message", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!socket || !text.trim() || !currentUser) return;

      const newMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        senderId: currentUser.id,
        senderName: currentUser.username || "User",
        text: text.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newMessage]);

      socket.emit("send-message", newMessage);
    },
    [socket, currentUser],
  );

  return { messages, sendMessage };
};
