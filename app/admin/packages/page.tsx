"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Check, X,
  Package, TrendingUp, BarChart3, 
  MoreHorizontal, Layers, ShieldCheck
} from 'lucide-react';

// --- نوع البيانات ---
interface PackageData {
  id: number;
  sessions: number;
  name: string;
  price: number;
  sales: number;
  status: string;
  popular: boolean;
  features: string[];
}

export default function PackagesPage() {
  // --- States ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  // البيانات الأولية
  const [packages, setPackages] = useState<PackageData[]>([
    { 
      id: 1, 
      sessions: 1, 
      name: "Starter Session", 
      price: 25, 
      sales: 1240, 
      status: "Active", 
      popular: false,
      features: ["30 Mins Consultation", "Online via Zoom", "Valid for 14 days"]
    },
    { 
      id: 2, 
      sessions: 5, 
      name: "Progress Bundle", 
      price: 110, 
      sales: 2150, 
      status: "Active", 
      popular: true,
      features: ["Weekly Sessions", "Priority Support", "Valid for 3 months"]
    },
  ]);

  // حالة النموذج الجديد
  const [newPackage, setNewPackage] = useState({
    name: '',
    sessions: '',
    price: '',
    features: '' 
  });

  // إغلاق القوائم عند الضغط خارجها
  useEffect(() => {
    const handleOutside = () => setOpenActionId(null);
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

  // --- دالة الحفظ ---
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // تحويل النص إلى مصفوفة
    const featuresList = newPackage.features
      .split('\n')
      .filter(line => line.trim() !== '');

    const newId = packages.length + 1;
    const pkg: PackageData = {
      id: newId,
      name: newPackage.name,
      sessions: parseInt(newPackage.sessions),
      price: parseInt(newPackage.price),
      sales: 0,
      status: "Active",
      popular: false,
      features: featuresList.length > 0 ? featuresList : ["Standard Access", "Support Included"]
    };

    setPackages([...packages, pkg]);
    setIsAddModalOpen(false);
    setNewPackage({ name: '', sessions: '', price: '', features: '' });
  };

  const handleDelete = (id: number) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12 text-left" onClick={(e) => e.stopPropagation()}>
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-[#352C5E] tracking-tight">Session Packages</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Create, edit and manage your session bundles.</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#352C5E] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20 active:scale-95"
        >
          <Plus size={20} />
          <span>Add New Bundle</span>
        </button>
      </div>

      {/* --- Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Sales" value="4,280 Units" icon={BarChart3} color="text-[#7D65CC]" bg="bg-[#7D65CC]/10" />
        <StatCard title="Active Bundles" value={packages.length.toString()} icon={Layers} color="text-[#E1AD48]" bg="bg-[#E1AD48]/10" />
        <StatCard title="Most Popular" value="5 Sessions" icon={TrendingUp} color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      {/* --- Packages Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`group relative bg-white p-8 rounded-[35px] border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${pkg.popular ? 'border-[#7D65CC] shadow-lg ring-1 ring-[#7D65CC]/20' : 'border-gray-100'}`}
          >
            {/* Session Badge */}
            <div className="absolute -top-5 left-6 bg-[#352C5E] text-white px-5 py-3 rounded-2xl shadow-xl border-b-4 border-[#E1AD48] flex flex-col items-center min-w-[80px]">
                <span className="text-3xl font-black leading-none">{pkg.sessions}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#E1AD48]">Sessions</span>
            </div>

            {/* Popular Tag */}
            {pkg.popular && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#7D65CC] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                </div>
            )}

            {/* Actions Menu */}
            <div className="absolute top-6 right-6">
              <button 
                onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === pkg.id ? null : pkg.id); }}
                className="p-2 text-gray-400 hover:text-[#352C5E] hover:bg-gray-50 rounded-full transition-all"
              >
                <MoreHorizontal size={22} />
              </button>
              {openActionId === pkg.id && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 shadow-2xl rounded-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200 text-left">
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"><Edit size={14} /> Edit Details</button>
                    <button onClick={() => handleDelete(pkg.id)} className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="mt-10 text-left">
                <h3 className="text-xl font-black text-[#352C5E] mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-[#352C5E] tracking-tighter">${pkg.price}</span>
                    <span className="text-gray-400 text-xs font-bold uppercase">USD</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 min-h-[100px]">
                    {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="bg-emerald-100 text-emerald-600 rounded-full p-0.5 mt-0.5 shrink-0">
                                <Check size={12} strokeWidth={3} />
                            </div>
                            <span className="text-sm font-semibold text-gray-600 leading-tight">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sales</span>
                        <span className="text-sm font-black text-[#352C5E]">{pkg.sales}</span>
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${pkg.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                        {pkg.status}
                    </span>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- ADD PACKAGE MODAL (Enhanced) --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#352C5E]/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
          
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="text-left">
                <h2 className="text-xl font-black text-[#352C5E]">Create New Bundle</h2>
                <p className="text-xs text-gray-400 font-medium">Add details and features below.</p>
              </div>
              
              {/* --- زر الإغلاق المحسن (The Enhanced X Button) --- */}
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="p-2 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 rounded-full transition-all duration-200 shadow-sm"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleAddSubmit}>
              <div className="text-left">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Package Name</label>
                <input 
                    type="text" 
                    placeholder="e.g. VIP Pack" 
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
                    required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Sessions Count</label>
                    <input 
                        type="number" 
                        placeholder="10" 
                        value={newPackage.sessions}
                        onChange={(e) => setNewPackage({...newPackage, sessions: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
                        required 
                    />
                </div>
                <div className="text-left">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Price ($)</label>
                    <input 
                        type="number" 
                        placeholder="99" 
                        value={newPackage.price}
                        onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
                        required 
                    />
                </div>
              </div>

              {/* حقل المميزات */}
              <div className="text-left">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Package Details / Features</label>
                <textarea 
                    placeholder="Enter each feature on a new line...&#10;e.g. 24/7 Support&#10;Free Consultation" 
                    value={newPackage.features}
                    onChange={(e) => setNewPackage({...newPackage, features: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-medium text-gray-600 h-28 resize-none" 
                    required 
                />
                <p className="text-[10px] text-gray-400 mt-1 text-right">Press Enter to add a new line item.</p>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#352C5E] text-white py-3.5 rounded-xl font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20">
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Footer --- */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex items-center gap-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ShieldCheck size={20} /></div>
        <p className="text-xs text-gray-500 font-medium">
            <strong>Pro Tip:</strong> Clearly listing features increases conversion rates. Use the new details field to add value.
        </p>
      </div>

    </div>
  );
}

// --- Helper Component ---
function StatCard({ title, value, icon: Icon, color, bg }: any) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
            <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${bg} ${color}`}>
                <Icon size={24} strokeWidth={2.5} />
            </div>
            <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{title}</p>
                <h3 className="text-xl font-black text-[#352C5E] leading-none">{value}</h3>
            </div>
        </div>
    );
}