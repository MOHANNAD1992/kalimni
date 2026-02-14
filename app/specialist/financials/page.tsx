"use client";

import React from 'react';
import { 
  DollarSign, TrendingUp, Calendar, 
  ArrowUpRight, ArrowDownRight, Download, 
  Wallet, Clock, CheckCircle2, Filter, 
  ChevronRight, CreditCard
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// --- بيانات الرسم البياني ---
const earningsData = [
  { name: 'Jan', earnings: 1200 },
  { name: 'Feb', earnings: 2100 },
  { name: 'Mar', earnings: 1800 },
  { name: 'Apr', earnings: 2400 },
  { name: 'May', earnings: 3200 },
  { name: 'Jun', earnings: 2900 },
];

// --- سجل المعاملات ---
const transactions = [
  { id: "#TX-9021", patient: "Ahmed Sami", date: "Feb 14, 2026", type: "Scheduled Session", amount: "$45.00", status: "Completed" },
  { id: "#TX-8842", patient: "Layla Mahmoud", date: "Feb 14, 2026", type: "Instant Session", amount: "$30.00", status: "Completed" },
  { id: "#TX-7731", patient: "Omar Ali", date: "Feb 13, 2026", type: "Multi-session Pkg", amount: "$110.00", status: "Pending" },
  { id: "#TX-6620", patient: "Sarah Jaber", date: "Feb 12, 2026", type: "Scheduled Session", amount: "$45.00", status: "Completed" },
];

export default function FinancialsPage() {
  return (
    <div className="space-y-8 animate-fadeIn pb-20 max-w-[1600px] mx-auto text-left">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-3xl font-black text-[#352C5E] tracking-tight">Financial Overview</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Track your earnings and pending payouts.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            <span>Statements</span>
          </button>
          <button className="flex items-center gap-2 bg-[#352C5E] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20 active:scale-95">
            <CreditCard size={18} />
            <span>Request Payout</span>
          </button>
        </div>
      </div>

      {/* --- Stats Grid: Perfectly Aligned --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Available Balance" 
          value="$2,450.00" 
          change="+12.5%" 
          isPositive={true} 
          icon={Wallet} 
          color="text-[#352C5E]" 
          bg="bg-[#E1AD48]/10" 
        />
        <StatCard 
          title="Pending Amount" 
          value="$840.00" 
          change="Updated Today" 
          isPositive={true} 
          icon={Clock} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
        <StatCard 
          title="Total Withdrawn" 
          value="$12,890.00" 
          change="-2.4% last month" 
          isPositive={false} 
          icon={CheckCircle2} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
      </div>

      {/* --- Main Financial Content --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
        
        {/* Earnings Chart (8 Cols) */}
        <div className="xl:col-span-8 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-[#E1AD48]" size={20} />
              <h3 className="font-black text-[#352C5E] text-lg">Earnings Performance</h3>
            </div>
            <select className="bg-gray-50 border border-gray-100 text-xs font-bold px-4 py-2 rounded-xl focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last 1 Year</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7D65CC" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#7D65CC" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#352C5E' }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#7D65CC" strokeWidth={4} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Summary Card (4 Cols) */}
        <div className="xl:col-span-4 bg-[#352C5E] rounded-[40px] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E1AD48] rounded-full blur-[80px] opacity-10 -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-8">Payout Details</h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <span className="text-sm font-bold text-white/60">Next Payout Date</span>
                <span className="text-sm font-black">Feb 28, 2026</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <span className="text-sm font-bold text-white/60">Bank Account</span>
                <span className="text-sm font-black">**** 4421</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white/60">Payout Method</span>
                <span className="text-sm font-black">Direct Deposit</span>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white/5 p-6 rounded-3xl border border-white/10">
            <p className="text-[10px] font-black text-[#E1AD48] uppercase mb-1">Financial Note</p>
            <p className="text-xs text-white/70 font-medium leading-relaxed">
              Earnings are calculated based on completed sessions. Multi-session packages are released proportionally as sessions are marked as completed.
            </p>
          </div>
        </div>
      </div>

      {/* --- Transaction History Table --- */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-black text-[#352C5E] text-lg">Transaction History</h3>
          <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#352C5E] transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase">Reference</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase">Patient</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase">Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase">Type</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase text-right">Amount</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group cursor-default">
                  <td className="px-8 py-6 text-sm font-bold text-gray-400">{tx.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 font-bold text-[#352C5E] text-sm group-hover:text-[#7D65CC]">
                      {tx.patient}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-500">{tx.date}</td>
                  <td className="px-8 py-6">
                    <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-lg uppercase tracking-wider">{tx.type}</span>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-[#352C5E] text-right">{tx.amount}</td>
                  <td className="px-8 py-6 text-right">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter
                      ${tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-gray-50/50 border-t border-gray-50 text-center">
          <button className="text-xs font-black text-[#352C5E] hover:underline flex items-center gap-2 mx-auto">
            Load Full Transaction History <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}

// --- Helper Components ---

function StatCard({ title, value, change, isPositive, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl ${bg} ${color}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-lg ${isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black text-[#352C5E]">{value}</h3>
      </div>
    </div>
  );
}