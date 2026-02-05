"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "../lib/config";
import { NoteForm } from "@/components/note-form";
import { NotesList } from "@/components/notes-list";

export default function Page() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_BASE}/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchNotes(); }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notes Management App</h1>
        <p className="text-gray-500 mt-2">Create, view, and delete notes using a Flask REST API</p>
      </header>

      <NoteForm onNoteAdded={fetchNotes} />
      <NotesList notes={notes} onNoteDeleted={fetchNotes} />
    </div>
  );
}