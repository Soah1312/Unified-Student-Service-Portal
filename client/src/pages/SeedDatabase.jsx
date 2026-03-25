import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const NOTICES = [
  {
    title: "End Semester Examination Schedule Released",
    category: "Academic",
    content: "The end semester examination schedule for the current academic term has been officially released. Students are advised to check the timetable carefully and plan their preparation accordingly. Any clashes must be reported to the Academic Office within 3 days.",
    date: "2026-03-20",
    author: "Academic Office",
    comments: [],
  },
  {
    title: "Library Timing Extended During Exam Season",
    category: "Facilities",
    content: "The Central Library will remain open until 11 PM on all weekdays and 8 PM on weekends starting from April 1st until the end of examination period. Students are encouraged to make use of this facility.",
    date: "2026-03-18",
    author: "Library Administration",
    comments: [],
  },
  {
    title: "Scholarship Application Deadline Extended",
    category: "Finance",
    content: "The deadline for the Merit Scholarship and Need-Based Financial Aid applications has been extended to April 15th, 2026. Students who missed the original deadline are encouraged to apply. All applications must be submitted online through the Student Portal.",
    date: "2026-03-15",
    author: "Finance Department",
    comments: [],
  },
  {
    title: "Campus Wi-Fi Maintenance - April 2nd",
    category: "Infrastructure",
    content: "Scheduled maintenance on the campus-wide Wi-Fi network will take place on April 2nd from 2 AM to 6 AM. During this window, internet services will be unavailable. We apologize for any inconvenience.",
    date: "2026-03-14",
    author: "IT Department",
    comments: [],
  },
  {
    title: "Anti-Ragging Policy Reminder",
    category: "Administration",
    content: "A reminder to all students regarding the zero-tolerance anti-ragging policy. Any complaints can be reported to the Anti-Ragging Committee or via the anonymous helpline 1800-XXX-XXXX. The college takes all complaints seriously.",
    date: "2026-03-10",
    author: "Student Affairs",
    comments: [],
  },
];

const EVENTS = [
  {
    title: "Annual Tech Fest — TechZen 2026",
    description: "A two-day celebration of technology, innovation, and competitive coding. Featuring hackathons, workshops, blind coding rounds, and keynotes from industry leaders at top tech firms.",
    date: "2026-04-10",
    time: "9:00 AM",
    location: "Main Auditorium",
  },
  {
    title: "Cultural Night — Tarang 2026",
    description: "The annual cultural extravaganza showcasing the diverse talent of our student community. Performances across music, classical and contemporary dance, stand-up comedy, and street plays.",
    date: "2026-04-18",
    time: "6:00 PM",
    location: "Open Air Theatre",
  },
  {
    title: "Campus Career Fair 2026",
    description: "Meet recruiters from 60+ top companies spanning tech, finance, consulting, and media. Bring your CV and prepare for on-spot interviews for both internships and full-time roles.",
    date: "2026-04-22",
    time: "10:00 AM",
    location: "Sports Hall",
  },
  {
    title: "Guest Lecture: AI in Modern Education",
    description: "A distinguished guest lecture featuring Dr. Priya Kapoor from IIT Delhi on how Artificial Intelligence is reshaping pedagogy, research, and student assessments in higher education.",
    date: "2026-04-05",
    time: "11:00 AM",
    location: "Seminar Room 3, Block B",
  },
  {
    title: "Inter-College Debate Championship",
    description: "Represent the college in the regional inter-college debate tournament. Topics will cover contemporary socio-political issues. Short-listing rounds will be held this week.",
    date: "2026-04-08",
    time: "10:30 AM",
    location: "Debate Hall, Admin Block",
  },
  {
    title: "Annual Sports Day — Spardha 2026",
    description: "The biggest sporting event of the year. Events include track & field, basketball, football, badminton, and chess. Register at the Sports Department by April 3rd.",
    date: "2026-04-14",
    time: "8:00 AM",
    location: "Main Sports Ground",
  },
  {
    title: "Photography & Fine Arts Exhibition",
    description: "An open exhibition of student-created artwork and photography. Submissions are open to all departments. Selected works will be displayed in the college gallery for one week.",
    date: "2026-04-17",
    time: "2:00 PM",
    location: "Art Gallery, Ground Floor",
  },
  {
    title: "Entrepreneurship Summit 2026",
    description: "A half-day summit featuring student startup pitches, a panel discussion with local founders, and a seed funding competition. Open to all departments. Register your startup idea by April 10th.",
    date: "2026-04-24",
    time: "9:30 AM",
    location: "Conference Hall, Block A",
  },
  {
    title: "Workshop: Resume & Interview Masterclass",
    description: "A hands-on workshop run by the Placement Cell and industry mentors. Learn how to craft an ATS-friendly resume, ace aptitude tests, and handle HR and technical interview rounds.",
    date: "2026-04-02",
    time: "3:00 PM",
    location: "Lecture Hall 7",
  },
  {
    title: "Blood Donation Camp",
    description: "In association with the Red Cross Society. All students and staff are encouraged to participate. Free health check-up and refreshments will be provided to all donors.",
    date: "2026-04-07",
    time: "9:00 AM",
    location: "Medical Centre, Ground Floor",
  },
];

