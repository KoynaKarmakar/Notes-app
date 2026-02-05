import { API_BASE } from "../lib/config";

interface NotesListProps {
  notes: any[];
  onNoteDeleted: () => void;
}

export const NotesList = ({ notes, onNoteDeleted }: NotesListProps) => {
  const handleDelete = async (id: string) => {
    await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
    onNoteDeleted();
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="p-4 border rounded-md bg-white shadow-sm flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{note.title}</h3>
            <p className="text-gray-600">{note.content}</p>
          </div>
          <button onClick={() => handleDelete(note.id)} className="text-red-500 hover:font-bold">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};