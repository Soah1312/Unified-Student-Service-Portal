import { Hono } from 'hono'
import { cors } from 'hono/cors'

import noticesRouter from './routes/notices.js'
import eventsRouter from './routes/events.js'
import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import adminRouter from './routes/admin.js'

const app = new Hono()

// ── Middleware ──────────────────────────────────────────────────────────────
app.use('*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

// ── Routes ──────────────────────────────────────────────────────────────────
app.route('/api/notices', noticesRouter)
app.route('/api/events', eventsRouter)
app.route('/api/auth', authRouter)
app.route('/api/users', usersRouter)
app.route('/api/admin', adminRouter)

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: "Unified Student Service Portal API is running on Cloudflare Workers 🚀",
    timestamp: new Date().toISOString(),
    routes: ["/api/notices", "/api/events", "/api/auth", "/api/users"],
  })
})

// ── 404 Handler ──────────────────────────────────────────────────────────────
app.notFound((c) => {
  return c.json({ success: false, message: `Route ${c.req.url} not found` }, 404)
})

// ── Error Handler ─────────────────────────────────────────────────────────────
app.onError((err, c) => {
  console.error(err)
  return c.json({ success: false, message: "Internal server error" }, 500)
})

export default app
