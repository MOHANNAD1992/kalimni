"use client";

import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Users, Stethoscope, DollarSign, Activity, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Download, 
  Filter, Eye, Edit, Ban, ChevronDown, CheckSquare, Square, Calendar
} from 'lucide-react';

// --- 1. بيانات الجراف ---
const data6Months = [
  { name: 'Jan', users: 1200, revenue: 4500 },
  { name: 'Feb', users: 1900, revenue: 6200 },
  { name: 'Mar', users: 1500, revenue: 5800 },
  { name: 'Apr', users: 2100, revenue: 8900 },
  { name: 'May', users: 2800, revenue: 12000 },
  { name: 'Jun', users: 3500, revenue: 15500 },
];

const data1Year = [
    { name: 'Jan', users: 1200, revenue: 4500 },
    { name: 'Feb', users: 1900, revenue: 6200 },
    { name: 'Mar', users: 1500, revenue: 5800 },
    { name: 'Apr', users: 2100, revenue: 8900 },
    { name: 'May', users: 2800, revenue: 12000 },
    { name: 'Jun', users: 3500, revenue: 15500 },
    { name: 'Jul', users: 3200, revenue: 14000 },
    { name: 'Aug', users: 3800, revenue: 16500 },
    { name: 'Sep', users: 4200, revenue: 18000 },
    { name: 'Oct', users: 4800, revenue: 21000 },
    { name: 'Nov', users: 5100, revenue: 23500 },
    { name: 'Dec', users: 6000, revenue: 28000 },
];

