"use client";

import React, { useState } from 'react';
import { 
  Clock, Save, Plus, Trash2, 
  AlertCircle, Check, Copy, Power 
} from 'lucide-react';

// --- توليد قائمة الأوقات (كل 30 دقيقة) ---
const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : i;
    times.push(`${hour}:00`);
    times.push(`${hour}:30`);
  }
  return times;
};

const TIME_OPTIONS = generateTimeOptions();

export default function SchedulePage() {
  
  // الحالة الأولية للجدول
  const [schedule, setSchedule] = useState([
    { day: 'Sunday', active: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'Monday', active: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'Tuesday', active: true, slots: [{ start: '09:00', end: '14:00' }, { start: '16:00', end: '20:00' }] },
    { day: 'Wednesday', active: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'Thursday', active: true, slots: [{ start: '09:00', end: '15:00' }] },
    { day: 'Friday', active: false, slots: [] },
    { day: 'Saturday', active: false, slots: [] },
  ]);

  // تفعيل/تعطيل اليوم
  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].active = !newSchedule[index].active;
    if (newSchedule[index].active && newSchedule[index].slots.length === 0) {
        newSchedule[index].slots.push({ start: '09:00', end: '17:00' });
    }
    setSchedule(newSchedule);
  };

  // إضافة فترة (Shift) جديدة
  const addSlot = (index: number) => {
    const newSchedule = [...schedule];
    // إضافة فترة افتراضية ذكية (بعد آخر فترة إن وجدت)
    newSchedule[index].slots.push({ start: '12:00', end: '13:00' });
    setSchedule(newSchedule);
  };

  // حذف فترة
  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.splice(slotIndex, 1);
    // إذا حذف كل الفترات، نعطل اليوم تلقائياً
    if (newSchedule[dayIndex].slots.length === 0) {
        newSchedule[dayIndex].active = false;
    }
    setSchedule(newSchedule);
  };

  // تحديث الوقت
  const updateTime = (dayIndex: number, slotIndex: number, field: 'start' | 'end', value: string) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots[slotIndex] = { 
      ...newSchedule[dayIndex].slots[slotIndex], 
      [field]: value 
    };
    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#352C5E] tracking-tight">Working Hours</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Configure your weekly availability for patient bookings.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-4 py-2.5 rounded-xl font-bold">
                <AlertCircle size={16} />
                <span>All times are in GMT+03:00 (Amman)</span>
            </div>
            <button className="flex items-center gap-2 bg-[#352C5E] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20 active:scale-95">
                <Save size={18} />
                <span>Save Schedule</span>
            </button>
        </div>
      </div>

      {/* --- Schedule Cards Grid --- */}
      <div className="grid grid-cols-1 gap-4">
        {schedule.map((item, dayIndex) => (
            <div 
                key={item.day} 
                className={`relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden group
                ${item.active 
                    ? 'border-gray-200 shadow-sm hover:shadow-md' 
                    : 'border-gray-100 bg-gray-50/50 opacity-80'}`}
            >
                {/* Active Indicator Strip */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${item.active ? 'bg-[#E1AD48]' : 'bg-gray-200'}`}></div>

                <div className="p-5 flex flex-col md:flex-row md:items-start gap-6 ml-2">
                    
                    {/* 1. Day & Toggle Section */}
                    <div className="w-40 pt-2 flex flex-row md:flex-col items-center md:items-start justify-between gap-2 shrink-0">
                        <span className={`text-lg font-bold ${item.active ? 'text-[#352C5E]' : 'text-gray-400'}`}>
                            {item.day}
                        </span>
                        
                        <button 
                            onClick={() => toggleDay(dayIndex)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                            ${item.active 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                        >
                            <Power size={12} strokeWidth={3} />
                            {item.active ? 'Active' : 'Day Off'}
                        </button>
                    </div>

                    {/* 2. Time Slots Section */}
                    <div className="flex-1 space-y-3">
                        {item.active ? (
                            <>
                                {item.slots.map((slot, slotIndex) => (
                                    <div key={slotIndex} className="flex flex-wrap items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
                                        
                                        {/* Time Range Selector */}
                                        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200 hover:border-[#7D65CC]/30 transition-colors group-focus-within:border-[#7D65CC]">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">From</span>
                                                <div className="relative">
                                                    <select 
                                                        value={slot.start} 
                                                        onChange={(e) => updateTime(dayIndex, slotIndex, 'start', e.target.value)}
                                                        className="appearance-none bg-white border border-gray-200 text-[#352C5E] text-sm font-bold rounded-lg py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#7D65CC] cursor-pointer"
                                                    >
                                                        {TIME_OPTIONS.map((time) => (
                                                            <option key={time} value={time}>{time}</option>
                                                        ))}
                                                    </select>
                                                    <Clock size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>

                                            <span className="text-gray-300 font-light">|</span>

                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">To</span>
                                                <div className="relative">
                                                    <select 
                                                        value={slot.end} 
                                                        onChange={(e) => updateTime(dayIndex, slotIndex, 'end', e.target.value)}
                                                        className="appearance-none bg-white border border-gray-200 text-[#352C5E] text-sm font-bold rounded-lg py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#7D65CC] cursor-pointer"
                                                    >
                                                        {TIME_OPTIONS.map((time) => (
                                                            <option key={time} value={time}>{time}</option>
                                                        ))}
                                                    </select>
                                                    <Clock size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => removeSlot(dayIndex, slotIndex)}
                                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            title="Remove Shift"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}

                                {/* Add Shift Button */}
                                <button 
                                    onClick={() => addSlot(dayIndex)}
                                    className="flex items-center gap-2 text-xs font-bold text-[#E1AD48] hover:text-[#c49235] hover:bg-[#E1AD48]/5 px-3 py-2 rounded-lg transition-all mt-1 w-fit"
                                >
                                    <Plus size={14} strokeWidth={3} />
                                    <span>Add Break / Shift</span>
                                </button>
                            </>
                        ) : (
                            <div className="h-full flex items-center">
                                <p className="text-sm font-medium text-gray-400 italic">No slots available. This day is marked as off.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ))}
      </div>

    </div>
  );
}