import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Badge from './ui/Badge';
import Card from './ui/Card';

export default function NoticeCard({ notice, onEdit, onDelete }) {
  return (
    <Card className="flex flex-col gap-3 p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-white">{notice.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={notice.priority === 'high' ? 'danger' : notice.priority === 'medium' ? 'warning' : 'default'}>
              {notice.category}
            </Badge>
            <span className="text-xs text-slate-400">{notice.date}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(notice)}
            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(notice.id)}
            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-300 mt-2 line-clamp-3">{notice.content}</p>
    </Card>
  );
}
