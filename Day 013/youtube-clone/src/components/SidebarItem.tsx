import React from "react";

interface SidebarItemProps {
  icon: string;
  title: string;
  selected?: boolean;
}

export const SidebarItem = ({ icon, title, selected }: SidebarItemProps) => {
  return (
    <div className={`flex items-center gap-5 p-3 px-6 cursor-pointer rounded-xl hover:bg-[#272727] ${selected ? "bg-[#272727] font-bold" : ""}`}>
      <span className="text-xl text-white">{icon}</span>
      <span className="text-white text-sm">{title}</span>
    </div>
  );
};