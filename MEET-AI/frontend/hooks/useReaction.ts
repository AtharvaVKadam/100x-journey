import { useState, useEffect, useCallback } from "react";
import { Socket } from "socket.io-client";

export interface Reaction {
  id: string;
  emoji: string;
  senderId?: number;
}

export const useReactions = (socket: Socket | null, roomId: string) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-reaction", (reaction: Reaction) => {
      setReactions((prev) => [...prev, reaction]);

      setTimeout(() => {
        setReactions((prev) => prev.filter((r) => r.id !== reaction.id));
      }, 3000);
    });

    return () => {
      socket.off("receive-reaction");
    };
  }, [socket]);

  const sendReaction = useCallback(
    (emoji: string) => {
      if (!socket) return;

      const newReaction: Reaction = {
        id: Math.random().toString(36).substring(2, 9),
        emoji: emoji,
      };

      setReactions((prev) => [...prev, newReaction]);

      socket.emit("send-reaction", newReaction);

      setTimeout(() => {
        setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
      }, 3000);
    },
    [socket],
  );

  return { reactions, sendReaction };
};
