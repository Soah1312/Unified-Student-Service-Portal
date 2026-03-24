import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { noticeService } from '../services/noticeService';
import NoticeForm from '../components/NoticeForm';
import Card from '../components/ui/Card';

export default function CreateNotice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // If editing, we extract it from navigation state
  const isEditing = Boolean(id);
  const initialData = location.state?.notice || null;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    try {
      let res;
      if (isEditing) {
        res = await noticeService.updateNotice(id, formData);
      } else {
        res = await noticeService.createNotice(formData);
      }
      
      if (res.success) {
        navigate('/admin/notices');
      } else {
        setError(res.message || 'Operation failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold text-white">
          {isEditing ? 'Edit Notice' : 'Create New Notice'}
        </h1>
        <p className="text-slate-400 mt-1">
          {isEditing ? 'Update the details below.' : 'Broadcast a new announcement to the student portal.'}
        </p>
      </header>

      <Card className="p-6 bg-slate-900 border border-slate-800">
        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 text-sm border border-red-500/20">
            {error}
          </div>
        )}
        
        <NoticeForm 
          initialData={initialData} 
          onSubmit={handleSubmit} 
          onCancel={() => navigate('/admin/notices')}
          isSubmitting={isSubmitting}
        />
      </Card>
    </div>
  );
}
