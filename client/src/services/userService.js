// client/src/services/userService.js
// Notifications are read from Firestore; read-state lives in localStorage.
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export const userService = {
  getNotifications: async () => {
    try {
      const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const readIds = JSON.parse(localStorage.getItem('read_notifications') || '[]');

      const data = snap.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          type: d.type || 'system',
          title: d.title || '',
          message: d.message || '',
          link: d.link || '/dashboard',
          timestamp: d.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          read: readIds.includes(doc.id),
        };
      });

      return { success: true, data };
    } catch (e) {
      console.error('getNotifications error:', e);
      return { success: false, data: [] };
    }
  },

  markNotificationRead: (id) => {
    const readIds = JSON.parse(localStorage.getItem('read_notifications') || '[]');
    if (!readIds.includes(String(id))) {
      readIds.push(String(id));
      localStorage.setItem('read_notifications', JSON.stringify(readIds));
    }
    return { success: true };
  },

  markAllNotificationsRead: (notifications = []) => {
    const ids = notifications.map(n => String(n.id));
    const existing = JSON.parse(localStorage.getItem('read_notifications') || '[]');
    const combined = Array.from(new Set([...existing, ...ids]));
    localStorage.setItem('read_notifications', JSON.stringify(combined));
    return { success: true };
  },
};
