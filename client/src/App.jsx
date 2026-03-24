import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Notices from './pages/Notices';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Notifications from './pages/Notifications';

// Admin layout and pages
import AdminLayout from './components/layout/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminNotices from './pages/AdminNotices';
import AdminEvents from './pages/AdminEvents';
import CreateNotice from './pages/CreateNotice';

export default function App() {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Student Portal */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="*" element={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: 'var(--font-display)', gap: 8 }}>
            <h1 style={{ fontSize: 80, fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>404</h1>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', fontStyle: 'italic' }}>Page not found.</p>
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
        <Route path="events" element={<AdminEvents />} />
        <Route path="events/create" element={<CreateEvent />} />
      </Route>
    </Routes>
  );
}
