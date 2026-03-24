"use client";

import { useAuth } from "../src/context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>;
  }

  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col text-right">
        <span className="text-sm font-semibold text-gray-900">
          {user.username || "MeetAI User"}
        </span>
        <span className="text-xs text-gray-500">{user.email}</span>
      </div>
      
      <button 
        onClick={logout}
        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors border border-red-100"
      >
        Sign Out
      </button>
    </div>
  );
}