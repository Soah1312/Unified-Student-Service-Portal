import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Notices from './pages/Notices';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

// Admin layout and pages
import AdminLayout from './components/layout/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminNotices from './pages/AdminNotices';
import CreateNotice from './pages/CreateNotice';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-full pt-20">
            <h1 className="text-4xl font-bold text-slate-600 mb-2">404</h1>
            <p className="text-slate-400">Page not found</p>
          </div>
        } />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="notices/create" element={<CreateNotice />} />
        <Route path="notices/edit/:id" element={<CreateNotice />} />
      </Route>
    </Routes>
  );
}
