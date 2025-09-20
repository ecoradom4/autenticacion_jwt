# Install & Run (Local)

## Prerequisites
- Node.js 18+ and npm
- PostgreSQL (or use Neon / ElephantSQL / Render Postgres)
- VSCode

## Backend (server)
1. Open terminal in `backend/`
2. Copy `.env.example` to `.env` and fill values
3. Install dependencies:
   ```
   npm install
   ```
4. Run migrations (if using `sequelize-cli`) or let Sequelize sync:
   ```
   node src/index.js
   ```
   The server will sync models and start on PORT from `.env` (default 4000).
5. Example: register a user via POST /api/auth/register

## Frontend (client)
1. Open terminal in `frontend/`
2. Install:
   ```
   npm install
   ```
3. Start dev server:
   ```
   npm run dev
   ```
   By default Vite runs on http://localhost:5173

## Notes about Render deployment
- Put backend env vars (DATABASE_URL, JWT_SECRET, PORT)
- For the frontend, build and deploy as a static site; set `VITE_API_URL` env var to backend URL.