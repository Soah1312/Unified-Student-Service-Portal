import React, { useState } from 'react';
import Button from './ui/Button';

export default function NoticeForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'Academic',
    priority: initialData?.priority || 'medium',
    content: initialData?.content || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          placeholder="Notice Title"
        />
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="Academic">Academic</option>
            <option value="Facilities">Facilities</option>
            <option value="Finance">Finance</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Administration">Administration</option>
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-300 mb-1">Priority</label>
          <select 
            name="priority" 
            value={formData.priority} 
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Content</label>
        <textarea 
          name="content" 
          value={formData.content} 
          onChange={handleChange} 
          required 
          rows="5"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          placeholder="Write the notice details here..."
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? 'Update Notice' : 'Create Notice'}
        </Button>
      </div>
    </form>
  );
}
