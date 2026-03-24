let events = [
  {
    id: "1",
    title: "Annual Tech Fest 2026 - TechZen",
    description: "Join us for TechZen 2026 — our flagship annual tech festival.",
    date: "2026-04-05",
    location: "Main Auditorium",
  },
  {
    id: "2",
    title: "Career Guidance Seminar",
    description: "Industry veterans and alumni will share insights on cracking campus placements.",
    date: "2026-04-08",
    location: "Seminar Hall B",
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

export { getAllEvents, getEventById, createEvent, deleteEvent };
