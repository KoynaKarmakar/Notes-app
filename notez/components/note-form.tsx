'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NoteFormProps {
  onAddNote: (content: string) => void;
}

export default function NoteForm({ onAddNote }: NoteFormProps) {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setIsSubmitting(true);
      // Simulate brief loading state for better UX
      setTimeout(() => {
        onAddNote(input.trim());
        setInput('');
        setIsSubmitting(false);
      }, 100);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="note-input" className="text-sm font-medium text-foreground">
          Add a new note
        </label>
        <textarea
          id="note-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          rows={4}
          disabled={isSubmitting}
        />
      </div>
      <Button
        type="submit"
        disabled={!input.trim() || isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? 'Adding...' : 'Add Note'}
      </Button>
    </form>
  );
}
