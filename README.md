# Auruz Site

This repository contains the Auruz marketing site and supporting backend APIs.
It is not an outreach automation platform.

## What Is In This Repo

- `frontend/`: Next.js site for the landing pages, insights, prototypes, privacy page, and admin content screens.
- `backend/`: FastAPI API for leads, audit chat, articles, prototypes, categories, analytics, and Calendly sync.
- `Dockerfile`: optional container deployment asset for the backend.

## Core Features

- Marketing website for Auruz/Aurvyz services and case studies
- Lead capture for contact, call booking, and audit requests
- AI audit chat backed by Gemini
- Insights/blog content API
- Prototype showcase API
- Admin content management screens

## Local Development

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Local MongoDB

```bash
docker run -d --name aurvyz-mongodb \
  -e MONGO_INITDB_DATABASE=aurvyz \
  -p 27017:27017 mongo:7
```

## Environment Variables

Create `backend/.env` with the values your environment needs:

```env
MONGODB_URL=mongodb://127.0.0.1:27017/aurvyz
# or DATABASE_URL=mongodb://127.0.0.1:27017/aurvyz
GEMINI_API_KEY=<your-gemini-api-key>
GEMINI_MODEL=gemini-2.5-flash
SMTP_HOST=<smtp-host>
SMTP_PORT=465
SMTP_USER=<smtp-user>
SMTP_PASS=<smtp-password>
SENDER_EMAIL=<from-email>
NOTIFY_EMAIL=<team-inbox>
CALENDLY_PERSONAL_ACCESS_TOKEN=<optional-calendly-token>
CALENDLY_USER_URI=<optional-calendly-user-uri>
```

For the frontend, set `NEXT_PUBLIC_BACKEND_URL` when the API is not served from the same host.
For image uploads in the admin editor, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` only if you want frontend upload storage to use Supabase.

## Deployment

Recommended deployment split:

- Frontend: Vercel
- Backend: Render

### Vercel

- Root directory: `frontend`
- Build command: `npm run build`
- Output: Next.js default
- Environment variable: `NEXT_PUBLIC_BACKEND_URL=https://<your-render-backend-url>`

### Render

- Use the root `Dockerfile` for the backend, or run from `backend/`
- Expose the backend as a web service
- Set the backend environment variables from the section above
- Point `SUPABASE_DB_URL` or `DATABASE_URL` at your Supabase Postgres instance

Useful command:

- `docker build -t aurvyz-backend -f Dockerfile .`

## Notes

- The repository and infrastructure still use several `aurvyz` names internally.
- GCP-specific deployment files and references have been removed for a Vercel + Render setup.
