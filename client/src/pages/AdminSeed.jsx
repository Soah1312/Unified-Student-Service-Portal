import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Button from '../components/ui/Button';
import { Database, Trash2, RefreshCw, ChevronRight, CheckCircle, XCircle, Loader } from 'lucide-react';

/* ─── Seed data ─────────────────────────────────────────────────────────── */

const NOTICES = [
  { title: 'End Semester Examination Schedule Released', category: 'Academic', priority: 'high', content: 'The end semester examination schedule for the current academic term has been officially released. Students are advised to check the timetable carefully and plan their preparation accordingly. Any clashes must be reported to the Academic Office within 3 days.', date: '2026-03-20', author: 'Academic Office', comments: [] },
  { title: 'Library Timing Extended During Exam Season', category: 'Facilities', priority: 'medium', content: 'The Central Library will remain open until 11 PM on all weekdays and 8 PM on weekends starting from April 1st until the end of the examination period. Students are encouraged to make use of this facility.', date: '2026-03-18', author: 'Library Administration', comments: [] },
  { title: 'Scholarship Application Deadline Extended', category: 'Finance', priority: 'high', content: 'The deadline for the Merit Scholarship and Need-Based Financial Aid applications has been extended to April 15th, 2026. Students who missed the original deadline are encouraged to apply. All applications must be submitted online through the Student Portal.', date: '2026-03-15', author: 'Finance Department', comments: [] },
  { title: 'Campus Wi-Fi Maintenance — April 2nd', category: 'Infrastructure', priority: 'medium', content: 'Scheduled maintenance on the campus-wide Wi-Fi network will take place on April 2nd from 2 AM to 6 AM. During this window, internet services will be unavailable. We apologise for any inconvenience.', date: '2026-03-14', author: 'IT Department', comments: [] },
  { title: 'Anti-Ragging Policy Reminder', category: 'Administration', priority: 'low', content: 'A reminder to all students regarding the zero-tolerance anti-ragging policy. Any complaints can be reported to the Anti-Ragging Committee or via the anonymous helpline 1800-XXX-XXXX. The college takes all complaints seriously.', date: '2026-03-10', author: 'Student Affairs', comments: [] },
];

const EVENTS = [
  { title: 'Annual Tech Fest — TechZen 2026', description: 'A two-day celebration of technology, innovation, and competitive coding. Featuring hackathons, workshops, blind coding rounds, and keynotes from industry leaders.', date: '2026-04-10', time: '9:00 AM', location: 'Main Auditorium' },
  { title: 'Cultural Night — Tarang 2026', description: 'The annual cultural extravaganza showcasing the diverse talent of our student community. Performances across music, dance, stand-up comedy, and street plays.', date: '2026-04-18', time: '6:00 PM', location: 'Open Air Theatre' },
  { title: 'Campus Career Fair 2026', description: 'Meet recruiters from 60+ top companies spanning tech, finance, consulting, and media. Bring your CV and prepare for on-spot interviews.', date: '2026-04-22', time: '10:00 AM', location: 'Sports Hall' },
  { title: 'Guest Lecture: AI in Modern Education', description: 'A distinguished guest lecture featuring Dr. Priya Kapoor from IIT Delhi on how Artificial Intelligence is reshaping pedagogy and student assessments.', date: '2026-04-05', time: '11:00 AM', location: 'Seminar Room 3, Block B' },
  { title: 'Inter-College Debate Championship', description: 'Represent the college in the regional inter-college debate tournament. Topics will cover contemporary socio-political issues.', date: '2026-04-08', time: '10:30 AM', location: 'Debate Hall, Admin Block' },
  { title: 'Annual Sports Day — Spardha 2026', description: 'The biggest sporting event of the year. Events include track & field, basketball, football, badminton, and chess.', date: '2026-04-14', time: '8:00 AM', location: 'Main Sports Ground' },
  { title: 'Photography & Fine Arts Exhibition', description: 'An open exhibition of student-created artwork and photography. Submissions open to all departments; selected works displayed in the college gallery.', date: '2026-04-17', time: '2:00 PM', location: 'Art Gallery, Ground Floor' },
  { title: 'Entrepreneurship Summit 2026', description: 'A half-day summit featuring student startup pitches, a panel discussion with local founders, and a seed funding competition.', date: '2026-04-24', time: '9:30 AM', location: 'Conference Hall, Block A' },
  { title: 'Workshop: Resume & Interview Masterclass', description: 'A hands-on workshop run by the Placement Cell and industry mentors on crafting ATS-friendly resumes and acing interview rounds.', date: '2026-04-02', time: '3:00 PM', location: 'Lecture Hall 7' },
  { title: 'Blood Donation Camp', description: 'In association with the Red Cross Society. All students and staff are encouraged to participate. Free health check-up for all donors.', date: '2026-04-07', time: '9:00 AM', location: 'Medical Centre, Ground Floor' },
];

