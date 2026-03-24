import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { noticeService } from '../services/noticeService';
import NoticeCard from '../components/NoticeCard';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await noticeService.getNotices();
      if (res.success) {
        setNotices(res.data);
      }
    } catch (err) {
      console.error('Error fetching notices', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      const res = await noticeService.deleteNotice(id);
      if (res.success) {
        setNotices(prev => prev.filter(n => n.id !== id));
      } else {
        alert(res.message || "Failed to delete notice");
      }
    }
  };

  const handleEdit = (notice) => {
    navigate(`/admin/notices/edit/${notice.id}`, { state: { notice } });
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Notices Management
          </h1>
          <p className="text-slate-400 mt-1">Create, update, and manage student portal notices here.</p>
        </div>
        
        <Button onClick={() => navigate('/admin/notices/create')} variant="primary" className="flex items-center gap-2">
          <Plus size={18} /> New Notice
        </Button>
      </header>

      {loading ? (
        <div className="text-slate-400 text-center py-10">Loading notices...</div>
      ) : notices.length === 0 ? (
        <div className="text-slate-400 border border-slate-800 bg-slate-900/50 rounded-lg text-center py-12 flex flex-col items-center">
          <p className="mb-4">No notices found.</p>
          <Button onClick={() => navigate('/admin/notices/create')} variant="secondary">Create One Now</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map(notice => (
            <NoticeCard 
              key={notice.id} 
              notice={notice} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
