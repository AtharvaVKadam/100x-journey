"use client";

import VideoPlayer from "./VideoPlayer";

interface PreJoinLobbyProps {
  roomId: string;
  stream: MediaStream | null;
  isAudioMuted: boolean;
  isVideoOff: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  onJoin: () => void;
}

export default function PreJoinLobby({
  roomId,
  stream,
  isAudioMuted,
  isVideoOff,
  toggleAudio,
  toggleVideo,
  onJoin,
}: PreJoinLobbyProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        {/* Left Side: Camera Preview */}
        <div className="flex flex-col gap-4">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden border-2 border-gray-700 relative shadow-inner">
            <VideoPlayer stream={stream} isMuted={true} />

            {/* Overlay if video is off */}
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-3xl">
                  🚫📷
                </div>
              </div>
            )}
          </div>

          {/* Quick Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full transition-all shadow-lg ${isAudioMuted ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-600"}`}
              title={isAudioMuted ? "Unmute" : "Mute"}
            >
              {isAudioMuted ? "🔇" : "🎙️"}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full transition-all shadow-lg ${isVideoOff ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-600"}`}
              title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
            >
              {isVideoOff ? "🚫📷" : "📷"}
            </button>
          </div>
        </div>

        {/* Right Side: Meeting Details & Join */}
        <div className="flex flex-col justify-center space-y-6 px-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Ready to join?
            </h1>
            <p className="text-gray-400">You are joining secure room:</p>
            <div className="bg-gray-900 inline-block px-3 py-1 rounded-md text-indigo-400 font-mono mt-2 border border-gray-700">
              {roomId}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onJoin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
            >
              Join Meeting Now
            </button>
            <a
              href="/dashboard"
              className="block w-full text-center text-gray-400 hover:text-white py-3 transition-colors text-sm font-medium"
            >
              Cancel and return to dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
