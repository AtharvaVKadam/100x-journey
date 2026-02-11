import React from "react";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="w-72 hidden lg:block h-screen sticky top-14 bg-black overflow-y-auto pb-20">
      <div className="flex flex-col gap-1 p-2">
        <SidebarItem icon="🏠" title="Home" selected={true} />
        <SidebarItem icon="🎬" title="Shorts" />
        <SidebarItem icon="📺" title="Subscriptions" />
      </div>
      
      <hr className="border-gray-800 my-3 mx-4" />
      
      <div className="flex flex-col gap-1 p-2">
        <div className="text-white px-6 py-2 font-semibold">You ›</div>
        <SidebarItem icon="👤" title="Your channel" />
        <SidebarItem icon="📜" title="History" />
        <SidebarItem icon="⌚" title="Watch later" />
      </div>
    </div>
  );
};