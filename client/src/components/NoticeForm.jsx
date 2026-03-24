import React, { useState } from 'react';
import Button from './ui/Button';

export default function NoticeForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    title:    initialData?.title    || '',
    category: initialData?.category || 'Academic',
    priority: initialData?.priority || 'medium',
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

      {/* Category + Priority row */}
      <div className="form-row-2">
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
        <div style={fieldStyle}>
          <label className="editorial-label-field">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="editorial-input"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
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

      {/* Priority indicator */}
      {formData.priority === 'high' && (
        <div style={{ padding: '10px 14px', borderLeft: '3px solid var(--accent)', background: 'rgba(255,51,51,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-ui)', fontWeight: 600 }}>
            HIGH PRIORITY — This notice will be highlighted in bold red across all views.
          </span>
        </div>
      )}

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
