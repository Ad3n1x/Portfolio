# AD3N1X Portfolio

The personal developer portfolio of **AD3N1X (Adeniran Victor)**, showcasing independent software projects, technical interests, and ways to explore the work.

## Live portfolio

- **Website:** https://portfolio-sandy-seven-w0bgdmliak.vercel.app/
- **GitHub:** https://github.com/Ad3n1x
- **LinkedIn:** https://www.linkedin.com/in/adeniran-victor-ba28a7432/

## Featured projects

- **ADVERSE** — a website-first public-source search and research product, with destination discovery and evidence-oriented research workflows. [Live app](https://adverse-web.onrender.com/) · [Source](https://github.com/Ad3n1x/ADVERSE)
- **QuickCart** — a WhatsApp-first commerce platform for small businesses, with storefronts, product catalogues, seller order management, customer tracking, and WhatsApp communication. [Live app](https://quick-cart-three-chi.vercel.app/) · [Source](https://github.com/Ad3n1x/QuickCart)
- **UNI-TRACK** — a productivity and personal-tracking application exploring habits, goals, tasks, and privacy-conscious data handling. [Live app](https://unitrack-app.vercel.app/) · [Source](https://github.com/Ad3n1x/UNI-TRACK)
- **Quiz App** — an interactive learning project. [Live app](https://quiz-app-henna-omega.vercel.app/) · [Source](https://github.com/Ad3n1x/Quiz-App)

## Repository structure

- `client/` — React and Vite frontend.
- `server/` — Express API, MongoDB models, and contact endpoint.
- `render.yaml` — Render backend blueprint.
- `vercel.json` — Vercel frontend build configuration.

## Technology

- React and Vite
- Node.js and Express
- MongoDB and Mongoose
- JavaScript
- REST APIs

## Run locally

Requires Node.js 20+ and a MongoDB connection string.

1. Install root tools:

   ```bash
   npm install
   ```

2. Install frontend and backend dependencies:

   ```bash
   npm run install:all
   ```

3. Copy `server/.env.example` to `server/.env` and configure `MONGODB_URI` and `CLIENT_URL`.

4. Start both applications:

   ```bash
   npm run dev
   ```

The frontend can show local fallback project content when the API is unavailable. Contact submissions require the API and a working MongoDB connection.

## Deployment

The repository is configured for a split deployment:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Configure environment variables in the hosting providers. Do not commit database credentials, API keys, JWT secrets, or other private configuration.

## Security and scope

The contact form includes client- and server-side validation, rate limiting, CORS restrictions, and input length limits. Contact messages are stored in MongoDB. There is no admin dashboard or public project-management write endpoint in this repository.

## About

This portfolio is part of the ongoing AD3N1X software-development journey. Project descriptions distinguish working implementations from planned work; deployment and third-party service availability can change independently of the source code.