const NOTIFICATIONS = [
  {
    type: "notice",
    title: "New Notice: Exam Schedule Released",
    message: "The end semester examination schedule has been released. Click to view.",
    link: "/notices",
  },
  {
    type: "event",
    title: "Upcoming: Annual Tech Fest — TechZen 2026",
    message: "TechZen 2026 is happening on April 10th at the Main Auditorium. Don't miss out!",
    link: "/events",
  },
  {
    type: "alert",
    title: "Scholarship Deadline Extended",
    message: "The scholarship application deadline has been extended to April 15th.",
    link: "/notices",
  },
];

async function clearCollection(name) {
  const snap = await getDocs(collection(db, name));
  for (const d of snap.docs) await deleteDoc(doc(db, name, d.id));
}

async function seedCollection(name, items) {
  for (const item of items) {
    await addDoc(collection(db, name), { ...item, createdAt: serverTimestamp() });
  }
}

export default function SeedDatabase() {
  const [status, setStatus] = useState('');
  const [running, setRunning] = useState(false);

  const handleSeedAll = async () => {
    setRunning(true);
    setStatus('Clearing all existing data...');
    try {
      await clearCollection('notices');
      await clearCollection('events');
      await clearCollection('notifications');
      setStatus('Seeding notices...');
      await seedCollection('notices', NOTICES);
      setStatus('Seeding events...');
      await seedCollection('events', EVENTS);
      setStatus('Seeding notifications...');
      await seedCollection('notifications', NOTIFICATIONS);
      setStatus('✅ All data seeded successfully! Navigate to the portal.');
    } catch (e) {
      setStatus(`❌ Error: ${e.message}`);
    }
    setRunning(false);
  };

  const handleSeedEventsOnly = async () => {
    setRunning(true);
    setStatus('Clearing existing events...');
    try {
      await clearCollection('events');
      setStatus('Seeding 10 events...');
      await seedCollection('events', EVENTS);
      setStatus('✅ Events seeded successfully! Go to /events to see them.');
    } catch (e) {
      setStatus(`❌ Error: ${e.message}`);
    }
    setRunning(false);
  };

  const btnBase = {
    padding: '13px 28px',
    fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    cursor: running ? 'not-allowed' : 'pointer',
    opacity: running ? 0.6 : 1,
    border: 'none', transition: 'all 0.2s',
  };

  return (
    <div style={{ maxWidth: 640, margin: '80px auto', padding: 40, fontFamily: 'var(--font-ui)', border: '2px solid var(--border-dark)', background: 'var(--bg-card)' }}>
      <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Admin Utility</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Seed Firestore</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 36 }}>
        Populate the Firebase database with sample data. Use the targeted buttons to avoid overwriting existing content.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Events Only */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Events Only</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>10 campus events — does not affect notices</div>
          </div>
          <button onClick={handleSeedEventsOnly} disabled={running} style={{ ...btnBase, background: 'var(--text-primary)', color: 'var(--text-invert)' }}>
            Seed Events
          </button>
        </div>

        {/* All Data */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', border: '1px solid rgba(255,51,51,0.3)', background: 'rgba(255,51,51,0.03)' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Seed Everything</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Notices + Events + Notifications — <strong>overwrites all data</strong></div>
          </div>
          <button onClick={handleSeedAll} disabled={running} style={{ ...btnBase, background: 'var(--accent)', color: '#fff' }}>
            Seed All
          </button>
        </div>
      </div>

      {status && (
        <div style={{ marginTop: 24, padding: '16px 20px', borderLeft: '3px solid var(--border-dark)', fontSize: 14, fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {status}
        </div>
      )}
    </div>
  );
}
