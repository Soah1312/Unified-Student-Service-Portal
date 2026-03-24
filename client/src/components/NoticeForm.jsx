import React, { useState } from 'react';
import Button from './ui/Button';

export default function NoticeForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    title:    initialData?.title    || '',
    category: initialData?.category || 'Academic',
    content:  initialData?.content  || '',
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  const fieldStyle = { display: 'flex', flexDirection: 'column', gap: 6 };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Title */}
      <div style={fieldStyle}>
        <label className="editorial-label-field">Notice Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g. Examination Schedule — April 2025"
          className="editorial-input"
        />
      </div>

      {/* Category */}
      <div style={fieldStyle}>
        <label className="editorial-label-field">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="editorial-input"
        >
          {['Academic', 'Facilities', 'Finance', 'Infrastructure', 'Administration'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div style={fieldStyle}>
        <label className="editorial-label-field">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Write the full notice here..."
          className="editorial-input"
          style={{ resize: 'vertical', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
        />
      </div>


      <hr className="editorial-rule" />

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? 'Update Notice' : 'Publish Notice'}
        </Button>
      </div>
    </form>
  );
}
