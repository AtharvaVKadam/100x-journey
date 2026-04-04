import { useState, useCallback } from "react";

export const useScreenShare = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const toggleScreenShare = useCallback(async () => {
    if (isSharing && screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
      setIsSharing(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "monitor",
        },
        audio: false,
      });

      stream.getVideoTracks()[0].onended = () => {
        setIsSharing(false);
        setScreenStream(null);
      };

      setScreenStream(stream);
      setIsSharing(true);
    } catch (error) {
      console.error("Screen sharing was denied or failed:", error);
      setIsSharing(false);
    }
  }, [isSharing, screenStream]);

  return { isSharing, screenStream, toggleScreenShare };
};
