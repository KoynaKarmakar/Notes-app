from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATA_FILE = "notes.json"


def load_notes():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def save_notes(notes):
    with open(DATA_FILE, "w") as f:
        json.dump(notes, f, indent=2)


@app.route("/notes", methods=["GET"])
def get_notes():
    notes = load_notes()
    return jsonify(notes)


@app.route("/notes", methods=["POST"])
def add_note():
    data = request.get_json()

    if not data or "content" not in data:
        return jsonify({"error": "Note content is required"}), 400

    new_note = {
        "id": str(uuid.uuid4()),
        "content": data["content"],
        "createdAt": datetime.utcnow().isoformat()
    }

    notes = load_notes()
    notes.insert(0, new_note)
    save_notes(notes)

    return jsonify(new_note), 201


@app.route("/notes/<note_id>", methods=["DELETE"])
def delete_note(note_id):
    notes = load_notes()
    filtered_notes = [note for note in notes if note["id"] != note_id]

    if len(notes) == len(filtered_notes):
        return jsonify({"error": "Note not found"}), 404

    save_notes(filtered_notes)
    return jsonify({"message": "Note deleted"}), 200


@app.route("/")
def health_check():
    return jsonify({"status": "Notes API running"})
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
