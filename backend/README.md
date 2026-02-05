# Full-Stack Notes Application (DevOps Migration)

A complete full-stack transformation of a client-side Notes app into a decoupled Client-Server architecture.

## 🏗 Architecture
- **Frontend:** Next.js / React (Deployed on **Vercel**)
- **Backend:** Flask REST API (Deployed on **Render**)
- **Database:** Server-side JSON persistence (`notes.json`)
- **Communication:** RESTful API via `fetch` with CORS enabled

## 🛠 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/notes` | Fetch all notes from notes.json |
| POST | `/notes` | Add a new note to the server |
| DELETE | `/notes/<id>` | Remove a note by its UUID |
| GET | `/` | API Health Check |

## 📦 Local Setup
1. **Backend:**
   - `cd backend`
   - `pip install -r requirements.txt`
   - `python app.py`
2. **Frontend:**
   - `cd notez`
   - `npm install`
   - `npm run dev`