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

      <div className="h-20 bg-gray-800 mt-4 rounded-xl shadow-lg flex items-center justify-center gap-6">
        <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
          </svg>
        </button>
        <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </button>
        <button 
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-medium transition-colors shadow-lg shadow-red-500/30"
        >
          Leave Call
        </button>
      </div>
    </div>
  );
}