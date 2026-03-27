import React, { useState } from 'react';
import Button from './ui/Button';

const EventForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    seats: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      seats: parseInt(formData.seats, 10) || 0
    });
  };

  const fieldStyle = { display: 'flex', flexDirection: 'column', gap: 6 };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={fieldStyle}>
        <label className="editorial-label-field">Event Title</label>
        <input 
          type="text" 
          name="title" 
          required 
          value={formData.title} 
          onChange={handleChange}
          className="editorial-input"
          placeholder="e.g. Annual Tech Symposium"
        />
      </div>
      
      <div style={fieldStyle}>
        <label className="editorial-label-field">Description</label>
        <textarea 
          name="description" 
          required 
          rows="4"
          value={formData.description} 
          onChange={handleChange}
          className="editorial-input"
          placeholder="Detailed description of the event..."
          style={{ resize: 'vertical', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
        ></textarea>
      </div>

      <div className="form-row-2">
        <div style={fieldStyle}>
          <label className="editorial-label-field">Date</label>
          <input 
            type="date" 
            name="date" 
            required 
            value={formData.date} 
            onChange={handleChange}
            className="editorial-input"
          />
        </div>
        
        <div style={fieldStyle}>
          <label className="editorial-label-field">Time</label>
          <input 
            type="time" 
            name="time" 
            value={formData.time} 
            onChange={handleChange}
            className="editorial-input"
          />
        </div>
      </div>

      <div className="form-row-2">
        <div style={fieldStyle}>
          <label className="editorial-label-field">Location</label>
          <input 
            type="text" 
            name="location" 
            required 
            value={formData.location} 
            onChange={handleChange}
            className="editorial-input"
            placeholder="e.g. Main Auditorium"
          />
        </div>
        
        <div style={fieldStyle}>
          <label className="editorial-label-field">Total Seats</label>
          <input 
            type="number" 
            name="seats" 
            required 
            min="1"
            value={formData.seats} 
            onChange={handleChange}
            className="editorial-input"
            placeholder="e.g. 150"
          />
        </div>
      </div>

      <hr className="editorial-rule" />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <Button 
          type="button" 
          onClick={onCancel}
          variant="ghost"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          variant="primary"
        >
          Publish Event
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
