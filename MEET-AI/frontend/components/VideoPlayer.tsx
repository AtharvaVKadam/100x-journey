"use client";

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  stream: MediaStream | null;
  isMuted?: boolean;
}

export default function VideoPlayer({ stream, isMuted = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMuted} 
        className="w-full h-full object-cover mirror" 
      />
      
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-sm text-white font-medium">
        You (Local)
      </div>
    </div>
  );
}