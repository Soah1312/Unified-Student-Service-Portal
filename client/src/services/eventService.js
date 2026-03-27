import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const getEvents = async () => {
  try {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => {
      const raw = d.data();
      return {
        id: d.id,
        ...raw,
        seats: Number(raw.seats || 0),
        registeredUsers: Array.isArray(raw.registeredUsers) ? raw.registeredUsers : [],
      };
    });
    return { success: true, data };
  } catch (e) {
    console.error('getEvents error:', e);
    return { success: false, data: [] };
  }
};

export const createEvent = async (data) => {
  try {
    const payload = {
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      time: data.time || '',
      location: data.location || '',
      seats: Number(data.seats || 0),
      registeredUsers: [],
      createdAt: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, 'events'), payload);
    return { success: true, data: { id: ref.id, ...payload } };
  } catch (e) {
    console.error('createEvent error:', e);
    return { success: false, message: e.message };
  }
};

export const deleteEvent = async (id) => {
  try {
    await deleteDoc(doc(db, 'events', id));
    return { success: true };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const registerEvent = async (id, userId = 'student_001') => {
  try {
    const eventRef = doc(db, 'events', id);
    const snap = await getDoc(eventRef);

    if (!snap.exists()) {
      return { success: false, message: 'Event not found' };
    }

    const event = snap.data();
    const users = Array.isArray(event.registeredUsers) ? event.registeredUsers : [];
    const seats = Number(event.seats || 0);

    if (users.includes(userId)) {
      return { success: false, message: 'Already registered' };
    }

    if (seats > 0 && users.length >= seats) {
      return { success: false, message: 'Event is full' };
    }

    await updateDoc(eventRef, { registeredUsers: arrayUnion(userId) });
    return { success: true, message: 'Registration successful', eventId: id };
  } catch (e) {
    return { success: false, message: e.message };
  }
};
