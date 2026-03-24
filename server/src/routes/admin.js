import { Hono } from 'hono'

const admin = new Hono()

// POST /api/admin/login
admin.post('/login', async (c) => {
  try {
    const { password } = await c.req.json();
    if (password === 'admin123') {
      return c.json({ success: true, message: "Admin login successful" });
    }
    return c.json({ success: false, message: "Invalid password" }, 401);
  } catch (e) {
    return c.json({ success: false, message: "Invalid JSON body" }, 400);
  }
})

export default admin
