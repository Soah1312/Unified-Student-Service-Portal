import React, { useState } from 'react';

const EventForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    seats: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      seats: parseInt(formData.seats, 10) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm border space-y-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input 
          type="text" 
          name="title" 
          required 
          value={formData.title} 
          onChange={handleChange}
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          name="description" 
          required 
          rows="4"
          value={formData.description} 
          onChange={handleChange}
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input 
            type="date" 
            name="date" 
            required 
            value={formData.date} 
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
          <input 
            type="number" 
            name="seats" 
            required 
            min="1"
            value={formData.seats} 
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input 
          type="text" 
          name="location" 
          required 
          value={formData.location} 
          onChange={handleChange}
          className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-4 py-2 border rounded font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
