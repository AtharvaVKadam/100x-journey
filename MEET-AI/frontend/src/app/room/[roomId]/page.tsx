"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useLocalStream } from "../../../../hooks/useLOcalStream";
import { useSocket } from "../../../../hooks/useSocket";
import { useWebRTC } from "../../../../hooks/useWebRtc";
import { useChat } from "../../../../hooks/useChat";
import VideoPlayer from "../../../../components/VideoPlayer";
import PreJoinLobby from "../../../../components/PreJoinLobby";

export default function MeetingRoom() {
  const { roomId } = useParams();
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [hasJoined, setHasJoined] = useState(false);

  const {
    localStream,
    isMediaLoading,
    isAudioMuted,
    isVideoOff,
    toggleAudio,
    toggleVideo,
  } = useLocalStream();
  const socket = useSocket(roomId as string, user?.id);
  const { remoteStream } = useWebRTC(socket, localStream);

  const { messages, sendMessage } = useChat(socket, roomId as string, user);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isAuthLoading && !user) router.push("/login");
  }, [user, isAuthLoading, router]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(chatInput);
    setChatInput("");
  };

  if (isAuthLoading || isMediaLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white animate-pulse">
        Initializing Secure Environment...
      </div>
    );

  if (!hasJoined) {
    return (
      <PreJoinLobby
        roomId={roomId as string}
        stream={localStream}
        isAudioMuted={isAudioMuted}
        isVideoOff={isVideoOff}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        onJoin={() => setHasJoined(true)}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl mb-4 border border-gray-700">
        <h1 className="text-xl font-bold tracking-tight">MeetAI Session</h1>
        <div className="text-sm text-gray-400">ID: {roomId}</div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <div
          className={`flex-1 grid gap-4 rounded-xl border border-gray-700 bg-black p-4 overflow-y-auto ${remoteStream ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} items-center`}
        >
          <div className="w-full max-w-4xl mx-auto aspect-video relative">
            <VideoPlayer stream={localStream} isMuted={true} />
          </div>
          {remoteStream && (
            <div className="w-full max-w-4xl mx-auto aspect-video relative">
              <VideoPlayer stream={remoteStream} isMuted={false} />
            </div>
          )}
        </div>

        <div className="w-80 bg-gray-800 rounded-xl border border-gray-700 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-700 font-semibold">
            Team Chat
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.senderId === user?.id ? "items-end" : "items-start"}`}
              >
                <span className="text-xs text-gray-400 mb-1">
                  {msg.senderName} • {msg.timestamp}
                </span>
                <div
                  className={`px-4 py-2 rounded-lg text-sm max-w-[90%] break-words ${msg.senderId === user?.id ? "bg-indigo-600" : "bg-gray-700"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-gray-700 bg-gray-800 flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="h-20 bg-gray-800 mt-4 rounded-xl border border-gray-700 flex items-center justify-center gap-6">
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full ${isAudioMuted ? "bg-red-500" : "bg-gray-700"}`}
        >
          {isAudioMuted ? "🔇" : "🎙️"}
        </button>
        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full ${isVideoOff ? "bg-red-500" : "bg-gray-700"}`}
        >
          {isVideoOff ? "🚫📷" : "📷"}
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-red-600 rounded-full font-medium"
        >
          Leave Call
        </button>
      </div>
    </div>
  );
}
