const BASE_URL = '/api/notices';

export const noticeService = {
  getNotices: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },
  createNotice: async (data) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateNotice: async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteNotice: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }
};
