# AD3N1X — Adeniran Victor

**Full-Stack Developer | Software Engineering Student | Independent Builder**

I’m Adeniran Victor, also known as **AD3N1X**. I build web applications that solve practical problems, with a focus on useful product workflows, responsive interfaces, backend systems, and reliable deployment.

My work spans commerce tools, search and research software, productivity applications, and interactive learning products. I care about making software understandable, usable, and maintainable—not just making demos look impressive.

## Find me online

- **Portfolio:** https://portfolio-sandy-seven-w0bgdmliak.vercel.app/
- **GitHub:** https://github.com/Ad3n1x
- **LinkedIn:** https://www.linkedin.com/in/adeniran-victor-ba28a7432/
- **Email:** adenix271@gmail.com

## Featured work

| Project | What it does | Links |
|---|---|---|
| **QuickCart** | A WhatsApp-first commerce platform for small businesses, with public storefronts, product catalogues, seller order management, customer tracking, and delivery-status communication. | [Live app](https://quick-cart-three-chi.vercel.app/) · [Source](https://github.com/Ad3n1x/QuickCart) |
| **ADVERSE** | A search and research product for discovering public information, checking destination reachability, and keeping source context visible. Search coverage and verification are explicitly bounded. | [Live app](https://adverse-web.onrender.com/) · [Source](https://github.com/Ad3n1x/ADVERSE) |
| **UNI-TRACK** | A privacy-first productivity and tracking ecosystem for organising goals, habits, tasks, and workflows. | [Live app](https://unitrack-app.vercel.app/) · [Source](https://github.com/Ad3n1x/UNI-TRACK) |
| **Quiz App** | An interactive learning application with STEM-focused quizzes and configurable question sets. | [Live app](https://quiz-app-henna-omega.vercel.app/) · [Source](https://github.com/Ad3n1x/Quiz-App) |
| **Cuewise** | A conversation-understanding and reply-coaching app with screenshot OCR, cautious alternative interpretations, and editable reply suggestions. | [Live app](https://ai-conv-help.vercel.app/) · [Source](https://github.com/Ad3n1x/AI-CONV-HELP) |

## Technical focus

- **Frontend:** React, JavaScript, HTML, CSS, responsive UI
- **Backend:** Node.js, Express, REST APIs
- **Data:** MongoDB, Mongoose
- **Engineering practices:** Authentication, API integration, validation, testing, Git, CI workflows
- **Deployment:** Vercel, Render, GitHub

I’m currently strengthening my Python skills. My primary project work has focused on the JavaScript full-stack ecosystem.

## Education

**Professional Diploma in Computer Software Engineering**  
SQI College of ICT — expected November 2026

## How I approach building

- Start with the actual user problem and the core workflow.
- Make the interface clear on both mobile and desktop.
- Keep authentication, data ownership, and server-side secrets in mind.
- Test important user journeys instead of relying only on a successful build.
- Document limitations honestly; a deployed feature is not automatically a validated product.

## Repository notes

This repository contains the source for my personal developer portfolio.

- `client/` — React and Vite frontend.
- `server/` — Express API, MongoDB models, and contact endpoint.
- `render.yaml` — Render backend blueprint.
- `vercel.json` — Vercel frontend configuration.

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

## Deployment and security

The portfolio uses a split deployment:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Configure secrets in the hosting providers. Never commit database credentials, API keys, JWT secrets, or other private configuration.

The contact form includes client- and server-side validation, rate limiting, CORS restrictions, and input length limits. Contact messages are stored in MongoDB. There is no admin dashboard or public project-management write endpoint in this repository.

---

**Built and maintained by AD3N1X.**  
I’m interested in building practical software, learning through real projects, and improving the engineering behind every release.
