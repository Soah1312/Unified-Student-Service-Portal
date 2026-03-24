import React from 'react';

const EventCard = ({ event, onRegister, onDelete, isAdmin }) => {
  const seatsLeft = event.seats - (event.registeredUsers?.length || 0);
  const isFull = seatsLeft <= 0;
  const isRegistered = event.registeredUsers?.includes('student_001');

  const dateObj = new Date(event.date);
  const dayStr = dateObj.toLocaleDateString('en-US', { day: '2-digit' });
  const monStr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--border-dark)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Date strip */}
      <div style={{
        background: 'var(--bg-dark)', padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 16,
        borderBottom: '1px solid rgba(245,245,240,0.08)',
      }}>
        <div style={{ textAlign: 'center', minWidth: 48 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)' }}>{monStr}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'var(--text-invert)', lineHeight: 1 }}>{dayStr}</div>
        </div>
        <div style={{ width: 1, height: 40, background: 'rgba(245,245,240,0.1)' }} />
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(245,245,240,0.4)', textTransform: 'uppercase' }}>
            {event.location}
          </div>
          {event.time && (
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(245,245,240,0.6)', marginTop: 2 }}>{event.time}</div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 19, fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.2, letterSpacing: '-0.01em',
        }}>
          {event.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
          {event.description}
        </p>

        {/* Seats bar */}
        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span className="editorial-label">{seatsLeft} seats left</span>
            <span className="editorial-label">{event.seats} total</span>
          </div>
          <div style={{ height: 3, background: 'var(--bg-secondary)', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, height: '100%',
              width: `${Math.max(0, (seatsLeft / event.seats) * 100)}%`,
              background: isFull ? 'var(--accent)' : 'var(--text-primary)',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Footer / Action */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
        {!isAdmin && (
          <button
            disabled={isFull || isRegistered}
            onClick={() => onRegister(event.id)}
            style={{
              padding: '10px 24px',
              background: isRegistered ? 'transparent' : isFull ? 'var(--bg-secondary)' : 'var(--text-primary)',
              color: isRegistered ? 'var(--text-secondary)' : isFull ? 'var(--text-muted)' : 'var(--text-invert)',
              border: isRegistered ? '1.5px solid var(--border)' : '1.5px solid var(--border-dark)',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: (isFull || isRegistered) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: (isFull || isRegistered) ? 0.7 : 1,
            }}
            onMouseEnter={e => { if (!isFull && !isRegistered) { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; } }}
            onMouseLeave={e => { if (!isFull && !isRegistered) { e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-dark)'; } }}
          >
            {isRegistered ? '✓ Registered' : isFull ? 'Fully Booked' : 'Register →'}
          </button>
        )}
        {isAdmin && (
          <button
            onClick={() => onDelete(event.id)}
            style={{
              padding: '10px 24px',
              background: 'transparent', color: 'var(--accent)',
              border: '1.5px solid rgba(255,51,51,0.3)',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,51,51,0.3)'; e.currentTarget.style.color = 'var(--accent)'; }}
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
