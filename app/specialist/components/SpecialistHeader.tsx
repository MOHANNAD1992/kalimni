"use client";

import React, { useState } from 'react';
import { Bell, ChevronDown, Zap, Power, User } from 'lucide-react';

export default function SpecialistHeader() {
  // حالات التحكم الخاصة بالأخصائي (محاكاة للبيانات)
  const [isInstantActive, setIsInstantActive] = useState(false);
  const [isOnLeave, setIsOnLeave] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      
      {/* --- Left: Page Title --- */}
      <div className="flex flex-col text-left">
        <h2 className="text-xl font-bold text-[#352C5E] tracking-tight">Dr. Dashboard</h2>
        <p className="text-xs text-gray-400 font-medium">Manage your availability & sessions</p>
      </div>

      {/* --- Center: Quick Status Controls (Specialist Features) --- */}
      <div className="hidden lg:flex items-center gap-4 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
        
        {/* 1. Instant Session Toggle  */}
        <button 
            onClick={() => setIsInstantActive(!isInstantActive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                isInstantActive 
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
        >
            <Zap size={14} fill={isInstantActive ? "currentColor" : "none"} />
            {isInstantActive ? 'Instant: ONLINE' : 'Instant: OFFLINE'}
        </button>

        <div className="w-[1px] h-6 bg-gray-200"></div>

        {/* 2. On Leave Toggle  */}
        <button 
            onClick={() => setIsOnLeave(!isOnLeave)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                isOnLeave 
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
        >
            <Power size={14} />
            {isOnLeave ? 'Status: ON LEAVE' : 'Status: AVAILABLE'}
        </button>

      </div>

      {/* --- Right: Profile & Actions --- */}
      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <button className="p-2.5 rounded-full text-gray-400 hover:text-[#352C5E] hover:bg-gray-50 transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3 cursor-pointer group pl-4 border-l border-gray-100">
            <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#352C5E]">Dr. Sarah Ahmed</p>
                <p className="text-[10px] text-gray-400 font-bold">Mental Health</p>
            </div>
            
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1AD48] to-[#F3C874] flex items-center justify-center text-[#352C5E] shadow-md border-2 border-white">
                <span className="font-bold text-sm">DS</span>
            </div>
            
            <ChevronDown size={16} className="text-gray-400 group-hover:text-[#352C5E] transition-colors" />
        </div>

      </div>
    </header>
  );
}