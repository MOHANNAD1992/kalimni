"use client";

import React, { useState } from 'react';
import { 
  Save, Globe, Lock, Bell, Percent, 
  UploadCloud, ToggleLeft, ToggleRight, 
  ShieldCheck, Mail, Smartphone, Monitor
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  return (
    <div className="space-y-6 animate-fadeIn pb-12 text-left" onClick={(e) => e.stopPropagation()}>
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-[#352C5E] tracking-tight">System Settings</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Manage global preferences, security, and platform rules.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-[#352C5E] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#2C2448] transition-all shadow-lg shadow-[#352C5E]/20 active:scale-95">
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* --- Settings Tabs --- */}
      <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-fit">
        <TabButton 
            active={activeTab === 'general'} 
            onClick={() => setActiveTab('general')} 
            icon={Globe} 
            label="General" 
        />
        <TabButton 
            active={activeTab === 'platform'} 
            onClick={() => setActiveTab('platform')} 
            icon={Percent} 
            label="Platform Rules" 
        />
        <TabButton 
            active={activeTab === 'security'} 
            onClick={() => setActiveTab('security')} 
            icon={Lock} 
            label="Security" 
        />
        <TabButton 
            active={activeTab === 'notifications'} 
            onClick={() => setActiveTab('notifications')} 
            icon={Bell} 
            label="Notifications" 
        />
      </div>

      {/* --- Tab Content --- */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        
        {/* 1. GENERAL SETTINGS */}
        {activeTab === 'general' && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Logo Upload */}
                    <div className="w-full md:w-1/3">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Platform Logo</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-[#7D65CC] hover:bg-gray-50 transition-all cursor-pointer group">
                            <div className="p-4 bg-gray-100 rounded-full mb-3 group-hover:bg-[#7D65CC]/10 text-gray-400 group-hover:text-[#7D65CC] transition-colors">
                                <UploadCloud size={32} />
                            </div>
                            <p className="text-sm font-bold text-gray-600">Click to upload</p>
                            <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (Max 2MB)</p>
                        </div>
                    </div>

                    {/* Site Info */}
                    <div className="w-full md:w-2/3 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Platform Name" placeholder="Kalimni App" defaultValue="Kalimni" />
                            <InputGroup label="Support Email" placeholder="support@kalimni.com" defaultValue="help@kalimni.com" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Default Language" placeholder="English" defaultValue="English (US)" />
                            <InputGroup label="Timezone" placeholder="UTC+3" defaultValue="(GMT+03:00) Amman" />
                        </div>
                        
                        {/* Maintenance Mode Toggle */}
                        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-100">
                            <div>
                                <h4 className="font-bold text-[#352C5E] text-sm">Maintenance Mode</h4>
                                <p className="text-xs text-gray-500 mt-0.5">Disable access to the platform for all users.</p>
                            </div>
                            <button onClick={() => setMaintenanceMode(!maintenanceMode)} className={`transition-colors ${maintenanceMode ? 'text-[#352C5E]' : 'text-gray-300'}`}>
                                {maintenanceMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* 2. PLATFORM RULES */}
        {activeTab === 'platform' && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="bg-[#352C5E]/5 p-6 rounded-2xl border border-[#352C5E]/10">
                    <h3 className="font-bold text-[#352C5E] text-lg mb-4 flex items-center gap-2">
                        <Percent size={20} /> Commission & Fees
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup label="Platform Commission (%)" placeholder="15%" defaultValue="20" />
                        <InputGroup label="Transaction Fee ($)" placeholder="0.50" defaultValue="1.00" />
                        <InputGroup label="Tax Rate (%)" placeholder="16%" defaultValue="16" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-[#352C5E] text-lg mb-4 flex items-center gap-2">
                        <Monitor size={20} /> Session Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="Default Session Duration (Mins)" placeholder="45" defaultValue="45" />
                        <InputGroup label="Free Trial Duration (Days)" placeholder="7" defaultValue="0" />
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" className="w-4 h-4 accent-[#352C5E]" defaultChecked />
                            <span className="text-sm font-semibold text-gray-700">Allow Specialists to set their own custom availability</span>
                        </label>
                    </div>
                </div>
            </div>
        )}

        {/* 3. SECURITY */}
        {activeTab === 'security' && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="max-w-2xl">
                    <h3 className="font-bold text-[#352C5E] text-lg mb-6 flex items-center gap-2">
                        <Lock size={20} /> Change Password
                    </h3>
                    <div className="space-y-4 mb-8">
                        <InputGroup label="Current Password" type="password" placeholder="••••••••" />
                        <div className="grid grid-cols-2 gap-4">
                            <InputGroup label="New Password" type="password" placeholder="••••••••" />
                            <InputGroup label="Confirm New Password" type="password" placeholder="••••••••" />
                        </div>
                    </div>

                    <div className="h-[1px] bg-gray-100 my-8"></div>

                    <h3 className="font-bold text-[#352C5E] text-lg mb-4 flex items-center gap-2">
                        <ShieldCheck size={20} /> Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <div>
                            <p className="text-sm font-bold text-[#352C5E]">Enable 2FA via Email</p>
                            <p className="text-xs text-gray-500 mt-1">We will send a code to your email every time you login.</p>
                        </div>
                        <button className="text-[#352C5E]"><ToggleRight size={40} /></button>
                    </div>
                </div>
            </div>
        )}

        {/* 4. NOTIFICATIONS */}
        {activeTab === 'notifications' && (
            <div className="p-8 space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                 <h3 className="font-bold text-[#352C5E] text-lg mb-2">Notification Preferences</h3>
                 <p className="text-sm text-gray-500 mb-6">Choose what you want to be notified about.</p>

                 <div className="space-y-4 max-w-3xl">
                    <NotificationToggle 
                        title="New Specialist Registration" 
                        desc="Get notified when a new doctor signs up." 
                        icon={Mail}
                        checked={emailNotif}
                        onChange={() => setEmailNotif(!emailNotif)}
                    />
                    <NotificationToggle 
                        title="New User Subscription" 
                        desc="Get notified when a user buys a package." 
                        icon={DollarSignIcon}
                        checked={pushNotif}
                        onChange={() => setPushNotif(!pushNotif)}
                    />
                     <NotificationToggle 
                        title="System Errors & Warnings" 
                        desc="Receive alerts about server issues immediately." 
                        icon={Smartphone}
                        checked={true}
                        onChange={() => {}}
                    />
                 </div>
            </div>
        )}

      </div>
    </div>
  );
}

// --- Helper Components ---

function TabButton({ active, onClick, icon: Icon, label }: any) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${active ? 'bg-[#352C5E] text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-[#352C5E]'}`}
        >
            <Icon size={16} />
            {label}
        </button>
    );
}

function InputGroup({ label, placeholder, defaultValue, type = "text" }: any) {
    return (
        <div className="text-left">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</label>
            <input 
                type={type} 
                defaultValue={defaultValue} 
                placeholder={placeholder} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#7D65CC] outline-none transition-all font-semibold text-[#352C5E]" 
            />
        </div>
    );
}

function NotificationToggle({ title, desc, icon: Icon, checked, onChange }: any) {
    return (
        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-sm transition-all bg-white">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-[#7D65CC]/10 text-[#7D65CC] rounded-xl">
                    <Icon size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-[#352C5E]">{title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
            </div>
            <button onClick={onChange} className={`transition-colors duration-300 ${checked ? 'text-emerald-500' : 'text-gray-300'}`}>
                {checked ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
            </button>
        </div>
    );
}

// Icon Helper
const DollarSignIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;