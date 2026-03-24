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

// Landing Page — Editorial Noir (components inlined, no wrapper page)
import Navbar5 from './components/landing5/Navbar5';
import Hero5 from './components/landing5/Hero5';
import About5 from './components/landing5/About5';
import Features5 from './components/landing5/Features5';
import Testimonials5 from './components/landing5/Testimonials5';
import CTA5 from './components/landing5/CTA5';
import Footer5 from './components/landing5/Footer5';

const LandingPage = () => (
  <div style={{ overflowX: 'hidden' }}>
    <Navbar5 />
    <Hero5 />
    <About5 />
    <Features5 />
    <Testimonials5 />
    <CTA5 />
    <Footer5 />
  </div>
);


export default function App() {
  return (
    <Routes>
      {/* Landing — public home */}
      <Route path="/" element={<LandingPage />} />

      {/* Student Portal */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />

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
      </Route>
    </Routes>
  );
}
