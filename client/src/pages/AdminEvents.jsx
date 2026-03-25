import React, { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../services/eventService';
import EventCard from '../components/EventCard';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      if (res?.success) setEvents(res.data);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    const res = await deleteEvent(id);
    if (res?.success) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic' }}>
      Loading events...
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <header style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Admin · Events</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            Event Management
          </h1>
          <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
            Publish and manage campus events for students.
          </p>
        </div>
        <Link to="/admin/events/create" style={{ textDecoration: 'none' }}>
          <Button variant="primary" icon={<Plus size={16} />}>
            New Event
          </Button>
        </Link>
      </header>

      {events.length === 0 ? (
        <div style={{ padding: '64px 24px', textAlign: 'center', border: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--text-muted)' }}>No events found.</p>
          <Link to="/admin/events/create" style={{ textDecoration: 'none' }}>
            <Button variant="secondary">Create the first event →</Button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isAdmin={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
