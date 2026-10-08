'use client';

import React from 'react';
import { StudentSidebar } from '@/components/navigation/student-sidebar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <StudentSidebar />
      <main className="flex-1 lg:pl-64 flex flex-col pb-20 lg:pb-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
