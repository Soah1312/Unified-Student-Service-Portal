import { Hono } from 'hono'
import { getAllEvents, getEventById, createEvent, deleteEvent, registerForEvent } from '../services/eventService.js'

const events = new Hono()

events.get('/', (c) => {
  const allEvents = getAllEvents();
  return c.json({ success: true, data: allEvents, count: allEvents.length });
})

events.get('/:id', (c) => {
  const event = getEventById(c.req.param('id'));
  if (!event) return c.json({ success: false, message: "Event not found" }, 404);
  return c.json({ success: true, data: event });
})

events.post('/', async (c) => {
  try {
    const data = await c.req.json();
    const newEvent = createEvent(data);
    return c.json({ success: true, data: newEvent }, 201);
  } catch (e) {
    return c.json({ success: false, message: "Invalid JSON body" }, 400);
  }
})

events.delete('/:id', (c) => {
  const deleted = deleteEvent(c.req.param('id'));
  if (!deleted) return c.json({ success: false, message: "Event not found" }, 404);
  return c.json({ success: true, message: "Event deleted" });
})

events.post('/:id/register', async (c) => {
  try {
    const { userId } = await c.req.json();
    const result = registerForEvent(c.req.param('id'), userId || "guest_user");
    if (!result.success) return c.json({ success: false, message: result.message }, 400);
    return c.json({ success: true, message: result.message, eventId: result.eventId });
  } catch (e) {
    return c.json({ success: false, message: "Invalid JSON body" }, 400);
  }
})

export default events
