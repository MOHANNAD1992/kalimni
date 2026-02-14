"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, FileText, 
  AlertTriangle, CheckCircle2, Info, XCircle, 
  ChevronDown, RefreshCw, Eye, X
} from 'lucide-react';

// --- بيانات السجلات التجريبية ---
const initialLogs = [
  { id: "LOG-9012", action: "User Login", module: "Auth", level: "Success", message: "User John Doe logged in successfully.", user: "john.d@example.com", ip: "192.168.1.1", date: "Feb 14, 10:45 AM" },
  { id: "LOG-9013", action: "Payment Failed", module: "Billing", level: "Error", message: "Transaction TRX-8821 declined by gateway.", user: "sarah.c@example.com", ip: "10.0.0.45", date: "Feb 14, 10:42 AM" },
  { id: "LOG-9014", action: "Package Created", module: "Admin", level: "Info", message: "New package 'VIP Bundle' created by Admin.", user: "Super Admin", ip: "192.168.1.100", date: "Feb 14, 09:30 AM" },
  { id: "LOG-9015", action: "System Update", module: "System", level: "Warning", message: "High memory usage detected on Server-01.", user: "System", ip: "localhost", date: "Feb 14, 08:15 AM" },
  { id: "LOG-9016", action: "User Suspended", module: "Users", level: "Warning", message: "User account suspended due to policy violation.", user: "Super Admin", ip: "192.168.1.100", date: "Feb 13, 11:20 PM" },
  { id: "LOG-9017", action: "New Registration", module: "Auth", level: "Success", message: "New user registered via Email.", user: "new.user@example.com", ip: "172.16.0.22", date: "Feb 13, 10:05 PM" },
];

export default function LogsPage() {
  const [logs, setLogs] = useState(initialLogs);
  const [filterLevel, setFilterLevel] = useState('All');
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // إغلاق القوائم
  useEffect(() => {
    const handleOutside = () => setIsFilterOpen(false);
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

  // دالة التصفية
  const handleFilter = (level: string) => {
    setFilterLevel(level);
    if (level === 'All') {
      setLogs(initialLogs);
    } else {
      setLogs(initialLogs.filter(log => log.level === level));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 text-left" onClick={(e) => e.stopPropagation()}>
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-[#352C5E] tracking-tight">System Logs</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Monitor system activities, errors, and security events.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
                <RefreshCw size={16} />
                <span>Refresh</span>
            </button>
            <button className="flex items-center gap-2 bg-[#352C5E] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20 active:scale-95">
                <Download size={18} />
                <span>Export CSV</span>
            </button>
        </div>
      </div>

      {/* --- Stats Overview --- */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <LogStat title="Total Events" value="1,240" color="text-gray-600" bg="bg-gray-100" />
        <LogStat title="Errors" value="23" color="text-red-600" bg="bg-red-50" />
        <LogStat title="Warnings" value="85" color="text-amber-600" bg="bg-amber-50" />
        <LogStat title="Success" value="1,132" color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      {/* --- Controls Bar --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7D65CC] transition-colors" />
          <input 
            type="text" 
            placeholder="Search logs by ID, User, or Message..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#7D65CC]/30 focus:ring-4 focus:ring-[#7D65CC]/5 transition-all outline-none"
          />
        </div>
        
        <div className="relative">
            <button 
                onClick={(e) => { e.stopPropagation(); setIsFilterOpen(!isFilterOpen); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${isFilterOpen ? 'bg-[#352C5E] text-white border-[#352C5E]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
                <Filter size={16} />
                <span>Filter: {filterLevel}</span>
                <ChevronDown size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterOpen && (
                <div className="absolute top-12 right-0 w-40 bg-white border border-gray-100 shadow-xl rounded-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {['All', 'Success', 'Error', 'Warning', 'Info'].map((level) => (
                        <button 
                            key={level} 
                            onClick={() => handleFilter(level)}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] rounded-lg"
                        >
                            {level}
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* --- Logs Table --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Log ID</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Module / Action</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {log.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <LogLevelBadge level={log.level} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-left">
                        <p className="text-sm font-bold text-[#352C5E]">{log.action}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">{log.module}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-gray-600 truncate" title={log.message}>{log.message}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-gray-500">{log.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => setSelectedLog(log)}
                        className="p-2 text-gray-400 hover:text-[#352C5E] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Log Details Modal --- */}
      {selectedLog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#352C5E]/40 backdrop-blur-sm" onClick={() => setSelectedLog(null)}></div>
          
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-[#352C5E] flex items-center gap-2">
                <FileText size={18} /> Log Details
              </h3>
              <button onClick={() => setSelectedLog(null)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Log ID</p>
                        <p className="font-mono text-sm font-bold">{selectedLog.id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Timestamp</p>
                        <p className="text-sm font-bold">{selectedLog.date}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">User / Actor</p>
                        <p className="text-sm font-bold">{selectedLog.user}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">IP Address</p>
                        <p className="font-mono text-sm font-bold">{selectedLog.ip}</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Full Message</p>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">{selectedLog.message}</p>
                </div>

                <div className="flex justify-end pt-2">
                    <button onClick={() => setSelectedLog(null)} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                        Close
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// --- Helper Components ---

function LogStat({ title, value, color, bg }: any) {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{title}</p>
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${bg.replace('bg-', 'bg-').replace('50', '500')}`}></span>
                <h3 className={`text-2xl font-black ${color}`}>{value}</h3>
            </div>
        </div>
    );
}

function LogLevelBadge({ level }: { level: string }) {
    const styles: any = {
        Success: "bg-emerald-50 text-emerald-600 border-emerald-100",
        Error: "bg-red-50 text-red-600 border-red-100",
        Warning: "bg-amber-50 text-amber-600 border-amber-100",
        Info: "bg-blue-50 text-blue-600 border-blue-100",
    };

    const Icons: any = {
        Success: CheckCircle2,
        Error: XCircle,
        Warning: AlertTriangle,
        Info: Info,
    };

    const Icon = Icons[level] || Info;

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${styles[level]}`}>
            <Icon size={12} strokeWidth={3} />
            {level}
        </span>
    );
}