import React from "react";

export const Appbar = () => {
  return (
    <div className="flex justify-between items-center p-3 bg-black sticky top-0 z-50">
      <div className="flex items-center cursor-pointer">
        <div className="text-white font-bold text-xl flex items-center gap-1">
          <span className="bg-red-600 px-2 py-0.5 rounded-lg text-white">▶</span>
          YouTube
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center">
        <div className="flex w-full bg-[#121212] border border-gray-700 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-white px-4 py-2 outline-none focus:border-blue-500"
          />
          <button className="bg-[#222222] px-5 border-l border-gray-700 hover:bg-[#333333]">
            🔍
          </button>
        </div>
        <div className="ml-4 p-2 bg-[#121212] rounded-full cursor-pointer hover:bg-gray-800 text-white">
          🎤
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="text-white text-xl cursor-pointer hover:bg-gray-800 p-2 rounded-full hidden sm:block">
          ➕
        </div>
        <div className="text-white text-xl cursor-pointer hover:bg-gray-800 p-2 rounded-full">
          🔔
        </div>
        <img
          src="favicon.ico"
          className="w-9 h-9 rounded-full cursor-pointer"
          alt="User Profile"
        />
      </div>
    </div>
  );
};