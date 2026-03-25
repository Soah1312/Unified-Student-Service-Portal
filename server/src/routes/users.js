import { Hono } from 'hono'
import { getNotifications } from '../services/userService.js'

const users = new Hono()

// GET /api/users/notifications
users.get('/notifications', (c) => {
  const notifications = getNotifications();
  return c.json({ success: true, data: notifications });
})

export default users
