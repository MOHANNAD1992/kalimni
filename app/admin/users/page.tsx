"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MoreHorizontal, Mail, 
  UserCheck, UserMinus, UserX, Eye, 
  Edit, Download, UserPlus, Calendar,
  Clock, CheckCircle2, AlertCircle, ChevronDown, X
} from 'lucide-react';

// --- بيانات المستخدمين الأولية ---
const initialUsers = [
  { id: 1, name: "Liam Neeson", email: "liam@example.com", package: "12 Sessions", status: "Active", lastSeen: "2 mins ago", joined: "Jan 12, 2026", color: "bg-blue-100 text-blue-600", initial: "LN" },
  { id: 2, name: "Emma Watson", email: "emma@example.com", package: "5 Sessions", status: "Active", lastSeen: "1 hour ago", joined: "Feb 05, 2026", color: "bg-purple-100 text-purple-600", initial: "EW" },
  { id: 3, name: "Robert Downey", email: "rdj@example.com", package: "1 Session", status: "Inactive", lastSeen: "2 days ago", joined: "Dec 20, 2025", color: "bg-orange-100 text-orange-600", initial: "RD" },
  { id: 4, name: "Scarlett Joh", email: "scarlett@example.com", package: "12 Sessions", status: "Banned", lastSeen: "1 month ago", joined: "Nov 15, 2025", color: "bg-red-100 text-red-600", initial: "SJ" },
  { id: 5, name: "Tom Holland", email: "tom.h@example.com", package: "Free Tier", status: "Active", lastSeen: "Just now", joined: "Feb 10, 2026", color: "bg-emerald-100 text-emerald-600", initial: "TH" },
];

