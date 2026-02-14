"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Filter, MoreHorizontal, 
  Star, CheckCircle2, XCircle, Clock, 
  Mail, ShieldCheck, Eye, 
  UserPlus, Award, TrendingUp, X,
  Stethoscope // أيقونة السماعة الصحيحة
} from 'lucide-react';

// --- بيانات الأخصائيين الأولية ---
const initialSpecialists = [
  { id: 1, name: "Dr. Laila Hassan", specialty: "Mental Health", rating: 4.9, status: "Active", experience: "8 Years", sessions: 124, email: "laila@kalimni.com", color: "bg-blue-100 text-blue-600" },
  { id: 2, name: "Dr. Omar Zaid", specialty: "Life Coach", rating: 4.7, status: "Pending", experience: "5 Years", sessions: 0, email: "omar@kalimni.com", color: "bg-purple-100 text-purple-600" },
  { id: 3, name: "Dr. Sarah Ahmed", specialty: "Speech Therapy", rating: 4.8, status: "Active", experience: "12 Years", sessions: 450, email: "sarah@kalimni.com", color: "bg-pink-100 text-pink-600" },
  { id: 4, name: "Dr. Khalid Mansour", specialty: "Psychiatrist", rating: 4.5, status: "Suspended", experience: "10 Years", sessions: 89, email: "khalid@kalimni.com", color: "bg-gray-100 text-gray-600" },
  { id: 5, name: "Dr. Maya Rayan", specialty: "Family Consultant", rating: 5.0, status: "Active", experience: "15 Years", sessions: 612, email: "maya@kalimni.com", color: "bg-emerald-100 text-emerald-600" },
];

