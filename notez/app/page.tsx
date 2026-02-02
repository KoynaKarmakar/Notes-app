'use client';

import { useEffect, useState } from 'react';
import NoteForm from '@/components/note-form';
import NotesList from '@/components/notes-list';

interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000';

  // Fetch all notes on page load
  useEffect(() => {
    fetch(`${API_BASE_URL}/notes`)
      .then((res) => res.json())
      .then((data) => {
        const parsedNotes = data.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
        }));
        setNotes(parsedNotes);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Add a new note
  const addNote = async (content: string) => {
    const res = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    const newNote = await res.json();
    newNote.createdAt = new Date(newNote.createdAt);

    setNotes((prev) => [newNote, ...prev]);
  };

  // Delete a note
  const deleteNote = async (id: string) => {
    await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Notes Management App
        </h1>
        <p className="text-muted-foreground">
          Create, view, and delete notes using a Flask REST API
        </p>
      </div>

      <NoteForm onAddNote={addNote} />

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No notes yet. Add your first note above.
        </p>
      ) : (
        <NotesList notes={notes} onDeleteNote={deleteNote} />
      )}
    </main>
  );
}
