"use client"; // ضروري لأننا نستخدم usePathname لمعرفة الصفحة الحالية

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, // أيقونة للأخصائيين
  CreditCard, 
  Package, 
  FileClock, // أيقونة للسجل (Log)
  Settings, 
  LogOut 
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  // قائمة الروابط كما طلبتها
  const menuItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Specialists', href: '/admin/specialists', icon: Stethoscope },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Payment', href: '/admin/payment', icon: CreditCard },
    { name: 'Packages', href: '/admin/packages', icon: Package },
    { name: 'Log', href: '/admin/log', icon: FileClock },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    // الخلفية كحلية (#352C5E) ثابتة
    <aside className="w-72 h-screen bg-[#352C5E] text-white flex flex-col fixed left-0 top-0 z-40 shadow-2xl overflow-hidden">
      
      {/* --- الشعار (Logo) --- */}
      <div className="h-24 flex items-center justify-center border-b border-white/10 relative">
        {/* دائرة زخرفية خلفية خفيفة */}
        <div className="absolute w-20 h-20 bg-[#E1AD48] opacity-5 rounded-full blur-xl"></div>
        
        <h1 className="text-3xl font-bold tracking-wider relative z-10">
          Kalimni<span className="text-[#E1AD48] text-4xl">.</span>
        </h1>
      </div>

      {/* --- القائمة (Menu) --- */}
      <nav className="flex-1 py-8 px-4 space-y-3 overflow-y-auto custom-scrollbar">
        
        <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 opacity-60">
          Main Menu
        </p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              // تصميم الرابط: تغيير اللون والخلفية بناءً على الحالة
              className={`
                flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
                ${isActive 
                  ? 'bg-[#7D65CC] text-white shadow-lg shadow-[#7D65CC]/30 translate-x-1 font-semibold' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white hover:translate-x-1'}
              `}
            >
              {/* شريط ذهبي جانبي يظهر فقط عند التفعيل */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E1AD48]"></div>
              )}

              {/* الأيقونة */}
              <Icon 
                size={22} 
                // الأيقونة تصبح ذهبية عند التفعيل أو عند تمرير الماوس
                className={`transition-colors duration-300 ${isActive ? 'text-[#E1AD48]' : 'group-hover:text-[#E1AD48]'}`} 
              />
              
              {/* نص الرابط */}
              <span className="tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* --- زر تسجيل الخروج (Logout) --- */}
      <div className="p-6 bg-[#2C2448] border-t border-white/5">
        <button 
          className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl 
                     border border-red-500/30 text-red-300 hover:bg-red-500 hover:text-white 
                     transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-bold">Log out</span>
        </button>
      </div>

    </aside>
  );
}