"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, Search, ChevronDown, Mail, User, 
  Settings, LogOut, ShieldCheck, CheckCircle2 
} from 'lucide-react';

export default function AdminHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  // مراجع للإغلاق عند الضغط خارج المنيو
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      
      {/* --- Left Section --- */}
      <div className="flex flex-col text-left">
        <h2 className="text-xl font-bold text-[#352C5E] tracking-tight">Dashboard</h2>
        <p className="text-xs text-gray-400 font-medium">Welcome back, Super Admin</p>
      </div>

      {/* --- Right Section --- */}
      <div className="flex items-center gap-6">
        
        {/* 1. Search Bar */}
        <div className="hidden md:flex items-center relative group">
          <Search size={18} className="absolute left-3 text-gray-400 group-focus-within:text-[#7D65CC] transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-full text-sm text-gray-700 placeholder-gray-400 focus:bg-white focus:border-[#7D65CC]/30 focus:ring-4 focus:ring-[#7D65CC]/10 focus:outline-none transition-all w-64 lg:w-80"
          />
        </div>

        {/* 2. Action Icons */}
        <div className="flex items-center gap-2 border-r border-gray-200 pr-6 mr-2">
            
            {/* Messages */}
            <button className="p-2.5 rounded-full text-gray-400 hover:text-[#352C5E] hover:bg-gray-50 transition-all relative">
                <Mail size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#E1AD48] rounded-full border border-white"></span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
                <button 
                    onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                    className={`p-2.5 rounded-full transition-all relative group ${isNotifOpen ? 'bg-gray-50 text-[#352C5E]' : 'text-gray-400 hover:text-[#352C5E] hover:bg-gray-50'}`}
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
                    <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75"></span>
                </button>

                {isNotifOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="text-sm font-bold text-[#352C5E]">Notifications</h3>
                            <span className="text-[10px] bg-[#352C5E] text-white px-2 py-0.5 rounded-full">2 New</span>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            <div className="p-4 hover:bg-gray-50 border-b border-gray-50 flex gap-3 cursor-pointer transition-colors">
                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                                    <CheckCircle2 size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-700 leading-tight">New Specialist Approved</p>
                                    <p className="text-[10px] text-gray-400 mt-1">Dr. Ahmad has been verified.</p>
                                </div>
                            </div>
                            <div className="p-4 hover:bg-gray-50 flex gap-3 cursor-pointer transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                    <User size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-700 leading-tight">New User Registration</p>
                                    <p className="text-[10px] text-gray-400 mt-1">A new user joined the platform.</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-3 text-center text-[11px] font-bold text-[#7D65CC] hover:bg-gray-50 border-t border-gray-50">View All Notifications</button>
                    </div>
                )}
            </div>
        </div>

        {/* 3. User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
            <div 
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-gray-50 transition-all"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#352C5E] to-[#514389] flex items-center justify-center text-white shadow-md border-2 border-white ring-2 ring-gray-100 transition-transform group-active:scale-95">
                    <span className="font-bold text-sm">SA</span>
                </div>
                
                <div className="hidden md:block text-left">
                    <p className="text-sm font-bold text-[#352C5E] transition-colors">Admin User</p>
                    <div className="flex items-center gap-1 bg-[#E1AD48]/10 px-1.5 py-0.5 rounded mt-0.5">
                        <ShieldCheck size={10} className="text-[#E1AD48]" />
                        <span className="text-[9px] font-bold text-[#E1AD48] uppercase tracking-wider">Super Admin</span>
                    </div>
                </div>

                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-[#352C5E]' : ''}`} />
            </div>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] rounded-xl transition-all">
                        <User size={16} /> My Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] rounded-xl transition-all">
                        <Settings size={16} /> Settings
                    </button>
                    <div className="h-[1px] bg-gray-100 my-1 mx-2"></div>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <LogOut size={16} /> Log Out
                    </button>
                </div>
            )}
        </div>

      </div>
    </header>
  );
}