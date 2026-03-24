import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar';

export default function AdminLayout() {
  const isAdmin = localStorage.getItem('isAdmin');

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
