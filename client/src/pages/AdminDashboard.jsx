import React, { useState, useEffect } from 'react';
import { noticeService } from '../services/noticeService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { FileText, Grid, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [data, setData] = useState({ notices: [], loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticesRes = await noticeService.getNotices();
        setData({ 
          notices: noticesRes?.data || [], 
          loading: false 
        });
      } catch (err) {
        console.error("Failed to load dashboard info");
        setData(prev => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);

  if (data.loading) return <div className="flex justify-center p-8">Loading dashboard...</div>;

  const totalNotices = data.notices.length;
  const recentNotices = [...data.notices].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  
  // Basic category breakdown
  const categoryCounts = data.notices.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Admin Dashboard
        </h1>
        <p className="text-slate-400 mt-1">Overview of your portal's content.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600/20 to-transparent border-blue-500/20 flex flex-col items-center justify-center p-6 min-h-[160px]">
          <FileText size={40} className="text-blue-400 mb-2" />
          <p className="text-4xl font-bold">{totalNotices}</p>
          <p className="text-slate-400 font-medium">Total Notices</p>
        </Card>

        {Object.entries(categoryCounts).slice(0, 2).map(([cat, count], idx) => (
          <Card key={cat} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex flex-col items-center justify-center p-6 min-h-[160px]">
             <Grid size={32} className={`mb-2 ${idx === 0 ? 'text-emerald-400' : 'text-amber-400'}`} />
             <p className="text-3xl font-bold">{count}</p>
             <p className="text-slate-400 font-medium">{cat}</p>
          </Card>
        ))}
      </div>

      <Card className="flex flex-col gap-4 p-6">
        <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.1)] pb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Calendar size={20} className="text-blue-400"/> Latest Notices</h2>
          <Link to="/admin/notices" className="text-sm text-blue-400 hover:text-blue-300">View All</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {recentNotices.length === 0 ? (
             <p className="text-slate-400 text-center py-4">No notices found.</p>
          ) : recentNotices.map(notice => (
            <div key={notice.id} className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex justify-between items-start">
              <div>
                <h3 className="font-medium text-blue-100">{notice.title}</h3>
                <p className="text-sm text-slate-400 mt-1 line-clamp-1">{notice.content}</p>
              </div>
              <Badge variant={notice.priority === 'high' ? 'danger' : notice.priority === 'medium' ? 'warning' : 'default'} className="whitespace-nowrap ml-4">
                {notice.category}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