// --- 2. بيانات الجدول ---
const usersData = [
    {id: 1, name: "Sarah Connor", email: "sarah.c@example.com", status: "Active", pkg: "12 Sessions", color: "bg-blue-100 text-blue-600", initial: "SC", joined: "2 mins ago"},
    {id: 2, name: "John Wick", email: "john.w@example.com", status: "Active", pkg: "5 Sessions", color: "bg-purple-100 text-purple-600", initial: "JW", joined: "15 mins ago"},
    {id: 3, name: "Emily Blunt", email: "emily.b@example.com", status: "Pending", pkg: "-", color: "bg-orange-100 text-orange-600", initial: "EB", joined: "1 hour ago"},
    {id: 4, name: "Jack Ryan", email: "jack.r@example.com", status: "Inactive", pkg: "1 Session", color: "bg-gray-100 text-gray-600", initial: "JR", joined: "3 hours ago"},
    {id: 5, name: "Tony Stark", email: "tony.s@example.com", status: "Active", pkg: "12 Sessions", color: "bg-emerald-100 text-emerald-600", initial: "TS", joined: "5 hours ago"},
    {id: 6, name: "Natasha Romanoff", email: "nat.r@example.com", status: "Active", pkg: "5 Sessions", color: "bg-rose-100 text-rose-600", initial: "NR", joined: "1 day ago"},
];

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState('6M');
  const [chartData, setChartData] = useState(data6Months);
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ active: true, pending: false });

  useEffect(() => {
    setChartData(timeFilter === '6M' ? data6Months : data1Year);
  }, [timeFilter]);

  useEffect(() => {
    const handleClickOutside = () => {
        setOpenActionId(null);
        setIsFilterMenuOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    // إضافة text-left للحاوية الرئيسية لضمان أن كل النصوص تبدأ من اليسار
    <div className="space-y-6 animate-fadeIn pb-12 text-left" onClick={(e) => e.stopPropagation()}>
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        {/* العنوان مثبت لليسار */}
        <div className="text-left">
          <h1 className="text-2xl font-bold text-[#352C5E] tracking-tight">Overview</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Platform performance & statistics Overview.</p>
        </div>
        
        <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsFilterMenuOpen(!isFilterMenuOpen); setOpenActionId(null); }}
                    className={`flex items-center gap-2 border px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm
                    ${isFilterMenuOpen 
                        ? 'bg-[#352C5E] text-white border-[#352C5E] ring-2 ring-[#352C5E]/20' 
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                >
                    <Filter size={16} />
                    <span>Filter Status</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isFilterMenuOpen && (
                    <div className="absolute top-12 right-0 bg-white border border-gray-100 shadow-xl rounded-xl w-60 z-50 p-2 animate-in fade-in slide-in-from-top-2 text-left" onClick={(e) => e.stopPropagation()}>
                        <div className="px-3 py-2 border-b border-gray-50 mb-1">
                             <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Select Status</p>
                        </div>
                        
                        <div 
                            className="flex items-center gap-3 px-3 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                            onClick={() => setActiveFilters({...activeFilters, active: !activeFilters.active})}
                        >
                            <div className={`transition-colors ${activeFilters.active ? 'text-[#352C5E]' : 'text-gray-300 group-hover:text-gray-400'}`}>
                                {activeFilters.active ? <CheckSquare size={18} /> : <Square size={18} />}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Active Users</p>
                                <p className="text-[10px] text-gray-400">Users with active subscriptions</p>
                            </div>
                        </div>

                        <div 
                            className="flex items-center gap-3 px-3 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                            onClick={() => setActiveFilters({...activeFilters, pending: !activeFilters.pending})}
                        >
                             <div className={`transition-colors ${activeFilters.pending ? 'text-[#352C5E]' : 'text-gray-300 group-hover:text-gray-400'}`}>
                                {activeFilters.pending ? <CheckSquare size={18} /> : <Square size={18} />}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Pending Approval</p>
                                <p className="text-[10px] text-gray-400">Users waiting for verification</p>
                            </div>
                        </div>
                        
                        <div className="pt-2 mt-1">
                            <button className="w-full text-center text-xs font-bold text-white bg-[#352C5E] py-2.5 rounded-lg hover:bg-[#2C2448] transition-colors shadow-md shadow-[#352C5E]/20">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-sm">
                <Calendar size={16} />
                <span>Last 30 Days</span>
            </button>

            <button className="flex items-center gap-2 bg-[#352C5E] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20 active:scale-95">
                <Download size={16} />
                <span>Export Report</span>
            </button>
        </div>
      </div>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value="15,900" icon={Users} trend="+18.5%" isPositive={true} iconColor="text-[#7D65CC]" iconBg="bg-[#7D65CC]/10" />
        <StatsCard title="Total Revenue" value="$84,200" icon={DollarSign} trend="+12.2%" isPositive={true} iconColor="text-[#E1AD48]" iconBg="bg-[#E1AD48]/10" />
        <StatsCard title="Specialists" value="412" icon={Stethoscope} trend="+3.4%" isPositive={true} iconColor="text-blue-500" iconBg="bg-blue-50" />
        <StatsCard title="Active Now" value="1,840" icon={Activity} trend="Live" isPositive={true} isLive={true} iconColor="text-rose-500" iconBg="bg-rose-50" />
      </div>

      {/* --- Middle Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-[420px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
                <div className="text-left">
                    <h3 className="font-bold text-[#352C5E] text-lg">User Growth & Revenue</h3>
                    <p className="text-gray-400 text-xs mt-1">Comparitive analytics over selected period</p>
                </div>
                <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setTimeFilter('6M'); }}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${timeFilter === '6M' ? 'bg-white text-[#352C5E] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        6 Months
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setTimeFilter('1Y'); }}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${timeFilter === '1Y' ? 'bg-white text-[#352C5E] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        1 Year
                    </button>
                </div>
            </div>
            
            <div className="flex-1 w-full min-h-0 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7D65CC" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#7D65CC" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E1AD48" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#E1AD48" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', fontSize: '12px', textAlign: 'left' }} />
                        <Area type="monotone" dataKey="users" stroke="#7D65CC" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                        <Area type="monotone" dataKey="revenue" stroke="#E1AD48" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Top Packages Card - تعديل المحاذاة */}
        <div className="bg-[#352C5E] p-8 rounded-2xl shadow-xl shadow-[#352C5E]/20 text-white relative overflow-hidden flex flex-col h-[420px] text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E1AD48] rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#7D65CC] rounded-full blur-[60px] opacity-25 -ml-10 -mb-10 pointer-events-none"></div>
            
            {/* تم التأكد من وجود text-left هنا */}
            <div className="text-left relative z-10">
                <h3 className="font-bold text-xl mb-1">Top Packages</h3>
                <p className="text-white/60 text-xs mb-8">Sales distribution by volume</p>
            </div>
            
            <div className="space-y-6 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <PackageItem label="1 Session" percent={65} color="#E1AD48" count="840 Sold" />
                <PackageItem label="5 Sessions" percent={25} color="#7D65CC" count="320 Sold" />
                <PackageItem label="12 Sessions" percent={10} color="#FFFFFF" count="115 Sold" />
                <PackageItem label="Unlimited" percent={5} color="#FF6B6B" count="40 Sold" />
            </div>
            
            <div className="relative z-10 pt-4 border-t border-white/10 mt-auto">
                <button className="w-full py-3 bg-white/10 hover:bg-white/15 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]">
                    View Detailed Report
                </button>
            </div>
        </div>
      </div>

      {/* --- Interactive Table --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <div className="text-left">
                <h3 className="font-bold text-[#352C5E] text-lg">Recent Registrations</h3>
                <p className="text-gray-400 text-xs mt-0.5">Manage latest user activities and statuses</p>
            </div>
            <button className="text-xs font-bold text-[#7D65CC] bg-[#7D65CC]/10 hover:bg-[#7D65CC]/20 px-4 py-2 rounded-lg transition-colors">
                View All Users
            </button>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                        <th className="px-6 py-4 text-left">User Info</th>
                        <th className="px-6 py-4 text-left">Joined</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Package</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {usersData.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                            
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border border-white shadow-sm ${user.color}`}>
                                        {user.initial}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-[#352C5E] text-sm group-hover:text-[#7D65CC] transition-colors">{user.name}</p>
                                        <p className="text-gray-400 text-xs">{user.email}</p>
                                    </div>
                                </div>
                            </td>

                             <td className="px-6 py-4 text-left">
                                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                    {user.joined}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-left">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                    user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                                    user.status === 'Pending' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                                    'bg-gray-100 text-gray-500 border-gray-200'
                                }`}>
                                    {user.status}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-left">
                                <div className="text-sm font-medium text-gray-600">
                                    {user.pkg !== "-" ? user.pkg : <span className="text-gray-300 italic">No Package</span>}
                                </div>
                            </td>
                            
                            <td className="px-6 py-4 text-right relative">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenActionId(openActionId === user.id ? null : user.id);
                                        setIsFilterMenuOpen(false);
                                    }}
                                    className={`p-2 rounded-full transition-colors duration-200 ${openActionId === user.id ? 'bg-[#352C5E] text-white shadow-lg' : 'text-gray-400 hover:text-[#352C5E] hover:bg-gray-100'}`}
                                >
                                    <MoreHorizontal size={18}/>
                                </button>

                                {openActionId === user.id && (
                                    <div 
                                        className="absolute right-8 top-10 w-48 bg-white border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex flex-col py-1.5">
                                            <button className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] text-left transition-colors">
                                                <Eye size={14} /> View Profile
                                            </button>
                                            <button className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] text-left transition-colors">
                                                <Edit size={14} /> Edit Details
                                            </button>
                                            <div className="h-[1px] bg-gray-100 my-1"></div>
                                            <button className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 text-left transition-colors">
                                                <Ban size={14} /> Suspend User
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---
function StatsCard({ title, value, icon: Icon, trend, isPositive, iconColor, iconBg, isLive }: any) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-left">
            <div className="flex justify-between items-start">
                <div className="text-left">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 opacity-70">{title}</p>
                    <h3 className="text-2xl font-bold text-[#352C5E]">{value}</h3>
                </div>
                <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor} ${isLive ? 'relative' : ''}`}>
                    <Icon size={20} />
                    {isLive && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-ping"></span>}
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isPositive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>{trend}</span>
                <span className="text-gray-400 text-[10px] font-medium">vs last month</span>
            </div>
        </div>
    );
}

function PackageItem({ label, percent, color, count }: any) {
    return (
        <div className="group text-left">
            <div className="flex justify-between text-xs mb-2 font-medium items-end">
                <div className="text-left">
                    <span className="text-gray-200 block mb-0.5 group-hover:text-white transition-colors">{label}</span>
                    <span className="text-[10px] text-white/50">{count}</span>
                </div>
                <span className="font-bold text-lg" style={{ color: color }}>{percent}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-125 shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
                    style={{ width: `${percent}%`, backgroundColor: color }}
                ></div>
            </div>
        </div>
    );
}