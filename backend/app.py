import json
import os``
from flask import Flask, jsonify, request
from flask_cors import CORS
from uuid import uuid4

app = Flask(__name__)
# This allows your Next.js app to talk to Flask
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'notes.json')

def load_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        try:
            return json.load(f)
        except:
            return []

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/notes', methods=['GET'])
def get_notes():
    return jsonify(load_data()), 200

@app.route('/notes', methods=['POST'])
def add_note():
    notes = load_data()
    data = request.json
    
    # DEBUG PRINT: Watch your terminal when you click save!
    print(f"Backend received: {data}")
    
    new_note = {
        "id": str(uuid4()),
        "title": data.get('title', 'Untitled'),
        "content": data.get('content', '')
    }
    
    notes.append(new_note)
    save_data(notes)
    return jsonify(new_note), 201

@app.route('/notes/<id>', methods=['DELETE'])
def delete_note(id):
    notes = load_data()
    updated_notes = [n for n in notes if n['id'] != id]
    save_data(updated_notes)
    return '', 204

if __name__ == '__main__':
    # Using 5001 to avoid the Mac AirPlay conflict
    app.run(host='0.0.0.0', port=5001, debug=True)