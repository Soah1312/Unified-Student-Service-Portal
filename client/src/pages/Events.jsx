import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/eventService';
import EventCard from '../components/EventCard';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      if (res?.success) setEvents(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic' }}>
      Loading the calendar...
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <div style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24 }}>
        <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Campus Calendar</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            Events
          </h1>
        </div>
      </div>

      {events.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', border: '1px solid var(--border)', background: 'var(--bg-card)', fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--text-muted)' }}>
          No upcoming events on the calendar.
        </div>
      ) : (
        <div className="event-grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} isAdmin={false} />
          ))}
        </div>
      )}
    </div>
  );
}