const NOTIFICATIONS = [
  { type: 'notice', title: 'New Notice: Exam Schedule Released', message: 'The end semester examination schedule has been released. Click to view.', link: '/notices' },
  { type: 'event', title: 'Upcoming: Annual Tech Fest — TechZen 2026', message: 'TechZen 2026 is happening on April 10th at the Main Auditorium. Don\'t miss out!', link: '/events' },
  { type: 'alert', title: 'Scholarship Deadline Extended', message: 'The scholarship application deadline has been extended to April 15th.', link: '/notices' },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

async function clearCollection(name) {
  const snap = await getDocs(collection(db, name));
  for (const d of snap.docs) await deleteDoc(doc(db, name, d.id));
  return snap.size;
}

async function seedCollection(name, items) {
  for (const item of items) {
    await addDoc(collection(db, name), { ...item, createdAt: serverTimestamp() });
  }
}

/* ─── Log entry component ────────────────────────────────────────────────── */

function LogLine({ entry }) {
  const icons = {
    info:    <ChevronRight size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />,
    success: <CheckCircle  size={13} style={{ color: '#4ade80', flexShrink: 0 }} />,
    error:   <XCircle      size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />,
    running: <Loader       size={13} style={{ color: '#60a5fa', flexShrink: 0, animation: 'spin 1s linear infinite' }} />,
  };
  const colors = { info: 'rgba(245,245,240,0.5)', success: '#4ade80', error: 'var(--accent)', running: '#60a5fa' };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '3px 0' }}>
      {icons[entry.type] || icons.info}
      <span style={{ fontFamily: 'monospace', fontSize: 12.5, color: colors[entry.type] || colors.info, lineHeight: 1.5 }}>
        {entry.text}
      </span>
    </div>
  );
}

/* ─── Seed option card ───────────────────────────────────────────────────── */

