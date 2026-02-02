'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export default function NotesList({ notes, onDeleteNote }: NotesListProps) {
  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div key={note.id} className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="whitespace-pre-wrap text-foreground break-words text-pretty">{note.content}</p>
              <p className="mt-3 text-xs text-muted-foreground">{formatDate(note.createdAt)}</p>
            </div>
            <Button
              onClick={() => onDeleteNote(note.id)}
              variant="ghost"
              size="sm"
              className="opacity-0 transition-opacity group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
              aria-label="Delete note"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
