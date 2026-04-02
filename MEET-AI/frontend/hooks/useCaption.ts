import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

export const useCaptions = (
  socket: Socket | null,
  isAudioMuted: boolean,
  userName: string,
) => {
  const [localCaption, setLocalCaption] = useState("");
  const [remoteCaption, setRemoteCaption] = useState("");

  useEffect(() => {
    if (socket) {
      socket.on("receive-caption", (data: { name: string; text: string }) => {
        setRemoteCaption(`${data.name}: ${data.text}`);
        // Clear remote caption after 3 seconds of silence
        setTimeout(() => setRemoteCaption(""), 3000);
      });
    }
    return () => {
      socket?.off("receive-caption");
    };
  }, [socket]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }

      setLocalCaption(currentTranscript);

      if (socket && event.results[event.results.length - 1].isFinal) {
        socket.emit("send-caption", {
          name: userName,
          text: currentTranscript,
        });
        setTimeout(() => setLocalCaption(""), 3000);
      }
    };

    if (!isAudioMuted) {
      try {
        recognition.start();
      } catch (e) {}
    } else {
      recognition.stop();
      setLocalCaption("");
    }

    return () => recognition.stop();
  }, [isAudioMuted, socket, userName]);

  return { localCaption, remoteCaption };
};
