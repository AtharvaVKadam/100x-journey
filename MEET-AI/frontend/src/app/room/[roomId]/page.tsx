"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function MeetingRoom() {
  const { roomId } = useParams();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (user) {
      setTimeout(() => setIsJoining(false), 1500);
    }
  }, [user, isLoading, router]);

  if (isJoining || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Connecting to secure room {roomId}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl mb-4 shadow-lg">
        <div>
          <h1 className="text-xl font-bold tracking-tight">MeetAI Session</h1>
          <p className="text-sm text-gray-400">Room ID: {roomId}</p>
        </div>
        <div className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
          Recording Active
        </div>
      </div>

      <div className="flex-1 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Video Grid Area</p>
      </div>
    </div>
  );
}