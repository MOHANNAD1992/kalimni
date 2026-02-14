"use client";

import React from 'react';
import SpecialistSidebar from './components/SpecialistSidebar';
import SpecialistHeader from './components/SpecialistHeader';

export default function SpecialistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      
      {/* Sidebar (Fixed Width w-72) */}
      <SpecialistSidebar />

      {/* Main Content Wrapper 
         تم تعديل ml-64 إلى ml-72 ليطابق عرض السايد بار الجديد ويمنع التداخل
      */}
      <div className="flex-1 ml-72 flex flex-col transition-all duration-300 w-[calc(100%-18rem)]">
        
        {/* Header (Sticky) */}
        <SpecialistHeader />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}