"use client";

import React, { useState } from 'react';
import { 
  Calendar, Clock, Search, Filter, 
  MoreHorizontal, Video, CheckCircle2, 
  XCircle, User, FileText, Phone
} from 'lucide-react';

// --- بيانات الحجوزات (Mock Data) ---
const initialAppointments = [
  { 
    id: 1, 
    patient: "Layla Mahmoud", 
    date: "Today, Feb 14", 
    time: "10:00 AM", 
    duration: "45 min",
    type: "Video Call", 
    status: "Confirmed", 
    img: "bg-purple-100 text-purple-600",
    notes: "Anxiety and stress management follow-up."
  },
  { 
    id: 2, 
    patient: "Omar Ali", 
    date: "Today, Feb 14", 
    time: "11:30 AM", 
    duration: "45 min",
    type: "Voice Call", 
    status: "Confirmed", 
    img: "bg-blue-100 text-blue-600",
    notes: "Initial consultation."
  },
  { 
    id: 3, 
    patient: "Sarah Jaber", 
    date: "Tomorrow, Feb 15", 
    time: "02:00 PM", 
    duration: "60 min",
    type: "Video Call", 
    status: "Pending", 
    img: "bg-emerald-100 text-emerald-600",
    notes: "Reviewing progress on sleep patterns."
  },
  { 
    id: 4, 
    patient: "Khaled Zaid", 
    date: "Feb 12, 2024", 
    time: "04:00 PM", 
    duration: "45 min",
    type: "Video Call", 
    status: "Completed", 
    img: "bg-orange-100 text-orange-600",
    notes: "Session completed successfully."
  },
   { 
    id: 5, 
    patient: "Muna Salem", 
    date: "Feb 10, 2024", 
    time: "09:00 AM", 
    duration: "45 min",
    type: "Video Call", 
    status: "No Show", 
    img: "bg-red-100 text-red-600",
    notes: "Patient did not attend."
  }
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState('Upcoming'); // Upcoming, History, All
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  // تصفية البيانات
  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'Upcoming') return ['Confirmed', 'Pending'].includes(apt.status);
    if (filter === 'History') return ['Completed', 'No Show', 'Cancelled'].includes(apt.status);
    return true; // All
  });

  // دالة تغيير الحالة (Mark as Completed / No Show)
  const updateStatus = (id: number, newStatus: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
    setOpenActionId(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-20" onClick={() => setOpenActionId(null)}>
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#352C5E] tracking-tight">Appointments</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Manage your sessions and patient history.</p>
        </div>
        
        {/* Tabs Filter */}
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            {['Upcoming', 'History', 'All'].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                        filter === tab 
                        ? 'bg-white text-[#352C5E] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {/* --- Appointments List --- */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
            <div 
                key={apt.id} 
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6 group"
            >
                {/* Time & Date Column */}
                <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-0 min-w-[120px] border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-6">
                    <h3 className="text-xl font-black text-[#352C5E]">{apt.time}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mt-1">
                        <Calendar size={12} />
                        <span>{apt.date}</span>
                    </div>
                </div>

                {/* Patient Info */}
                <div className="flex-1 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold ${apt.img}`}>
                        {apt.patient.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-[#352C5E] text-lg">{apt.patient}</h4>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">
                                {apt.type === 'Video Call' ? <Video size={12} /> : <Phone size={12} />}
                                {apt.type}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">
                                <Clock size={12} /> {apt.duration}
                            </span>
                        </div>
                        {apt.notes && (
                            <p className="text-xs text-gray-400 mt-2 line-clamp-1 flex items-center gap-1">
                                <FileText size={10} /> {apt.notes}
                            </p>
                        )}
                    </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50 w-full md:w-auto">
                    
                    {/* Status Badge */}
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5
                        ${apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 
                          apt.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                          apt.status === 'Completed' ? 'bg-blue-50 text-blue-600' :
                          'bg-red-50 text-red-500'
                        }`}>
                        {apt.status === 'Confirmed' && <CheckCircle2 size={14} />}
                        {apt.status}
                    </span>

                    {/* Action Buttons (Only for Confirmed/Pending) */}
                    {['Confirmed', 'Pending'].includes(apt.status) && (
                        <div className="flex items-center gap-2">
                            {/* Join Button (Primary Action) */}
                            {apt.status === 'Confirmed' && (
                                <button className="flex items-center gap-2 bg-[#352C5E] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20 active:scale-95">
                                    <Video size={14} />
                                    <span>Join Session</span>
                                </button>
                            )}

                            {/* More Options Menu */}
                            <div className="relative">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === apt.id ? null : apt.id); }}
                                    className="p-2.5 text-gray-400 hover:text-[#352C5E] hover:bg-gray-100 rounded-xl transition-all"
                                >
                                    <MoreHorizontal size={18} />
                                </button>
                                
                                {openActionId === apt.id && (
                                    <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 shadow-2xl rounded-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-200">
                                        <button className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] transition-colors">
                                            <User size={14} /> View Patient Profile
                                        </button>
                                        <div className="h-[1px] bg-gray-50 my-1 mx-2"></div>
                                        <button 
                                            onClick={() => updateStatus(apt.id, 'Completed')}
                                            className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors"
                                        >
                                            <CheckCircle2 size={14} /> Mark as Completed
                                        </button>
                                        <button 
                                            onClick={() => updateStatus(apt.id, 'No Show')}
                                            className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <XCircle size={14} /> Mark as No Show
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            ))
        ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Calendar size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-500">No appointments found</h3>
                <p className="text-sm text-gray-400 mt-1">Try changing the filter or check back later.</p>
            </div>
        )}
      </div>

    </div>
  );
}
