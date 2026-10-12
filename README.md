# AD3N1X Portfolio — MERN Edition

A dark graphite + acid-lime portfolio built with **MongoDB, Express, React, and Node.js**.

## Structure

- `client/` — React + Vite frontend
- `server/` — Express REST API, Mongoose models, contact endpoint
- `server/src/index.js` — API routes and MongoDB schemas
- `render.yaml` — Render backend blueprint
- `vercel.json` — Vercel frontend build configuration

## Features

- AD3N1X brand and responsive, technical-minimal visual system
- Project cards loaded from `GET /api/projects` with local fallback content
- Contact form validated on client and server and stored in MongoDB
- Rate limiting on contact submissions, CORS allow-list, input length limits
- Health endpoint at `GET /api/health`

## Local development

Requires Node.js 20+ and a MongoDB connection string.

1. Install root tools: `npm install`
2. Install dependencies: `npm run install:all`
3. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
4. Set `CLIENT_URL=http://localhost:5173` in `server/.env`.
5. Run both apps: `npm run dev`
6. Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

The React app uses local project fallback content if the API is not reachable. Contact submissions require the API and a connected MongoDB database.

## Deploy

### Backend — Render

- Create a Web Service from this repository.
- Set the Root Directory to `server`.
- Build command: `npm install`
- Start command: `npm start`
- Add `MONGODB_URI` from MongoDB Atlas.
- Add `CLIENT_URL` as the exact deployed Vercel frontend origin.

### Database — MongoDB Atlas

Create a database user and database, allow Render's outbound access as required by your Atlas network configuration, and save the connection string as the Render environment variable `MONGODB_URI`. Never commit real credentials.

### Frontend — Vercel

- Import this repository into Vercel.
- Use the included `vercel.json` build configuration, or set the root build command to `npm run build --prefix client` and output directory to `client/dist`.
- Add `VITE_API_URL` with the deployed Render API URL (no trailing slash).
- Redeploy after setting environment variables.

## Important deployment note

GitHub Pages can serve the old static portfolio but cannot run the Express API or MongoDB. This branch keeps the existing `main` branch intact while the MERN edition is prepared. Deploy the frontend on Vercel and the API on Render for the full stack experience.

## Scope / security

There is currently no admin dashboard or public write endpoint for project management. Project cards seed from the server's initial project list and are stored in MongoDB on first successful read. Contact messages are stored in MongoDB; add authentication before building any private message inbox or project editor.
