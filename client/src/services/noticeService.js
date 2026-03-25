// client/src/services/noticeService.js
// Thin wrapper — delegates everything to api.js (which now uses Firestore).
import { api } from './api';

export const noticeService = {
  getNotices: () => api.getNotices(),
  getNotice: (id) => api.getNotice(id),
  createNotice: (data) => api.createNotice(data),
  updateNotice: (id, data) => api.updateNotice(id, data),
  deleteNotice: (id) => api.deleteNotice(id),
};
