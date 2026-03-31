"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useLocalStream } from "../../../../hooks/useLOcalStream";
import { useSocket } from "../../../../hooks/useSocket";
import { useWebRTC } from "../../../../hooks/useWebRtc";
import VideoPlayer from "../../../../components/VideoPlayer";

export default function MeetingRoom() {
  const { roomId } = useParams();
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const {
    localStream,
    isMediaLoading,
    isAudioMuted,
    isVideoOff,
    toggleAudio,
    toggleVideo,
  } = useLocalStream();
  const socket = useSocket(roomId as string, user?.id);
  const { remoteStream } = useWebRTC(socket, localStream); // NEW HOOK
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) router.push("/login");
  }, [user, isAuthLoading, router]);

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isAuthLoading || isMediaLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white animate-pulse">
        Initializing Secure Environment...
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl mb-4 shadow-lg border border-gray-700">
        <div>
          <h1 className="text-xl font-bold tracking-tight">MeetAI Session</h1>
        </div>
        <button
          onClick={handleCopyInvite}
          className="text-sm bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors"
        >
          {copied ? "✓ Copied" : "🔗 Copy Invite Link"}
        </button>
      </div>

      <div
        className={`flex-1 grid gap-4 p-4 rounded-xl border border-gray-700 bg-black ${remoteStream ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} items-center justify-center`}
      >
        <div className="w-full max-w-4xl mx-auto aspect-video relative">
          <VideoPlayer stream={localStream} isMuted={true} />
        </div>

        {remoteStream && (
          <div className="w-full max-w-4xl mx-auto aspect-video relative">
            <VideoPlayer stream={remoteStream} isMuted={false} />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-sm text-white font-medium">
              Remote Peer
            </div>
          </div>
        )}
      </div>

      <div className="h-20 bg-gray-800 mt-4 rounded-xl shadow-lg border border-gray-700 flex items-center justify-center gap-6">
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full transition-colors ${isAudioMuted ? "bg-red-500" : "bg-gray-700"}`}
        >
          {isAudioMuted ? "🔇" : "🎙️"}
        </button>
        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full transition-colors ${isVideoOff ? "bg-red-500" : "bg-gray-700"}`}
        >
          {isVideoOff ? "🚫📷" : "📷"}
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-medium"
        >
          Leave Call
        </button>
      </div>
    </div>
  );
}
