import { Hono } from 'hono'
import { getAllNotices, getNoticeById, addComment, createNotice, updateNotice, deleteNotice } from '../services/noticeService.js'
import { addNotification } from '../services/userService.js'

const notices = new Hono()

// GET /api/notices
notices.get('/', (c) => {
  const allNotices = getAllNotices();
  return c.json({ success: true, data: allNotices, count: allNotices.length });
})

// GET /api/notices/:id
notices.get('/:id', (c) => {
  const notice = getNoticeById(c.req.param('id'));
  if (!notice) return c.json({ success: false, message: "Notice not found" }, 404);
  return c.json({ success: true, data: notice });
})

// POST /api/notices
notices.post('/', async (c) => {
  try {
    const data = await c.req.json();
    if (!data.title || !data.content) {
      return c.json({ success: false, message: "Title and content are required" }, 400);
    }
    const newNotice = createNotice(data);
    
    // Sync to notifications here (Route level)
    addNotification({
      type: 'notice',
      title: `New Notice: ${newNotice.title}`,
      message: newNotice.content.substring(0, 100) + '...',
      link: `/notices`
    });

    return c.json({ success: true, data: newNotice }, 201);
  } catch (e) {
    return c.json({ success: false, message: "Invalid JSON body" }, 400);
  }
})

// PUT /api/notices/:id
notices.put('/:id', async (c) => {
  try {
    const data = await c.req.json();
    const notice = updateNotice(c.req.param('id'), data);
    if (!notice) return c.json({ success: false, message: "Notice not found" }, 404);
    return c.json({ success: true, data: notice });
  } catch (e) {
    return c.json({ success: false, message: "Invalid JSON body" }, 400);
  }
})

// DELETE /api/notices/:id
notices.delete('/:id', (c) => {
  const success = deleteNotice(c.req.param('id'));
  if (!success) return c.json({ success: false, message: "Notice not found" }, 404);
  return c.json({ success: true, message: "Notice deleted successfully" });
})

// POST /api/notices/:id/comments
notices.post('/:id/comments', async (c) => {
  try {
    const { user, text } = await c.req.json();
    if (!text || !text.trim()) {
      return c.json({ success: false, message: "Comment text is required" }, 400);
    }
    const comment = addComment(c.req.param('id'), { user, text: text.trim() });
    if (!comment) return c.json({ success: false, message: "Notice not found" }, 404);
    return c.json({ success: true, data: comment }, 201);
  } catch (e) {
    return c.json({ success: false, message: "Invalid JSON body" }, 400);
  }
})

export default notices