export default function UsersPage() {
  // --- States ---
  const [users, setUsers] = useState(initialUsers);
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // States for Add User Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    package: 'Free Tier'
  });

  // إغلاق القوائم عند الضغط في الخارج
  useEffect(() => {
    const handleOutside = () => {
      setOpenActionId(null);
      setIsFilterOpen(false);
    };
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

  // دالة إضافة مستخدم جديد
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // استخراج الأحرف الأولى للاسم (Initials)
    const initials = newUser.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const userToAdd = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      package: newUser.package,
      status: "Active",
      lastSeen: "Just now",
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      color: "bg-indigo-100 text-indigo-600", // لون افتراضي للمستخدمين الجدد
      initial: initials || "NU"
    };

    setUsers([userToAdd, ...users]);
    setNewUser({ name: '', email: '', package: 'Free Tier' });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 text-left" onClick={(e) => e.stopPropagation()}>
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-[#352C5E] tracking-tight">Users Management</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Monitor and manage all registered clients and their session packages.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
                <Download size={18} />
                <span>Export CSV</span>
            </button>
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-[#352C5E] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20 active:scale-95"
            >
                <UserPlus size={18} />
                <span>Add User</span>
            </button>
        </div>
      </div>

      {/* --- User Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UserStatCard title="Total Users" value={users.length.toLocaleString()} icon={Users} color="text-[#7D65CC]" bg="bg-[#7D65CC]/10" />
        <UserStatCard title="Active Subs" value="8,120" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
        <UserStatCard title="Premium (12s)" value="2,400" icon={Award} color="text-[#E1AD48]" bg="bg-[#E1AD48]/10" />
        <UserStatCard title="Inactive" value="1,930" icon={AlertCircle} color="text-rose-600" bg="bg-rose-50" />
      </div>

      {/* --- Controls Bar --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7D65CC] transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, email, or package..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#7D65CC]/30 focus:ring-4 focus:ring-[#7D65CC]/5 transition-all outline-none"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto relative">
            <button 
                onClick={(e) => { e.stopPropagation(); setIsFilterOpen(!isFilterOpen); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${isFilterOpen ? 'bg-[#352C5E] text-white border-[#352C5E]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
                <Filter size={16} />
                <span>Filter By Plan</span>
                <ChevronDown size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter Menu */}
            {isFilterOpen && (
                <div className="absolute top-12 left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl p-2 z-50 animate-in fade-in slide-in-from-top-2" onClick={(e) => e.stopPropagation()}>
                    {['All Plans', '12 Sessions', '5 Sessions', '1 Session', 'Free Tier'].map((plan) => (
                        <button key={plan} className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] rounded-lg">
                            {plan}
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* --- Users Table --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Session Package</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-all group cursor-default">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm shrink-0 ${user.color}`}>
                        {user.initial}
                      </div>
                      <div className="text-left text-ellipsis overflow-hidden">
                        <p className="font-bold text-[#352C5E] text-sm group-hover:text-[#7D65CC] transition-colors">{user.name}</p>
                        <p className="text-gray-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <Mail size={10} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                        user.package.includes('12') ? 'bg-[#E1AD48]/10 text-[#E1AD48] border-[#E1AD48]/20' : 
                        user.package.includes('5') ? 'bg-[#7D65CC]/10 text-[#7D65CC] border-[#7D65CC]/20' :
                        'bg-gray-100 text-gray-500 border-gray-200'
                    }`}>
                      {user.package}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <UserStatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold text-gray-600">{user.lastSeen}</span>
                        <span className="text-[10px] text-gray-300">Joined {user.joined}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === user.id ? null : user.id); }}
                      className={`p-2 rounded-lg transition-all ${openActionId === user.id ? 'bg-[#352C5E] text-white shadow-md' : 'text-gray-400 hover:bg-gray-100 hover:text-[#352C5E]'}`}
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {/* Actions Menu */}
                    {openActionId === user.id && (
                      <div className="absolute right-8 top-12 w-48 bg-white border border-gray-100 shadow-2xl rounded-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200 text-left">
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] transition-colors">
                            <Eye size={14} className="text-blue-500" /> View Activity Log
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#352C5E] transition-colors">
                            <Edit size={14} className="text-[#7D65CC]" /> Edit Permissions
                        </button>
                        <div className="h-[1px] bg-gray-50 my-1 mx-2"></div>
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors">
                            <UserX size={14} /> Suspend Account
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

      {/* --- ADD USER MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#352C5E]/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
          
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="text-left">
                <h2 className="text-xl font-black text-[#352C5E]">Add New User</h2>
                <p className="text-xs text-gray-400 font-medium">Create a new client account.</p>
              </div>
              
              {/* زر الإغلاق (X) الواضح */}
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="p-2 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 rounded-full transition-all duration-200 shadow-sm"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Form */}
            <form className="p-6 space-y-4" onSubmit={handleAddUser}>
              <div className="text-left">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                <input 
                    type="text" 
                    placeholder="e.g. John Doe" 
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
                    required 
                />
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <input 
                    type="email" 
                    placeholder="e.g. john@example.com" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
                    required 
                />
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Initial Package</label>
                <div className="relative">
                  <select 
                      value={newUser.package}
                      onChange={(e) => setNewUser({...newUser, package: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E] appearance-none cursor-pointer"
                  >
                      <option>Free Tier</option>
                      <option>1 Session</option>
                      <option>5 Sessions</option>
                      <option>12 Sessions</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-[#352C5E] text-white py-3.5 rounded-xl font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20">
                  Create User
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

function UserStatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
      <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${bg} ${color}`}>
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <div className="text-left">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{title}</p>
        <h3 className="text-xl font-black text-[#352C5E] leading-tight">{value}</h3>
      </div>
    </div>
  );
}

function UserStatusBadge({ status }: { status: string }) {
  const styles: any = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Inactive: "bg-gray-100 text-gray-400 border-gray-200",
    Banned: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles[status]}`}>
      <span className={`w-1 h-1 rounded-full bg-current`}></span>
      {status}
    </span>
  );
}

// أيقونات إضافية
const Users = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Award = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;