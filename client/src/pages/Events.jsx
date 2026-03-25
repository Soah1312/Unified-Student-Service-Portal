import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, registerEvent, deleteEvent } from '../services/eventService';
import EventCard from '../components/EventCard';
import { toggleAdminMode } from '../store/authSlice';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Get user data from Redux Store
  const dispatch = useDispatch();
  const { user, isAdmin } = useSelector((state) => state.auth);
  
  // Use the ID from Redux instead of hardcoding
  const currentUserId = user?.id;

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      if (res?.success) {
        setEvents(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      const res = await registerEvent(eventId, currentUserId);
      if (res?.success) {
        setEvents(events.map(ev => {
          if (ev.id === eventId) {
            return {
              ...ev,
              registeredUsers: [...(ev.registeredUsers || []), currentUserId],
            };
          }
          return ev;
        }));
      } else {
        alert(res?.message || 'Failed to register');
      }
    } catch (e) {
      alert("Error registering for event");
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await deleteEvent(eventId);
      if (res?.success) {
        setEvents(events.filter(ev => ev.id !== eventId));
      } else {
        alert(res?.message || 'Failed to delete');
      }
    } catch (e) {
      alert("Error deleting event");
    }
  };

  if (loading) return <div className="text-center p-10 text-gray-500">Loading events...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Campus Events</h1>
          <p className="text-gray-400 text-sm mt-1">Discover and register for upcoming activities.</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input 
              type="checkbox" 
              checked={isAdmin} 
              onChange={() => dispatch(toggleAdminMode())} 
              className="rounded"
            />
            Admin Mode
          </label>
          {isAdmin && (
            <a 
              href="/events/create" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
            >
              + Create Event
            </a>
          )}
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No events found.</div>
      ) : (
        <div className="event-grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} onRegister={handleRegister} onDelete={handleDelete} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
