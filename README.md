# AD3N1X — Developer Profile & Portfolio

**Adeniran Victor Adebowale (AD3N1X) · Software Developer · Professional Diploma in Computer Software Engineering · Aspiring Mechatronics Engineering Student**

AD3N1X builds practical web applications and software projects, learning through hands-on implementation and iterative improvement. The work spans commerce workflows, public-source research, productivity tools, and interactive learning.

AD3N1X is the professional developer identity used by Adeniran Victor Adebowale. The portfolio is the canonical public profile for selected projects, technical interests, education, and the developer's approach to building software.

## Official profile

- **Full name:** Adeniran Victor Adebowale
- **Public developer identity:** AD3N1X (also written Ad3n1x)
- **Identity relationship:** AD3N1X is the developer identity used by Adeniran Victor Adebowale; both names refer to the same developer.
- **Portfolio:** https://portfolio-sandy-seven-w0bgdmliak.vercel.app/
- **AI-readable profile:** https://portfolio-sandy-seven-w0bgdmliak.vercel.app/llms.txt
- **Sitemap:** https://portfolio-sandy-seven-w0bgdmliak.vercel.app/sitemap.xml
- **GitHub:** https://github.com/Ad3n1x
- **LinkedIn:** https://www.linkedin.com/in/adeniran-victor-ba28a7432/
- **Public contact:** adenix271@gmail.com

## Featured projects

| Project | Description | Links |
|---|---|---|
| **QuickCart by AD3N1X** | Nigeria-first business and shopping platform connecting buyers with independent sellers, with a wider Business OS vision spanning storefronts, orders, inventory, finance, delivery, marketing and seller-approved recommendations. Current implementation and release gaps are documented separately. | [Official website and live app](https://ad3n1x.github.io/QuickCart/) · [Product FAQ](https://ad3n1x.github.io/QuickCart/faq.html) · [Source](https://github.com/Ad3n1x/QuickCart) |
| **ADVERSE by AD3N1X** | Intent-to-action assistant intended to turn complete objectives into cited procedures, relevant destinations and resumable next steps, grounded in public-source discovery and evidence provenance. | [Website](https://adverse-web.onrender.com/) · [FAQ](https://adverse-web.onrender.com/faq.html) · [Source](https://github.com/Ad3n1x/ADVERSE) |
| **UNI-TRACK by AD3N1X** | User-controlled productivity and tracking for habits, goals, tasks, activities and metrics. Current private-key recovery/export limitations are documented in its repository. | [Website](https://unitrack-app.vercel.app/) · [FAQ](https://unitrack-app.vercel.app/faq.html) · [Source](https://github.com/Ad3n1x/UNI-TRACK) |
| **Cuewise** | Privacy-conscious conversation reflection and reply coaching that separates observable wording from assumptions, with local analysis and optional consent-based multi-provider AI. | [Website](https://ai-conv-help.vercel.app/) · [Source](https://github.com/Ad3n1x/AI-CONV-HELP) |
| **Quiz App** | Interactive learning with STEM practice and configurable quizzes. | [Website](https://quiz-app-henna-omega.vercel.app/) · [Source](https://github.com/Ad3n1x/Quiz-App) |

## Technical focus

- **Frontend:** React, JavaScript, HTML, CSS, responsive interfaces
- **Backend:** Node.js, Express, REST APIs
- **Data:** MongoDB, Mongoose, SQL and relational data modelling
- **Engineering:** Authentication, validation, API design, security-conscious workflows, testing, Git, CI, and deployment
- **Hosting:** Vercel, Render, GitHub

Python is the current learning focus. TypeScript is a planned next step.

## Education

**Current programme:** Professional Diploma in Computer Software Engineering  
SQI College of ICT — expected November 2026.  
**Future academic aspiration:** Study Mechatronics Engineering. This is an intended next academic direction, not the current diploma programme.

## Project descriptions and implementation truth

The portfolio distinguishes each product's target vision from what its current main branch and release evidence demonstrate. Read the project-specific case studies and repositories before treating planned capabilities as shipped. In particular, ADVERSE's persistent task-guidance workflow, QuickCart's full Business OS, and UNI-TRACK's user-facing encrypted-key recovery are not to be represented as complete without release evidence.

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

- Frontend: Vercel (primary production portfolio).
- Backend: Render.
- Database: MongoDB Atlas.

Configure secrets in hosting-provider settings. Never commit database credentials, API keys, JWT secrets, or private configuration.

The contact form includes client- and server-side validation, rate limiting, CORS restrictions, and input length limits. Contact messages are stored in MongoDB. There is no admin dashboard or public project-management write endpoint in this repository.

---

**Built and maintained by AD3N1X.**
