import { useState, useEffect } from 'react';

export const useLocalStream = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  useEffect(() => {
    let stream: MediaStream;

    const startMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        
        setLocalStream(stream);
        setIsMediaLoading(false);
      } catch (err) {
        console.error("Failed to get local stream", err);
        setError("Camera and microphone permission denied or unavailable.");
        setIsMediaLoading(false);
      }
    };

    startMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return { localStream, error, isMediaLoading };
};