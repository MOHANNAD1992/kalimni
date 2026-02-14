"use client";

import React from 'react';
import { 
  Users, Calendar, DollarSign, Clock, 
  ArrowUpRight, MoreHorizontal, Video, MapPin
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Mock Data: Monthly Earnings ---
const earningsData = [
  { name: 'Mon', amount: 120 },
  { name: 'Tue', amount: 250 },
  { name: 'Wed', amount: 180 },
  { name: 'Thu', amount: 320 },
  { name: 'Fri', amount: 450 },
  { name: 'Sat', amount: 300 },
  { name: 'Sun', amount: 200 },
];

// --- Mock Data: Upcoming Appointments ---
const upcomingAppointments = [
  { id: 1, patient: "Ahmad Sami", time: "10:00 AM", date: "Today", type: "Video Call", status: "Confirmed", img: "bg-blue-100 text-blue-600" },
  { id: 2, patient: "Layla Mahmoud", time: "11:30 AM", date: "Today", type: "Voice Call", status: "Pending", img: "bg-purple-100 text-purple-600" },
  { id: 3, patient: "Omar Ali", time: "02:00 PM", date: "Tomorrow", type: "Video Call", status: "Confirmed", img: "bg-emerald-100 text-emerald-600" },
];

export default function SpecialistDashboard() {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* --- Welcome Banner --- */}
      <div className="bg-[#352C5E] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-[#352C5E]/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E1AD48] rounded-full blur-[80px] opacity-20 -mr-16 -mt-16"></div>
        <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-2">Good Morning, Dr. Sarah! </h1>
            <p className="text-white/70 max-w-lg text-sm">You have <span className="text-[#E1AD48] font-bold">4 appointments</span> today. Your next session starts in 35 minutes.</p>
        </div>
      </div>

      {/* --- Quick Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value="1,240" icon={Users} color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="Appointments" value="84" icon={Calendar} color="text-purple-600" bg="bg-purple-50" />
        <StatCard title="Total Earnings" value="$3,450" icon={DollarSign} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard title="Hours Online" value="12h 30m" icon={Clock} color="text-[#E1AD48]" bg="bg-[#E1AD48]/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- Left: Earnings Chart --- */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#352C5E]">Weekly Earnings</h3>
                <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400">
                    <MoreHorizontal size={20} />
                </button>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData}>
                        <defs>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E1AD48" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#E1AD48" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(value) => `$${value}`} />                        
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="amount" stroke="#E1AD48" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* --- Right: Upcoming Schedule --- */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
            <h3 className="font-bold text-[#352C5E] mb-4">Upcoming Schedule</h3>
            
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#352C5E]/20 transition-all group">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${apt.img}`}>
                                    {apt.patient.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#352C5E] text-sm">{apt.patient}</h4>
                                    <p className="text-xs text-gray-500">{apt.type}</p>
                                </div>
                            </div>
                            <span className="bg-white text-[#352C5E] text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                {apt.time}
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                             <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Calendar size={12} />
                                <span>{apt.date}</span>
                             </div>
                             {apt.status === 'Confirmed' ? (
                                 <button className="flex items-center gap-1.5 bg-[#352C5E] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-[#2C2448] transition-colors">
                                     <Video size={12} /> Join
                                 </button>
                             ) : (
                                <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">Pending</span>
                             )}
                        </div>
                    </div>
                ))}
            </div>
            
            <button className="w-full mt-4 py-3 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">
                View Full Calendar
            </button>
        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---
function StatCard({ title, value, icon: Icon, color, bg }: any) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${bg} ${color}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{title}</p>
                <h3 className="text-xl font-black text-[#352C5E]">{value}</h3>
            </div>
        </div>
    );
}