let events = [
  {
    id: "1",
    title: "Annual Tech Fest 2026 - TechZen",
    description: "Join us for TechZen 2026 — our flagship annual tech festival.",
    date: "2026-04-05",
    location: "Main Auditorium",
    seats: 500,
    registeredUsers: ["student_001", "student_002"]
  },
  {
    id: "2",
    title: "Career Guidance Seminar",
    description: "Industry veterans and alumni will share insights on cracking campus placements.",
    date: "2026-04-08",
    location: "Seminar Hall B",
    seats: 200,
    registeredUsers: ["student_001"]
  }
];

const getAllEvents = () => events;

const getEventById = (id) => events.find((e) => e.id === id) || null;

const createEvent = (data) => {
  const newEvent = {
    id: Date.now().toString(),
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || "",
    location: data.location || "",
    seats: Number(data.seats) || 0,
    registeredUsers: [],
    ...data
  };
  events.push(newEvent);
  return newEvent;
};

const deleteEvent = (id) => {
  const initialLength = events.length;
  events = events.filter((e) => e.id !== id);
  return events.length !== initialLength;
};

const registerForEvent = (eventId, userId) => {
  const event = events.find((e) => e.id === eventId);
  if (!event) return { success: false, message: "Event not found" };
  if (event.registeredUsers.includes(userId))
    return { success: false, message: "Already registered" };
  if (event.registeredUsers.length >= event.seats)
    return { success: false, message: "Event is full" };
  
  event.registeredUsers.push(userId);
  return { success: true, message: "Registration successful", eventId: event.id };
};

export { getAllEvents, getEventById, createEvent, deleteEvent, registerForEvent };
