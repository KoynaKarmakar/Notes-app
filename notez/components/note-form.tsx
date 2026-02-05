"use client";
import { useState } from "react";
import { API_BASE } from "../lib/config";

interface NoteFormProps {
  onNoteAdded: () => void;
}

export const NoteForm = ({ onNoteAdded }: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { title, content };
    console.log("Frontend sending:", payload);

    try {
      const response = await fetch(`${API_BASE}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onNoteAdded();
        setTitle("");
        setContent("");
      }
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-8 border rounded-md overflow-hidden bg-white shadow-sm">
      <input
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 border-b outline-none font-bold"
      />
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-3 h-32 outline-none resize-none"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 hover:bg-blue-700 font-bold transition-all">
        Save Note
      </button>
    </form>
  );
};