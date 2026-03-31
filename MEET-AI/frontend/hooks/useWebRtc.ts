import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";

export const useWebRTC = (
  socket: Socket | null,
  localStream: MediaStream | null,
) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!socket || !localStream) return;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peerConnection.current = pc;

    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) socket.emit("ice-candidate", event.candidate);
    };

    socket.on("user-connected", async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", offer);
    });

    socket.on("offer", async (offer) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", answer);
    });

    socket.on("answer", async (answer) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", async (candidate) => {
      if (candidate) await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      pc.close();
      socket.off("user-connected");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [socket, localStream]);

  return { remoteStream };
};
