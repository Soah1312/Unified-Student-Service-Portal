import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { createEvent } from '../services/eventService';

export default function CreateEvent() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      const res = await createEvent(data);
      if (res?.success) {
        navigate('/admin/events');
      } else {
        alert(res?.message || 'Failed to create event');
      }
    } catch (e) {
      alert("Error creating event");
      console.error(e);
    }
  };

  const handleCancel = () => navigate('/admin/events');

  return (
    <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <header style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24 }}>
        <div className="editorial-label-accent" style={{ marginBottom: 8 }}>
          Events · Create
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          Publish New Event
        </h1>
        <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
          Add a new event to the campus calendar for all students to view.
        </p>
      </header>

      {/* Form */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '32px' }}>
        <EventForm onSubmit={handleCreate} onCancel={handleCancel} />
      </div>
    </div>
  );
}
