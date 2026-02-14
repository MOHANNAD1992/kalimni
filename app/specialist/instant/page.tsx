"use client";

import React, { useState, useEffect } from 'react';
import { 
  Zap, Power, Video, DollarSign,
  Activity, ShieldCheck, TrendingUp,
  MapPin, Radio, Wifi, Camera, Mic, 
  History, CheckCircle2, AlertTriangle
} from 'lucide-react';

export default function InstantSessionsPage() {
  const [isOnline, setIsOnline] = useState(false);
  const [incomingRequest, setIncomingRequest] = useState<any | null>(null);

  // محاكاة وصول طلب مكالمة
  useEffect(() => {
    let timeout: any;
    if (isOnline && !incomingRequest) {
      timeout = setTimeout(() => {
        setIncomingRequest({
          id: 992,
          patient: "Fahad Al-Qahtani",
          type: "Priority Instant Video",
          avatar: "FQ",
          location: "Dubai, UAE",
          amount: "$45.00"
        });
      }, 5000);
    } else if (!isOnline) {
      setIncomingRequest(null);
    }
    return () => clearTimeout(timeout);
  }, [isOnline, incomingRequest]);

  return (
    <div className="space-y-8 animate-fadeIn pb-20 max-w-[1600px] mx-auto">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#E1AD48] rounded-2xl shadow-lg shadow-[#E1AD48]/20 text-[#352C5E]">
                <Zap fill="currentColor" size={22} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-[#352C5E] tracking-tight">Dispatch Terminal</h1>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">System Status: {isOnline ? 'Active' : 'Standby'}</p>
            </div>
          </div>
        </div>

        {/* System Diagnostics */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <StatusIcon icon={Wifi} color="text-emerald-500" />
            <StatusIcon icon={Camera} color="text-[#7D65CC]" />
            <StatusIcon icon={Mic} color="text-[#E1AD48]" />
            <div className="w-px h-8 bg-gray-100 mx-2"></div>
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 transition-all duration-500 ${isOnline ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
        </div>
      </div>

      {/* --- Main Grid --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT: Central Control Unit (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
            <div className={`relative flex-1 rounded-[48px] p-12 transition-all duration-1000 min-h-[500px] flex flex-col items-center justify-center border-t border-white/20 shadow-2xl overflow-hidden
                ${isOnline ? 'bg-white' : 'bg-[#352C5E]'}`}>
                
                {/* Visual Feedback for Discovery */}
                {isOnline && !incomingRequest && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="absolute w-[400px] h-[400px] border border-emerald-100 rounded-full animate-ping opacity-40"></div>
                        <div className="absolute w-[600px] h-[600px] border border-emerald-50 rounded-full animate-ping opacity-20 delay-500"></div>
                    </div>
                )}

                {incomingRequest ? (
                    /* --- CALL HUB --- */
                    <div className="relative z-30 w-full max-w-lg animate-in zoom-in-95 duration-500">
                        <div className="bg-[#1A162E] rounded-[40px] p-10 border border-white/10 shadow-2xl text-center">
                            <div className="w-32 h-32 bg-[#E1AD48] rounded-full mx-auto flex items-center justify-center text-4xl font-black text-[#352C5E] mb-6 shadow-xl border-4 border-white/10">
                                {incomingRequest.avatar}
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2">{incomingRequest.patient}</h3>
                            <div className="flex items-center justify-center gap-4 text-white/40 text-xs font-bold mb-10">
                                <span className="flex items-center gap-1"><MapPin size={12} /> {incomingRequest.location}</span>
                                <span className="flex items-center gap-1 text-[#E1AD48]"><DollarSign size={12} /> {incomingRequest.amount} Paid</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => setIncomingRequest(null)} className="py-4 rounded-2xl font-black text-white/30 hover:bg-white/5 border border-white/10 transition-all">Decline</button>
                                <button className="py-4 rounded-2xl font-black text-[#352C5E] bg-[#E1AD48] hover:bg-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                                    <Video size={20} fill="currentColor" /> Accept
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* --- STATUS CONTROLS --- */
                    <div className="relative z-10 text-center">
                        <div className={`w-36 h-36 rounded-full mx-auto flex items-center justify-center mb-10 transition-all duration-700
                            ${isOnline ? 'bg-emerald-50 text-emerald-500' : 'bg-white/5 text-white/10'}`}>
                            <Power size={70} strokeWidth={2.5} className={isOnline ? 'animate-pulse' : ''} />
                        </div>
                        <h2 className={`text-4xl font-black tracking-tight mb-4 transition-all ${isOnline ? 'text-[#352C5E]' : 'text-white'}`}>
                            {isOnline ? 'Waiting for Patients' : 'System Offline'}
                        </h2>
                        <p className={`text-sm max-w-xs mx-auto font-bold mb-10 ${isOnline ? 'text-gray-400' : 'text-white/30'}`}>
                            {isOnline ? 'Discovery mode is active. You will be alerted for any incoming session.' : 'Switch online to become visible for instant bookings.'}
                        </p>
                        <button 
                            onClick={() => setIsOnline(!isOnline)}
                            className={`px-16 py-5 rounded-[24px] font-black text-xl transition-all shadow-2xl active:scale-95 border-b-[8px]
                            ${isOnline 
                                ? 'bg-white text-rose-500 border-rose-100 hover:bg-rose-50' 
                                : 'bg-[#E1AD48] text-[#352C5E] border-[#c49235] hover:bg-white hover:border-white'}`}>
                            {isOnline ? 'Go Offline' : 'Go Live Now'}
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Actions Row - Perfectly Aligned */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 hover:border-[#7D65CC]/30 transition-all group cursor-pointer shadow-sm">
                    <div className="p-3 bg-[#7D65CC]/10 text-[#7D65CC] rounded-xl group-hover:bg-[#7D65CC] group-hover:text-white transition-all"><History size={20} /></div>
                    <div className="text-left"><h4 className="text-sm font-black text-[#352C5E]">Session Logs</h4><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">History</p></div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 hover:border-emerald-500/30 transition-all group cursor-pointer shadow-sm">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all"><Activity size={20} /></div>
                    <div className="text-left"><h4 className="text-sm font-black text-[#352C5E]">Performance</h4><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Analytics</p></div>
                </div>
            </div>
        </div>

        {/* RIGHT: Stats & Metrics Column (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
            
            {/* Earnings Card */}
            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2"><TrendingUp size={14} /> Revenue Center</h4>
                    <div className="flex items-end gap-2 mb-8">
                        <span className="text-6xl font-black text-[#352C5E] tracking-tighter">$320</span>
                        <span className="text-gray-300 font-bold mb-2 text-xs uppercase">Today</span>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                        <span className="text-[10px] font-black text-gray-400 uppercase">Sessions</span>
                        <span className="text-xl font-black text-[#352C5E]">7 Calls</span>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                        <span className="text-[10px] font-black text-gray-400 uppercase">Satisfaction</span>
                        <span className="text-xl font-black text-[#352C5E]">100%</span>
                    </div>
                </div>
            </div>

            {/* Protocol Card */}
            <div className="bg-[#352C5E] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E1AD48] rounded-full blur-[60px] opacity-10 -mr-16 -mt-16"></div>
                <h4 className="text-lg font-black mb-6 flex items-center gap-2 text-[#E1AD48]">
                    <ShieldCheck size={20} /> Live Protocol
                </h4>
                <div className="space-y-4">
                    <div className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#E1AD48] mt-1.5 shrink-0"></div><p className="text-xs font-bold text-white/60">Payment is secured before call connects.</p></div>
                    <div className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#E1AD48] mt-1.5 shrink-0"></div><p className="text-xs font-bold text-white/60">Minimum session duration is 15 mins.</p></div>
                </div>
            </div>

            {/* Support Note */}
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[32px] flex items-start gap-4 shadow-sm">
                <AlertTriangle size={24} className="text-amber-500 shrink-0" />
                <p className="text-[11px] text-amber-800 font-black leading-relaxed">
                    Technical issues? Contact Admin Support immediately for live session assistance.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

// --- Internal Helpers ---
function StatusIcon({ icon: Icon, color }: any) {
    return (
        <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 ${color}`}>
            <Icon size={16} strokeWidth={3} />
        </div>
    );
}