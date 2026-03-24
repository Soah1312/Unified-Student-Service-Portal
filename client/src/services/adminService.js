const BASE_URL = '/api';

export const adminService = {
  login: async (password) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      return await res.json();
    } catch (err) {
      console.error('Login error', err);
      return { success: false, message: 'Network error' };
    }
  }
};
