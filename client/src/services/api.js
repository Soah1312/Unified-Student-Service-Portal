const BASE_URL = '/api';

async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, message: 'Network error or server down' };
  }
}

export const api = {
  // Notices
  getNotices: () => fetchAPI('/notices'),
  getNotice: (id) => fetchAPI(`/notices/${id}`),
  addComment: (id, user, text) => 
    fetchAPI(`/notices/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ user, text }),
    }),
    
  // Events
  getEvents: () => fetchAPI('/events'),
  getEvent: (id) => fetchAPI(`/events/${id}`),
  registerEvent: (id, userId) => 
    fetchAPI(`/events/${id}/register`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
  createEvent: (data) =>
    fetchAPI('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  deleteEvent: (id) =>
    fetchAPI(`/events/${id}`, { method: 'DELETE' }),
    
  // Users
  getProfile: () => fetchAPI('/users/profile'),
  getNotifications: () => fetchAPI('/users/notifications'),
  markNotificationRead: (id) => 
    fetchAPI(`/users/notifications/${id}/read`, { method: 'PATCH' }),
  markAllNotificationsRead: () => 
    fetchAPI('/users/notifications/read-all', { method: 'PATCH' }),
};
