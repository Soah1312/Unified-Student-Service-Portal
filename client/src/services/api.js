// client/src/services/api.js
// All data operations now go directly to Firebase Firestore.
import {
  collection, doc,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp, Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Convert Firestore Timestamp fields to ISO strings for consistency */
function serializeDoc(snap) {
  const data = snap.data();
  const out = { id: snap.id, ...data };
  // Convert any Timestamp fields
  for (const key of Object.keys(out)) {
    if (out[key] instanceof Timestamp) {
      out[key] = out[key].toDate().toISOString().split('T')[0];
    }
  }
  // Ensure comments array exists
  if (!out.comments) out.comments = [];
  return out;
}

// ─── Notices ──────────────────────────────────────────────────────────────────

async function getNotices() {
  try {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const data = snap.docs.map(serializeDoc);
    return { success: true, data };
  } catch (e) {
    console.error('getNotices error:', e);
    return { success: false, data: [] };
  }
}

async function getNotice(id) {
  try {
    const snap = await getDoc(doc(db, 'notices', id));
    if (!snap.exists()) return { success: false, message: 'Not found' };
    return { success: true, data: serializeDoc(snap) };
  } catch (e) {
    return { success: false };
  }
}

async function createNotice(data) {
  try {
    const payload = {
      title: data.title || 'Untitled',
      category: data.category || 'General',
      content: data.content || '',
      author: data.author || 'Admin',
      date: new Date().toISOString().split('T')[0],
      comments: [],
      createdAt: serverTimestamp(),
    };
    const ref = await addDoc(collection(db, 'notices'), payload);

    // Also add to notifications collection
    await addDoc(collection(db, 'notifications'), {
      type: 'notice',
      title: `New Notice: ${payload.title}`,
      message: payload.content.substring(0, 100) + '...',
      link: '/notices',
      createdAt: serverTimestamp(),
    });

    return { success: true, data: { id: ref.id, ...payload } };
  } catch (e) {
    console.error('createNotice error:', e);
    return { success: false, message: e.message };
  }
}

async function updateNotice(id, data) {
  try {
    const { priority, ...cleanData } = data;
    await updateDoc(doc(db, 'notices', id), cleanData);
    return { success: true };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

async function deleteNotice(id) {
  try {
    await deleteDoc(doc(db, 'notices', id));
    return { success: true };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

async function addComment(noticeId, user, text) {
  try {
    const noticeRef = doc(db, 'notices', noticeId);
    const snap = await getDoc(noticeRef);
    if (!snap.exists()) return { success: false, message: 'Not found' };

    const existing = snap.data().comments || [];
    const newComment = {
      id: Date.now().toString(),
      user: user || 'Student',
      avatar: (user || 'S').substring(0, 2).toUpperCase(),
      text,
      timestamp: new Date().toISOString(),
    };
    await updateDoc(noticeRef, { comments: [...existing, newComment] });
    return { success: true, data: newComment };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

// ─── Events ───────────────────────────────────────────────────────────────────

async function getEvents() {
  try {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const snap = await getDocs(q);
    const data = snap.docs.map(serializeDoc);
    return { success: true, data };
  } catch (e) {
    console.error('getEvents error:', e);
    return { success: false, data: [] };
  }
}

async function getEventById(id) {
  try {
    const snap = await getDoc(doc(db, 'events', id));
    if (!snap.exists()) return { success: false, message: 'Not found' };
    return { success: true, data: serializeDoc(snap) };
  } catch (e) {
    return { success: false };
  }
}

async function createEvent(data) {
  try {
    const payload = {
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      time: data.time || '',
      location: data.location || '',
      createdAt: serverTimestamp(),
    };
    const ref = await addDoc(collection(db, 'events'), payload);
    return { success: true, data: { id: ref.id, ...payload } };
  } catch (e) {
    console.error('createEvent error:', e);
    return { success: false, message: e.message };
  }
}

async function deleteEvent(id) {
  try {
    await deleteDoc(doc(db, 'events', id));
    return { success: true };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const api = {
  // Notices
  getNotices,
  getNotice,
  addComment,
  createNotice,
  updateNotice,
  deleteNotice,

  // Events
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
};
