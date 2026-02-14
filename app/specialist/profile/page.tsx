"use client";

import React, { useState } from 'react';
import { 
  User, Mail, Phone, Camera, Save, Lock, 
  ShieldCheck, Power, Package, CheckCircle2, 
  Award, ChevronRight, Briefcase, BellRing
} from 'lucide-react';

export default function ProfilePage() {
  // حالة التحكم في وضع الإجازة (On Leave)
  const [isOnLeave, setIsOnLeave] = useState(false);

  return (
    <div className="space-y-10 animate-fadeIn pb-24 max-w-[1600px] mx-auto text-left">
      
      {/* --- Header Section: Deep & Bold --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b-2 border-gray-100 pb-10">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-[#352C5E] tracking-tight">Professional Settings</h1>
          <p className="text-gray-500 text-base font-bold">Refine your public identity and account preferences.</p>
        </div>
        <button className="flex items-center gap-3 bg-[#352C5E] text-white px-10 py-4 rounded-[20px] text-sm font-black hover:bg-[#2C2448] transition-all shadow-2xl shadow-[#352C5E]/30 active:scale-95">
          <Save size={20} />
          <span>Save Profile</span>
        </button>
      </div>

      {/* --- Main Grid System --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT SIDE: Identity & Experience (8 Columns) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          
          {/* Main Profile Card */}
          <div className="bg-white rounded-[48px] border border-gray-100 shadow-xl overflow-hidden flex-1 flex flex-col">
            <div className="p-10 md:p-14 flex flex-col md:flex-row gap-12 items-start flex-1">
              
              {/* Avatar Hub */}
              <div className="relative shrink-0 mx-auto md:mx-0 group">
                <div className="w-44 h-44 rounded-[56px] bg-[#352C5E] flex items-center justify-center text-6xl font-black text-[#E1AD48] border-8 border-gray-50 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                   DS
                </div>
                <button className="absolute -bottom-2 -right-2 p-4 bg-[#E1AD48] text-[#352C5E] rounded-3xl shadow-2xl border-4 border-white hover:bg-white transition-all">
                  <Camera size={22} strokeWidth={3} />
                </button>
              </div>

              {/* Information Engine */}
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProfileField label="Full Name" value="Dr. Sarah Ahmed" icon={User} />
                <ProfileField label="Specialization" value="Mental Health Expert" icon={Award} />
                <ProfileField label="Official Email" value="sarah.a@kalimni.com" icon={Mail} />
                <ProfileField label="Phone Contact" value="+962 79 000 0000" icon={Phone} />
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-[#352C5E] uppercase tracking-[0.2em] mb-4">Professional Biography</label>
                  <textarea 
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-[32px] p-6 text-sm font-bold text-[#352C5E] focus:bg-white focus:border-[#E1AD48] outline-none transition-all h-40 resize-none shadow-inner"
                    placeholder="Describe your journey and clinical expertise..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Action Bar */}
          <div className="bg-[#F8F9FC] rounded-[32px] border-2 border-white p-8 flex items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-5">
               <div className="p-4 bg-white text-[#7D65CC] rounded-2xl shadow-sm"><Lock size={24} /></div>
               <div>
                  <h4 className="text-lg font-black text-[#352C5E]">Access & Security</h4>
                  <p className="text-xs font-bold text-gray-400">Regularly update your password for safety.</p>
               </div>
            </div>
            <button className="px-8 py-3 bg-[#352C5E] text-white rounded-2xl text-xs font-black hover:shadow-lg transition-all">Update Password</button>
          </div>
        </div>

        {/* RIGHT SIDE: Availability & Packages (4 Columns) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          
          {/* Presence Controller */}
          <div className={`p-10 rounded-[48px] border-t-8 transition-all duration-700 flex flex-col justify-between shadow-2xl min-h-[300px]
            ${isOnLeave ? 'bg-[#1A162E] border-rose-500 text-white' : 'bg-white border-[#E1AD48] text-[#352C5E]'}`}>
            
            <div className="flex justify-between items-start">
              <div className={`p-4 rounded-2xl ${isOnLeave ? 'bg-rose-500 text-white' : 'bg-[#E1AD48] text-[#352C5E] shadow-lg shadow-[#E1AD48]/20'}`}>
                <Power size={32} strokeWidth={3} />
              </div>
              <label className="relative inline-flex items-center cursor-pointer scale-125">
                <input type="checkbox" className="sr-only peer" checked={isOnLeave} onChange={() => setIsOnLeave(!isOnLeave)} />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E1AD48]"></div>
              </label>
            </div>

            <div>
              <h3 className="text-3xl font-black tracking-tight mb-3">{isOnLeave ? 'On Leave' : 'Online'}</h3>
              <p className={`text-xs font-bold leading-relaxed ${isOnLeave ? 'text-white/40' : 'text-gray-400'}`}>
                {isOnLeave 
                  ? 'Your profile is currently hidden from search results.' 
                  : 'You are now visible to clients for new bookings and instant calls.'}
              </p>
            </div>
          </div>

          {/* Active Offerings Card */}
          <div className="bg-white rounded-[48px] border border-gray-100 shadow-xl p-10 flex-1 flex flex-col">
            <h4 className="text-xs font-black text-[#352C5E] uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <Package size={20} className="text-[#E1AD48]" /> Service Packages
            </h4>

            <div className="space-y-4 flex-1">
               <PackageRow name="Discovery" sessions="01 Session" color="bg-blue-50 text-blue-600" />
               <PackageRow name="Standard" sessions="05 Sessions" color="bg-[#7D65CC]/10 text-[#7D65CC]" />
               <PackageRow name="Premium" sessions="12 Sessions" color="bg-emerald-50 text-emerald-600" />
            </div>

            <div className="mt-10 pt-8 border-t border-gray-50 text-center">
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Authorized by Admin</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- High-Contrast Components ---

function ProfileField({ label, value, icon: Icon }: any) {
  return (
    <div className="text-left group">
      <label className="block text-xs font-black text-[#352C5E] uppercase tracking-widest mb-3 opacity-60">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#E1AD48]">
          <Icon size={20} strokeWidth={3} />
        </div>
        <input 
          type="text" 
          defaultValue={value}
          className="w-full bg-gray-50 border-2 border-gray-50 rounded-[24px] py-4 pl-14 pr-6 text-sm font-black text-[#352C5E] focus:bg-white focus:border-[#352C5E] outline-none transition-all shadow-sm"
        />
      </div>
    </div>
  );
}

function PackageRow({ name, sessions, color }: { name: string, sessions: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[24px] border-2 border-transparent hover:border-[#352C5E] transition-all cursor-default group">
      <div className="flex items-center gap-4">
        <div className={`w-3 h-3 rounded-full ${color.split(' ')[1].replace('text-', 'bg-')}`}></div>
        <span className="text-sm font-black text-[#352C5E]">{name}</span>
      </div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase ${color}`}>
        {sessions}
      </span>
    </div>
  );
}