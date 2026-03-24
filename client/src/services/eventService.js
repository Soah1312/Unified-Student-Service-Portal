const BASE_URL = '/api';

export const getEvents = async () => {
  const res = await fetch(`${BASE_URL}/events`);
  return res.json();
};

export const createEvent = async (data) => {
  const res = await fetch(`${BASE_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteEvent = async (id) => {
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const registerEvent = async (id, userId = "student_001") => {
  const res = await fetch(`${BASE_URL}/events/${id}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  return res.json();
};
