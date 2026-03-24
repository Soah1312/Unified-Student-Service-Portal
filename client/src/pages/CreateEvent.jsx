import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { createEvent } from '../services/eventService';

export default function CreateEvent() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      const res = await createEvent(data);
      if (res?.success) {
        navigate('/events');
      } else {
        alert(res?.message || 'Failed to create event');
      }
    } catch (e) {
      alert("Error creating event");
      console.error(e);
    }
  };

  const handleCancel = () => {
    navigate('/events');
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Event Management</h1>
        <p className="text-gray-400 text-sm mt-1">Admin tool to publish new campus events.</p>
      </div>
      
      <EventForm onSubmit={handleCreate} onCancel={handleCancel} />
    </div>
  );
}
