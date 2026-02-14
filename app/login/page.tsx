"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Shield, Stethoscope, CheckCircle2 } from 'lucide-react';

export default function ExecutivePortal() {
  const router = useRouter();
  const [role, setRole] = useState<'admin' | 'specialist'>('admin');
  const [isNavigating, setIsNavigating] = useState(false);

  const isAdmin = role === 'admin';

  const handleAccess = () => {
    setIsNavigating(true);
    // محاكاة تحميل أنيقة وجدية
    setTimeout(() => {
      router.push(`/${role}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4 sm:p-8 font-sans selection:bg-[#352C5E] selection:text-white">
      
      {/* شبكة هندسية خفيفة جداً لتعكس الدقة والاحترافية */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center">
        
        {/* --- الشعار --- */}
        <div className="mb-12">
          <Image 
            src="/logo.png" 
            alt="Kalimni Logo"
            width={160} 
            height={55} 
            priority 
            className="h-auto w-auto object-contain"
          />
        </div>

        {/* --- العناوين الرئيسية (طباعة قوية وجدية) --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
            Secure System Access
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Please select your designated workspace to authenticate and securely route your connection.
          </p>
        </div>

        {/* --- بطاقات الاختيار الضخمة (The Selection Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
          
          {/* 1. بطاقة الآدمن */}
          <div 
            onClick={() => setRole('admin')}
            className={`relative group cursor-pointer rounded-2xl p-8 transition-all duration-300 border-2 text-left bg-white
              ${isAdmin 
                ? 'border-[#352C5E] shadow-[0_10px_30px_-10px_rgba(53,44,94,0.15)] ring-4 ring-[#352C5E]/5' 
                : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100 shadow-sm'}`}
          >
            {isAdmin && (
              <div className="absolute top-6 right-6 text-[#352C5E]">
                <CheckCircle2 size={24} className="animate-in zoom-in duration-300" />
              </div>
            )}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300
              ${isAdmin ? 'bg-[#352C5E] text-white' : 'bg-gray-100 text-gray-400'}`}>
              <Shield size={28} />
            </div>
            <h2 className={`text-2xl font-bold mb-2 transition-colors ${isAdmin ? 'text-[#352C5E]' : 'text-gray-900'}`}>
              Administration
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Global platform oversight. Manage users, specialists, financials, and core system configurations.
            </p>
          </div>

          {/* 2. بطاقة الأخصائي */}
          <div 
            onClick={() => setRole('specialist')}
            className={`relative group cursor-pointer rounded-2xl p-8 transition-all duration-300 border-2 text-left bg-white
              ${!isAdmin 
                ? 'border-[#E1AD48] shadow-[0_10px_30px_-10px_rgba(225,173,72,0.2)] ring-4 ring-[#E1AD48]/10' 
                : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100 shadow-sm'}`}
          >
            {!isAdmin && (
              <div className="absolute top-6 right-6 text-[#E1AD48]">
                <CheckCircle2 size={24} className="animate-in zoom-in duration-300" />
              </div>
            )}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300
              ${!isAdmin ? 'bg-[#E1AD48] text-white' : 'bg-gray-100 text-gray-400'}`}>
              <Stethoscope size={28} />
            </div>
            <h2 className={`text-2xl font-bold mb-2 transition-colors ${!isAdmin ? 'text-[#352C5E]' : 'text-gray-900'}`}>
              Specialist Clinic
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your private workspace. Conduct consultations, manage patient records, and organize your schedule.
            </p>
          </div>

        </div>

        {/* --- زر الدخول الموحد (The Action Button) --- */}
        <div className="w-full max-w-md">
          <button
            onClick={handleAccess}
            disabled={isNavigating}
            className={`w-full flex items-center justify-center gap-3 py-4.5 rounded-xl text-lg font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-80
              ${isAdmin ? 'bg-[#352C5E] hover:bg-[#282147] shadow-[#352C5E]/20' : 'bg-[#E1AD48] hover:bg-[#c99a3c] shadow-[#E1AD48]/20'}`}
          >
            {isNavigating ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Proceed to {isAdmin ? 'Administration' : 'Clinic'}
                <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* --- الفوتر --- */}
        <div className="mt-16 text-center text-xs text-gray-400 font-medium uppercase tracking-widest">
          Secured By Kalimni Infrastructure • {new Date().getFullYear()}
        </div>

      </div>
    </div>
  );
}