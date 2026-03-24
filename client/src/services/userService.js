const BASE_URL = '/api/users';

async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return await res.json();
  } catch (error) {
    console.error('User API Error:', error);
    return { success: false, message: 'Network error or server down' };
  }
}

export const userService = {
  getNotifications: async () => {
    const res = await fetchAPI('/notifications');
    if (res.success && res.data) {
      const readIds = JSON.parse(localStorage.getItem('read_notifications') || '[]');
      res.data = res.data.map(n => ({
        ...n,
        read: n.read || readIds.includes(String(n.id))
      }));
    }
    return res;
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
