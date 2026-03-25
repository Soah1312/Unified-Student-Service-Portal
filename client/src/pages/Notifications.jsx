import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Bell, Check, Info, AlertTriangle, Calendar, Award } from 'lucide-react';

const iconMap = {
  notice: <Info size={18} />,
  event:  <Calendar size={18} />,
  alert:  <AlertTriangle size={18} />,
  system: <Award size={18} />,
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchNotifications(); }, []);

  const fetchNotifications = async () => {
    const res = await userService.getNotifications();
    if (res?.success) setNotifications(res.data);
    setLoading(false);
  };

  const markAsRead = async (id) => {
    userService.markNotificationRead(id);
    setNotifications(n => n.map(x => String(x.id) === String(id) ? { ...x, read: true } : x));
    // Trigger storage event for Navbar
    window.dispatchEvent(new Event('storage'));
  };

  const markAllAsRead = async () => {
    userService.markAllNotificationsRead(notifications);
    setNotifications(n => n.map(x => ({ ...x, read: true })));
    // Trigger storage event for Navbar
    window.dispatchEvent(new Event('storage'));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic' }}>
      Loading notifications...
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 860, fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <div style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Inbox</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: 16 }}>
            Notifications
            {unreadCount > 0 && <Badge variant="danger">{unreadCount} new</Badge>}
          </h1>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllAsRead} icon={<Check size={14} />}>
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div style={{ padding: '64px 24px', textAlign: 'center', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <Bell size={40} style={{ margin: '0 auto 16px', color: 'var(--text-muted)', opacity: 0.4 }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--text-muted)' }}>Your inbox is clear.</p>
        </div>
      ) : (
        <div style={{ border: '1px solid var(--border)' }}>
          {notifications.map((notif, i) => (
            <div
              key={notif.id}
              style={{
                display: 'flex', gap: 16, padding: '20px 24px',
                borderBottom: i < notifications.length - 1 ? '1px solid var(--border)' : 'none',
                borderLeft: !notif.read ? '3px solid var(--accent)' : '3px solid transparent',
                background: !notif.read ? 'rgba(255,51,51,0.02)' : 'var(--bg-card)',
                opacity: notif.read ? 0.65 : 1,
                transition: 'background 0.15s',
              }}
            >
              <div style={{
                width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--border)', background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
              }}>
                {iconMap[notif.type] || <Bell size={18} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{notif.title}</h3>
                  <span className="editorial-label" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                    {new Date(notif.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p style={{ fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>{notif.message}</p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {notif.link && (
                    <a href={notif.link} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid rgba(255,51,51,0.3)' }}>
                      View details →
                    </a>
                  )}
                  {!notif.read && (
                    <button onClick={() => markAsRead(notif.id)} style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
