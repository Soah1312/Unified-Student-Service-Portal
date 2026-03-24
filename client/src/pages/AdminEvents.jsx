import React, { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../services/eventService';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';

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

  if (loading) return <div>Loading events...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '3px solid var(--border-dark)', paddingBottom: 24 }}>
        <div>
          <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Management Console</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
            Events.
          </h1>
        </div>
        <Link to="/admin/events/create" style={{
          padding: '12px 24px', background: 'var(--text-primary)', color: 'var(--text-invert)',
          border: 'none', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
          textDecoration: 'none'
        }}>
          + Add New Event
        </Link>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            isAdmin={true} 
            onDelete={handleDelete} 
          />
        ))}
        {events.length === 0 && (
          <div style={{ gridColumn: '1/-1', padding: '48px', textAlign: 'center', border: '1px solid var(--border)', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            No events found. Start by creating one.
          </div>
        )}
      </div>
    </div>
  );
}
