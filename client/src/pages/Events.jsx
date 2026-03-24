import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const currentUserId = 'student_001';

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.getEvents();
      if (res?.success) setEvents(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleRegister = async (eventId) => {
    try {
      const res = await api.registerEvent(eventId, currentUserId);
      if (res?.success) {
        setEvents(events.map(ev => ev.id === eventId
          ? { ...ev, registeredUsers: [...(ev.registeredUsers || []), currentUserId] }
          : ev
        ));
      } else alert(res?.message || 'Registration failed');
    } catch { alert('Error registering for event'); }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      const res = await api.deleteEvent(eventId);
      if (res?.success) setEvents(events.filter(ev => ev.id !== eventId));
      else alert(res?.message || 'Delete failed');
    } catch { alert('Error deleting event'); }
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} style={{ accentColor: 'var(--accent)' }} />
              Admin Mode
            </label>
            {isAdmin && (
              <Link to="/events/create" style={{
                padding: '10px 20px', background: 'var(--text-primary)', color: 'var(--text-invert)',
                border: '2px solid var(--border-dark)', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-block',
              }}>
                + Create Event
              </Link>
            )}
          </div>
        </div>
      </div>

      {events.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', border: '1px solid var(--border)', background: 'var(--bg-card)', fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--text-muted)' }}>
          No upcoming events on the calendar.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {events.map(event => (
            <EventCard key={event.id} event={event} onRegister={handleRegister} onDelete={handleDelete} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
