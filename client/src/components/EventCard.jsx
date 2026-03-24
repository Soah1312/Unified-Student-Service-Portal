import React from 'react';

const EventCard = ({ event, onRegister, onDelete, isAdmin }) => {
  const seatsLeft = event.seats - (event.registeredUsers?.length || 0);
  const isFull = seatsLeft <= 0;
  
  // Assume mock user is "student_001", check if they are already registered
  const isRegistered = event.registeredUsers?.includes("student_001");

  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white flex flex-col">
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-2 whitespace-pre-wrap">{event.description}</p>
      <div className="text-sm text-gray-500 mb-4 space-y-1">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Seats Left:</strong> {seatsLeft} / {event.seats}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        {!isAdmin && (
          <button 
            disabled={isFull || isRegistered}
            onClick={() => onRegister(event.id)}
            className={`px-4 py-2 rounded text-white font-medium 
              ${isRegistered ? 'bg-green-600 cursor-not-allowed' : 
                isFull ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isRegistered ? 'Registered' : (isFull ? 'Full' : 'Register')}
          </button>
        )}
        {isAdmin && (
          <button 
            onClick={() => onDelete(event.id)}
            className="px-4 py-2 rounded text-white font-medium bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
