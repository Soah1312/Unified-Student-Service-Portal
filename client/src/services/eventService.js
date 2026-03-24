import { api } from './api';

const getEvents = () => api.getEvents();
const getEventById = (id) => api.getEventById(id);
const createEvent = (data) => api.createEvent(data);
const deleteEvent = (id) => api.deleteEvent(id);

export { getEvents, getEventById, createEvent, deleteEvent };
