"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MoreHorizontal, DollarSign, 
  CreditCard, ArrowUpRight, ArrowDownRight, 
  Download, Eye, RefreshCcw, CheckCircle2, 
  XCircle, Clock, FileText, ChevronDown
} from 'lucide-react';

// --- بيانات العمليات المالية التجريبية ---
const transactions = [
  { id: "TRX-9482", user: "Liam Neeson", amount: "$120.00", date: "Feb 12, 2026", method: "Visa **** 4242", status: "Completed" },
  { id: "TRX-8271", user: "Emma Watson", amount: "$45.00", date: "Feb 11, 2026", method: "MasterCard **** 5521", status: "Completed" },
  { id: "TRX-7721", user: "Robert Downey", amount: "$15.00", date: "Feb 10, 2026", method: "PayPal", status: "Pending" },
  { id: "TRX-6610", user: "Scarlett Joh", amount: "$120.00", date: "Feb 09, 2026", method: "Visa **** 1102", status: "Failed" },
  { id: "TRX-5509", user: "Tom Holland", amount: "$0.00", date: "Feb 08, 2026", method: "Free Credit", status: "Completed" },
  { id: "TRX-4401", user: "Chris Evans", amount: "$45.00", date: "Feb 07, 2026", method: "Visa **** 9980", status: "Completed" },
];

export default function PaymentPage() {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const handleOutsideClick = () => setOpenActionId(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn pb-12 text-left" onClick={(e) => e.stopPropagation()}>
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-[#352C5E] tracking-tight">Payments & Transactions</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Track all incoming revenue and manage refund requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
                <FileText size={18} />
                <span>Financial Report</span>
            </button>
            <button className="flex items-center gap-2 bg-[#352C5E] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20 active:scale-95">
                <Download size={18} />
                <span>Export History</span>
            </button>
        </div>
      </div>

      {/* --- Financial Stats --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PaymentStatCard title="Total Revenue" value="$84,200" trend="+12.5%" isUp={true} icon={DollarSign} color="text-emerald-600" bg="bg-emerald-50" />
        <PaymentStatCard title="This Month" value="$12,450" trend="+4.2%" isUp={true} icon={CreditCard} color="text-[#7D65CC]" bg="bg-[#7D65CC]/10" />
        <PaymentStatCard title="Pending" value="$1,120" trend="8 Items" isUp={null} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
        <PaymentStatCard title="Refunds" value="$450" trend="-1.2%" isUp={false} icon={RefreshCcw} color="text-rose-600" bg="bg-rose-50" />
      </div>

      {/* --- Control & Search Bar --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7D65CC] transition-colors" />
          <input 
            type="text" 
            placeholder="Search by ID or User name..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#7D65CC]/30 focus:ring-4 focus:ring-[#7D65CC]/5 transition-all outline-none"
          />
        </div>
        
        <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                {['All', 'Completed', 'Pending', 'Failed'].map((status) => (
                    <button 
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === status ? 'bg-white text-[#352C5E] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* --- Transactions Table --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-6 py-5 font-mono text-xs font-bold text-[#352C5E]">
                    {trx.id}
                  </td>
                  <td className="px-6 py-5 font-bold text-[#352C5E]">
                    {trx.user}
                  </td>
                  <td className="px-6 py-5 font-black text-[#352C5E]">
                    {trx.amount}
                  </td>
                  <td className="px-6 py-5 text-gray-500 font-medium text-xs">
                    {trx.date}
                  </td>
                  <td className="px-6 py-5 text-gray-400 text-xs flex items-center gap-2">
                    <CreditCard size={14} />
                    {trx.method}
                  </td>
                  <td className="px-6 py-5">
                    <TransactionStatus status={trx.status} />
                  </td>
                  <td className="px-6 py-5 text-right relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === trx.id ? null : trx.id); }}
                      className={`p-2 rounded-lg transition-all ${openActionId === trx.id ? 'bg-[#352C5E] text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-[#352C5E]'}`}
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openActionId === trx.id && (
                      <div className="absolute right-8 top-12 w-48 bg-white border border-gray-100 shadow-2xl rounded-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200 text-left">
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] transition-colors">
                            <Eye size={14} className="text-blue-500" /> View Invoice
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] transition-colors">
                            <RefreshCcw size={14} className="text-orange-500" /> Issue Refund
                        </button>
                        <div className="h-[1px] bg-gray-50 my-1 mx-2"></div>
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors">
                            <XCircle size={14} /> Mark as Fraud
                        </button>
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

function PaymentStatCard({ title, value, trend, isUp, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${bg} ${color}`}>
            <Icon size={22} strokeWidth={2.5} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${isUp === true ? 'bg-emerald-50 text-emerald-600' : isUp === false ? 'bg-rose-50 text-rose-600' : 'bg-gray-50 text-gray-400'}`}>
            {isUp === true ? <ArrowUpRight size={12} /> : isUp === false ? <ArrowDownRight size={12} /> : null}
            {trend}
        </div>
      </div>
      <div className="text-left">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{title}</p>
        <h3 className="text-2xl font-black text-[#352C5E] leading-tight">{value}</h3>
      </div>
    </div>
  );
}

function TransactionStatus({ status }: { status: string }) {
  const styles: any = {
    Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Failed: "bg-rose-50 text-rose-600 border-rose-100",
  };

  const Icons: any = {
    Completed: CheckCircle2,
    Pending: Clock,
    Failed: XCircle,
  };

  const Icon = Icons[status] || Clock;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${styles[status]}`}>
      <Icon size={12} strokeWidth={3} />
      {status}
    </span>
  );
}