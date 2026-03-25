"use client";

import { useState } from "react";

export default function CreateMeetingBtn() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateMeeting = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      const mockRoomId = Math.random().toString(36).substring(2, 9);
      alert(`MeetAI Room Created! ID: ${mockRoomId}\n\n(Backend routing coming soon!)`);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <button
      onClick={handleCreateMeeting}
      disabled={isGenerating}
      className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white transition-all rounded-lg shadow-sm 
        ${isGenerating ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md active:scale-95"}
      `}
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Initializing AI...
        </>
      ) : (
        "+ Start New Meeting"
      )}
    </button>
  );
}