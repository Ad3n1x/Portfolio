# AD3N1X — Developer Profile & Portfolio

**Full-Stack Developer · Software Engineering Student · Independent Builder**

AD3N1X builds practical web applications and software projects, learning through hands-on implementation and iterative improvement. The work spans commerce workflows, public-source research, productivity tools, and interactive learning.

The portfolio is the primary public profile for selected projects, technical interests, education, and the developer's approach to building software.

## Official profile

- **Full name:** Adeniran Victor Adebowale
- **Public developer identity:** AD3N1X (also written Ad3n1x)
- **Identity relationship:** AD3N1X is the developer identity used by Adeniran Victor Adebowale; both names refer to the same developer.
- **Portfolio:** https://ad3n1x.github.io/Portfolio/
- **AI-readable profile:** https://ad3n1x.github.io/Portfolio/llms.txt
- **Sitemap:** https://ad3n1x.github.io/Portfolio/sitemap.xml
- **GitHub:** https://github.com/Ad3n1x
- **LinkedIn:** https://www.linkedin.com/in/adeniran-victor-ba28a7432/
- **Public contact:** adenix271@gmail.com

## Featured projects

| Project | Description | Links |
|---|---|---|
| **QuickCart** | Commerce tools for small businesses: storefronts, product catalogues, seller order management, customer tracking, and delivery updates. | [Project](https://ad3n1x.github.io/QuickCart/) · [App](https://quick-cart-three-chi.vercel.app/) · [Source](https://github.com/Ad3n1x/QuickCart) |
| **ADVERSE** | Public-source search and research with source provenance and limitations kept visible. | [Website](https://adverse-web.onrender.com/) · [Source](https://github.com/Ad3n1x/ADVERSE) |
| **UNI-TRACK** | Productivity and activity tracking for goals, habits, tasks, and workflows. | [Website](https://unitrack-app.vercel.app/) · [Source](https://github.com/Ad3n1x/UNI-TRACK) |
| **Cuewise** | Conversation reflection and reply coaching with screenshot text extraction and editable suggestions. | [Website](https://ai-conv-help.vercel.app/) · [Source](https://github.com/Ad3n1x/AI-CONV-HELP) |
| **Quiz App** | Interactive learning with STEM practice and configurable quizzes. | [Website](https://quiz-app-henna-omega.vercel.app/) · [Source](https://github.com/Ad3n1x/Quiz-App) |

## Technical focus

- **Frontend:** React, JavaScript, HTML, CSS, responsive interfaces
- **Backend:** Node.js, Express, REST APIs
- **Data:** MongoDB, Mongoose, SQL and relational data modelling
- **Engineering:** Authentication, validation, API design, security-conscious workflows, testing, Git, CI, and deployment
- **Hosting:** Vercel, Render, GitHub

Python is the current learning focus. TypeScript is a planned next step.

## Education

**Professional Diploma in Computer Software Engineering**  
SQI College of ICT — expected November 2026.

## Engineering approach

- Start with the actual user problem and core workflow.
- Build clear interfaces for mobile and desktop.
- Consider authentication, data ownership, validation, and server-side secrets.
- Test important user journeys rather than relying only on a successful build.
- Document limitations honestly; deployment does not automatically prove product validation.

## Repository structure

- `client/` — React and Vite frontend.
- `server/` — Express API, MongoDB models, and contact endpoint.
- `render.yaml` — Render backend blueprint.
- `vercel.json` — Vercel frontend configuration.

## Local development

Requires Node.js 20+ and a MongoDB connection string.

1. Install root tools: `npm install`.
2. Install frontend and backend dependencies: `npm run install:all`.
3. Copy `server/.env.example` to `server/.env` and configure `MONGODB_URI` and `CLIENT_URL`.
4. Start both applications: `npm run dev`.

The frontend can show local fallback project content when the API is unavailable. Contact submissions require the API and a working MongoDB connection.

## Deployment and security

- Frontend: Vercel and GitHub Pages.
- Backend: Render.
- Database: MongoDB Atlas.

Configure secrets in hosting-provider settings. Never commit database credentials, API keys, JWT secrets, or private configuration.

The contact form includes client- and server-side validation, rate limiting, CORS restrictions, and input length limits. Contact messages are stored in MongoDB. There is no admin dashboard or public project-management write endpoint in this repository.

---

**Built and maintained by AD3N1X.**
