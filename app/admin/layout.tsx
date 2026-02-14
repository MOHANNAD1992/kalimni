import React from 'react';

// 1. تأكد أن الاستيراد بدون أقواس {}
// 2. تأكد أن المسار ./components/ وليس ../components/
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex text-right">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-72 min-h-screen">
        
        {/* هنا كان الخطأ، الآن سيعمل إذا كان الاستيراد صحيحاً */}
        <AdminHeader />

        <main className="p-8 overflow-y-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}