function SeedOption({ icon, title, description, count, onSeed, onClear, disabled }) {
  return (
    <div style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {icon}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>{title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{description}</div>
          </div>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', border: '1px solid var(--border)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', letterSpacing: '0.05em', flexShrink: 0 }}>
          {count} records
        </div>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 8 }}>
        <Button variant="primary" size="sm" onClick={onSeed} disabled={disabled} icon={<Database size={13} />}>
          Seed
        </Button>
        <Button variant="ghost" size="sm" onClick={onClear} disabled={disabled} icon={<Trash2 size={13} />}>
          Clear
        </Button>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */

export default function AdminSeed() {
  const [logs, setLogs]       = useState([]);
  const [running, setRunning] = useState(false);
  const logEndRef = useRef(null);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  const log = (text, type = 'info') => setLogs(prev => [...prev, { text, type, id: Date.now() + Math.random() }]);

  const run = async (fn) => {
    setRunning(true);
    try { await fn(); }
    catch (e) { log(`Error: ${e.message}`, 'error'); }
    setRunning(false);
  };

  /* Individual collection actions */
  const seedNotices = () => run(async () => {
    log('Seeding notices...', 'running');
    await seedCollection('notices', NOTICES);
    log(`✓ Seeded ${NOTICES.length} notices.`, 'success');
  });

  const clearNotices = () => run(async () => {
    log('Clearing notices...', 'running');
    const n = await clearCollection('notices');
    log(`✓ Removed ${n} notice${n !== 1 ? 's' : ''}.`, 'success');
  });

  const seedEvents = () => run(async () => {
    log('Seeding events...', 'running');
    await seedCollection('events', EVENTS);
    log(`✓ Seeded ${EVENTS.length} events.`, 'success');
  });

  const clearEvents = () => run(async () => {
    log('Clearing events...', 'running');
    const n = await clearCollection('events');
    log(`✓ Removed ${n} event${n !== 1 ? 's' : ''}.`, 'success');
  });

  const seedNotifications = () => run(async () => {
    log('Seeding notifications...', 'running');
    await seedCollection('notifications', NOTIFICATIONS);
    log(`✓ Seeded ${NOTIFICATIONS.length} notifications.`, 'success');
  });

  const clearNotifications = () => run(async () => {
    log('Clearing notifications...', 'running');
    const n = await clearCollection('notifications');
    log(`✓ Removed ${n} notification${n !== 1 ? 's' : ''}.`, 'success');
  });

  /* Bulk actions */
  const seedAll = () => run(async () => {
    log('── Seeding all collections ──', 'info');
    log('Clearing existing data...', 'running');
    const [cn, ce, cno] = await Promise.all([clearCollection('notices'), clearCollection('events'), clearCollection('notifications')]);
    log(`  Cleared ${cn} notices, ${ce} events, ${cno} notifications.`, 'info');
    log('Seeding notices...', 'running');
    await seedCollection('notices', NOTICES);
    log(`  ✓ ${NOTICES.length} notices added.`, 'success');
    log('Seeding events...', 'running');
    await seedCollection('events', EVENTS);
    log(`  ✓ ${EVENTS.length} events added.`, 'success');
    log('Seeding notifications...', 'running');
    await seedCollection('notifications', NOTIFICATIONS);
    log(`  ✓ ${NOTIFICATIONS.length} notifications added.`, 'success');
    log('── All collections seeded successfully ──', 'success');
  });

  const clearAll = () => run(async () => {
    log('── Clearing all collections ──', 'info');
    const [cn, ce, cno] = await Promise.all([clearCollection('notices'), clearCollection('events'), clearCollection('notifications')]);
    log(`✓ Removed ${cn} notices, ${ce} events, ${cno} notifications.`, 'success');
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <header style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Admin · Database</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            Seed Test Data
          </h1>
          <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
            Populate Firestore with sample data. Use individual controls or bulk-seed everything at once.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="secondary" size="sm" onClick={clearAll} disabled={running} icon={<Trash2 size={14} />}>
            Clear All
          </Button>
          <Button variant="primary" onClick={seedAll} disabled={running} icon={<RefreshCw size={14} />}>
            Seed Everything
          </Button>
        </div>
      </header>

      {/* Collection cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        <SeedOption
          icon={<span style={{ fontSize: 16 }}>📋</span>}
          title="Notices"
          description="Official announcements for students"
          count={NOTICES.length}
          onSeed={seedNotices}
          onClear={clearNotices}
          disabled={running}
        />
        <SeedOption
          icon={<span style={{ fontSize: 16 }}>📅</span>}
          title="Events"
          description="Campus events and activities"
          count={EVENTS.length}
          onSeed={seedEvents}
          onClear={clearEvents}
          disabled={running}
        />
        <SeedOption
          icon={<span style={{ fontSize: 16 }}>🔔</span>}
          title="Notifications"
          description="Push notification records"
          count={NOTIFICATIONS.length}
          onSeed={seedNotifications}
          onClear={clearNotifications}
          disabled={running}
        />
      </div>

      {/* Live log terminal */}
      <div style={{ border: '1px solid var(--border)' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginLeft: 4 }}>Activity Log</span>
            {running && <Loader size={12} style={{ color: '#60a5fa', animation: 'spin 1s linear infinite', marginLeft: 4 }} />}
          </div>
          {logs.length > 0 && (
            <button
              onClick={() => setLogs([])}
              style={{ fontSize: 11, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-ui)' }}
            >
              Clear log
            </button>
          )}
        </div>
        <div style={{
          background: '#0f0f0f', minHeight: 180, maxHeight: 280, overflowY: 'auto',
          padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {logs.length === 0 ? (
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(245,245,240,0.2)', fontStyle: 'italic' }}>
              No activity yet. Use the controls above to seed or clear data.
            </span>
          ) : (
            logs.map(entry => <LogLine key={entry.id} entry={entry} />)
          )}
          <div ref={logEndRef} />
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
