"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useLocalStream } from "../../../../hooks/useLOcalStream";
import { useSocket } from "../../../../hooks/useSocket";
import { useWebRTC } from "../../../../hooks/useWebRtc";
import { useChat } from "../../../../hooks/useChat";
import { useScreenShare } from "../../../../hooks/useScreenShare";
import { useReactions } from "../../../../hooks/useReactions";
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

  const { isSharing, screenStream, toggleScreenShare } = useScreenShare();

  const { reactions, sendReaction } = useReactions(socket, roomId as string);
  const [showReactionMenu, setShowReactionMenu] = useState(false);
  const AVAILABLE_EMOJIS = ["👍", "❤️", "😂", "😮", "👏", "🎉"];

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
        {/* 🟢 UPDATED: Video Grid (Handles Screen Share & Relative Positioning for Emojis) */}
        <div
          className={`flex-1 relative grid gap-4 rounded-xl border border-gray-700 bg-black p-4 overflow-y-auto ${
            remoteStream || screenStream
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1"
          } items-center`}
        >
          {/* 🟢 DAY 67: Floating Reactions Overlay */}
          <div className="absolute bottom-10 left-10 z-50 pointer-events-none flex gap-2">
            {reactions.map((reaction) => (
              <div
                key={reaction.id}
                className="text-4xl animate-bounce"
                style={{ animationDuration: "1.5s" }}
              >
                {reaction.emoji}
              </div>
            ))}
          </div>

          {/* Local User */}
          <div className="w-full max-w-4xl mx-auto aspect-video relative">
            <VideoPlayer stream={localStream} isMuted={true} />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs text-white font-medium">
              You
            </div>
          </div>

          {/* 🟢 DAY 66: Local Screen Share */}
          {screenStream && (
            <div className="w-full max-w-4xl mx-auto aspect-video relative border-2 border-indigo-500 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <VideoPlayer stream={screenStream} isMuted={true} />
              <div className="absolute top-4 left-4 bg-indigo-600 px-3 py-1 rounded-md text-xs text-white font-medium animate-pulse">
                Presenting
              </div>
            </div>
          )}

          {/* Remote User */}
          {remoteStream && (
            <div className="w-full max-w-4xl mx-auto aspect-video relative">
              <VideoPlayer stream={remoteStream} isMuted={false} />
            </div>
          )}
        </div>

        {/* Chat Sidebar */}
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

      {/* 🟢 UPDATED: Bottom Controls */}
      <div className="h-20 bg-gray-800 mt-4 rounded-xl border border-gray-700 flex items-center justify-center gap-4 relative">
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full ${isAudioMuted ? "bg-red-500" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          {isAudioMuted ? "🔇" : "🎙️"}
        </button>
        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full ${isVideoOff ? "bg-red-500" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          {isVideoOff ? "🚫📷" : "📷"}
        </button>

        {/* 🟢 DAY 66: Screen Share Button */}
        <button
          onClick={toggleScreenShare}
          className={`px-6 py-3 rounded-full font-medium transition-all shadow-lg flex items-center gap-2 ${isSharing ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          {isSharing ? "Stop Sharing" : "💻 Share"}
        </button>

        {/* 🟢 DAY 67: Reaction Menu Button */}
        <div className="relative">
          {showReactionMenu && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-gray-700 p-2 rounded-full shadow-lg flex gap-2 border border-gray-600">
              {AVAILABLE_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    sendReaction(emoji);
                    setShowReactionMenu(false);
                  }}
                  className="text-2xl hover:scale-125 transition-transform p-2"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setShowReactionMenu(!showReactionMenu)}
            className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            ✨
          </button>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-medium ml-4"
        >
          Leave Call
        </button>
      </div>
    </div>
  );
}
