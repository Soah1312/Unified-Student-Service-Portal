import React, { useState } from 'react';
import Button from './Button';
import { Send } from 'lucide-react';

export default function CommentSection({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, borderTop: '3px solid var(--border-dark)', paddingTop: 20, marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
          Discussion
        </h3>
        <span className="editorial-label" style={{ color: 'var(--text-muted)' }}>{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Comments list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxHeight: 280, overflowY: 'auto', marginBottom: 20 }}>
        {comments.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic', padding: '16px 0' }}>
            No comments yet. Start the discussion.
          </p>
        ) : (
          comments.map((comment, i) => (
            <div
              key={comment.id || i}
              className="animate-fade-in"
              style={{ borderBottom: '1px solid var(--border)', padding: '16px 0' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>
                  {comment.user}
                </span>
                <span className="editorial-label" style={{ color: 'var(--text-muted)' }}>
                  {new Date(comment.timestamp).toLocaleDateString()} · {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="editorial-input"
          style={{ flex: 1 }}
        />
        <Button type="submit" disabled={!newComment.trim()} icon={<Send size={14} />} size="sm">
          Post
        </Button>
      </form>
    </div>
  );
}
