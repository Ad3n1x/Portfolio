# Portfolio — Deployment Verification

The repository documents a React/Vite frontend, Express API, MongoDB contact storage and separate Vercel/Render deployment targets. A successful build alone does not prove that the public site and API are connected correctly.

## Public-site smoke test

- [ ] Open the production URL in a private/incognito window and on Android.
- [ ] Confirm CSS, JavaScript, fonts, favicon and images load without 404s.
- [ ] Refresh the homepage and every supported route directly.
- [ ] Verify all project demo/source links open the intended repositories and live apps.
- [ ] Remove any demo links that are offline, private, misleading or not ready for public review.
- [ ] Confirm the education and skills section accurately distinguishes completed learning from planned learning.
- [ ] Check layout at 320px, 375px, tablet and desktop widths.

## API and contact form

- [ ] Check `GET /api/health` on the deployed backend.
- [ ] Confirm Vercel's API base URL and Render's `CLIENT_URL` match the actual deployment origins.
- [ ] Submit a valid contact form and confirm a single record is stored.
- [ ] Test invalid fields, oversized messages, repeated submissions and server downtime.
- [ ] Confirm rate limiting and CORS are enforced by the server.
- [ ] Verify error messages do not expose stack traces, database details or secrets.

## Release hygiene

- [ ] Run the documented frontend/backend build and lint checks.
- [ ] Confirm environment variables are configured in the hosting dashboards, not committed.
- [ ] Review recent deployment logs and keep a known-good rollback point.
- [ ] Add screenshots and a short case study for each flagship project, describing the problem, your implementation and what you personally built.

Do not mark an item complete until it has been tested against the deployed version.
