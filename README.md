# MaintAI

An AI-powered Predictive Maintenance Platform.

## Project Structure

```text
MaintAI/
│
├── Frontend/      # Next.js Frontend
├── Backend/       # FastAPI Backend
├── Database/      # Database Scripts
├── Assets/        # Images & Static Files
├── Docs/          # Documentation
└── README.md
```

## Technology Stack

### Frontend

- Next.js
- TypeScript
- React

### Backend

- FastAPI
- Python
- Uvicorn

## Run Frontend

```bash
cd Frontend
npm run dev
```

Runs at:
http://localhost:3000

## Run Backend

```bash
cd Backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

Runs at:
http://127.0.0.1:8000

## API Endpoints

### GET /

Returns:

```json
{
  "message": "Welcome to MaintAI API"
}
```

### GET /health

Returns:

```json
{
  "status": "healthy"
}
```

## Status

- ✅ Project initialized
- ✅ Frontend setup completed
- ✅ Backend setup completed
- ✅ FastAPI server running
- ✅ Next.js development server running

## Version

v0.1.0

## Author

MaintAI Development Team