export default function SpecialistsPage() {
  // --- States ---
  const [specialists, setSpecialists] = useState(initialSpecialists);
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState('All');
  
  // States for Add Specialist Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSpecialist, setNewSpecialist] = useState({
    name: '',
    specialty: '',
    email: '',
    experience: ''
  });

  // إغلاق القوائم عند الضغط في الخارج
  useEffect(() => {
    const closeAll = () => setOpenActionId(null);
    window.addEventListener('click', closeAll);
    return () => window.removeEventListener('click', closeAll);
  }, []);

  // دالة إضافة أخصائي جديد
  const handleAddSpecialist = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSpec = {
      id: specialists.length + 1,
      name: newSpecialist.name,
      specialty: newSpecialist.specialty,
      email: newSpecialist.email,
      experience: newSpecialist.experience + " Years",
      rating: 0,
      status: "Pending",
      sessions: 0,
      color: "bg-indigo-100 text-indigo-600"
    };

    setSpecialists([newSpec, ...specialists]);
    setNewSpecialist({ name: '', specialty: '', email: '', experience: '' });
    setIsAddModalOpen(false);
  };

  // تصفية الجدول
  const filteredSpecialists = filterType === 'All' 
    ? specialists 
    : specialists.filter(s => s.status === filterType);

  return (
    <div className="space-y-6 animate-fadeIn pb-12 text-left" onClick={(e) => e.stopPropagation()}>
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-[#352C5E] tracking-tight">Specialists Management</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Review, approve, and manage all platform specialists.</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#E1AD48] text-[#352C5E] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#cf9e3e] transition-all shadow-lg shadow-[#E1AD48]/20 active:scale-95"
        >
          <UserPlus size={18} />
          <span>Add New Specialist</span>
        </button>
      </div>

      {/* --- Stats Overview --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStatCard title="Total Specialists" value={specialists.length.toString()} icon={Stethoscope} color="text-blue-600" bg="bg-blue-50" />
        <MiniStatCard title="Active Now" value={specialists.filter(s => s.status === 'Active').length.toString()} icon={TrendingUp} color="text-emerald-600" bg="bg-emerald-50" />
        <MiniStatCard title="Pending Review" value={specialists.filter(s => s.status === 'Pending').length.toString()} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
        <MiniStatCard title="Top Rated" value="48" icon={Award} color="text-purple-600" bg="bg-purple-50" />
      </div>

      {/* --- Filters & Search --- */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7D65CC]" />
          <input 
            type="text" 
            placeholder="Search by name, specialty or email..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#7D65CC]/30 focus:ring-4 focus:ring-[#7D65CC]/5 transition-all outline-none"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 w-full md:w-auto">
                {['All', 'Active', 'Pending', 'Suspended'].map((status) => (
                    <button 
                        key={status}
                        onClick={() => setFilterType(status)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === status ? 'bg-white text-[#352C5E] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {status}
                    </button>
                ))}
            </div>
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors hidden md:block">
                <Filter size={18} />
            </button>
        </div>
      </div>

      {/* --- Specialists Table --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Specialist</th>
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSpecialists.map((spec) => (
                <tr key={spec.id} className="hover:bg-gray-50/80 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm shrink-0 ${spec.color}`}>
                        {spec.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-[#352C5E] text-sm group-hover:text-[#7D65CC] transition-colors">{spec.name}</p>
                        <p className="text-gray-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <Mail size={10} /> {spec.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                      {spec.specialty}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">
                    {spec.experience}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 text-[#E1AD48]">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold">{spec.rating}</span>
                      <span className="text-[10px] text-gray-300 ml-1 font-normal">({spec.sessions} sessions)</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <StatusChip status={spec.status} />
                  </td>
                  <td className="px-6 py-5 text-right relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === spec.id ? null : spec.id); }}
                      className={`p-2 rounded-lg transition-all ${openActionId === spec.id ? 'bg-[#352C5E] text-white shadow-md' : 'text-gray-400 hover:bg-gray-100 hover:text-[#352C5E]'}`}
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {/* Action Dropdown Menu */}
                    {openActionId === spec.id && (
                      <div 
                        className="absolute right-8 top-12 w-52 bg-white border border-gray-100 shadow-2xl rounded-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2 space-y-1">
                          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] rounded-xl transition-colors">
                            <Eye size={16} className="text-blue-500" /> View Profile & Docs
                          </button>
                          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] rounded-xl transition-colors">
                            <ShieldCheck size={16} className="text-emerald-500" /> Verify Documents
                          </button>
                          <div className="h-[1px] bg-gray-50 my-1 mx-2"></div>
                          {spec.status === 'Pending' ? (
                            <button className="flex items-center gap-3 w-full px-3 py-2.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                                <CheckCircle2 size={16} /> Approve Specialist
                            </button>
                          ) : (
                            <button className="flex items-center gap-3 w-full px-3 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                <XCircle size={16} /> Suspend Account
                            </button>
                          )}
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

      {/* --- ADD SPECIALIST MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#352C5E]/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
          
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-300 relative">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="text-left">
                <h2 className="text-xl font-black text-[#352C5E]">Add New Specialist</h2>
                <p className="text-xs text-gray-400 font-medium">Enter details to invite a specialist.</p>
              </div>
              
              {/* زر الإغلاق (X) المعدل ليكون واضحاً */}
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="p-2 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 rounded-full transition-all duration-200 shadow-sm"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Form */}
            <form className="p-6 space-y-4" onSubmit={handleAddSpecialist}>
              <div className="text-left">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                <input 
                    type="text" 
                    placeholder="e.g. Dr. John Doe" 
                    value={newSpecialist.name}
                    onChange={(e) => setNewSpecialist({...newSpecialist, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
                    required 
                />
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <input 
                    type="email" 
                    placeholder="e.g. doctor@example.com" 
                    value={newSpecialist.email}
                    onChange={(e) => setNewSpecialist({...newSpecialist, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
                    required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Specialty</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Psychology" 
                        value={newSpecialist.specialty}
                        onChange={(e) => setNewSpecialist({...newSpecialist, specialty: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
                        required 
                    />
                </div>
                <div className="text-left">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Experience (Yrs)</label>
                    <input 
                        type="number" 
                        placeholder="e.g. 5" 
                        value={newSpecialist.experience}
                        onChange={(e) => setNewSpecialist({...newSpecialist, experience: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
                        required 
                    />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-[#352C5E] text-white py-3.5 rounded-xl font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20">
                  Save Specialist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// --- Helper Components ---

function MiniStatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <div className="text-left">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{title}</p>
        <h3 className="text-xl font-black text-[#352C5E] leading-tight">{value}</h3>
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const styles: any = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Suspended: "bg-rose-50 text-rose-600 border-rose-100",
  };

  const Icons: any = {
    Active: CheckCircle2,
    Pending: Clock,
    Suspended: XCircle,
  };

  const Icon = Icons[status] || Clock;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status]}`}>
      <Icon size={12} strokeWidth={3} />
      {status}
    </span>
  );
}