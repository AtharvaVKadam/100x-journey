"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../src/lib/apiClient";

export default function CreateMeetingBtn() {
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleCreateMeeting = async () => {
    try {
      setIsGenerating(true);
      
      const response = await apiClient('/meetings', { method: 'POST' });
      const data = await response.json();
      
      router.push(`/room/${data.roomId}`);
      
    } catch (error) {
      console.error("Failed to start meeting", error);
      alert("Failed to connect to the server. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleCreateMeeting}
      disabled={isGenerating}
      className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white transition-all rounded-lg shadow-sm 
        ${isGenerating ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md active:scale-95"}
      `}
    >
      {isGenerating ? "Initializing AI..." : "+ Start New Meeting"}
    </button>
  );
}