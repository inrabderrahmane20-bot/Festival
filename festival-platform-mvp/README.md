Festival Platform MVP — Modified demo
------------------------------------

What I changed:
- Added `data/seed.json` with sample events, speakers, users and orders
- Added a React (Vite) frontend in `/client` that fetches `/api/v1/events`
- Repackaged into `festival-platform-mvp-modified.zip`

How to run (local development):

1. Install backend deps and start backend:
   - From the project root:
     npm install
     npm run dev
   - This starts the backend server (nodemon) typically on port 3000.

2. Install and start the frontend:
   - In a second terminal:
     cd client
     npm install
     npm run dev
   - Vite dev server will start (it typically uses port 5173).
   - For convenience, you can open the frontend URL shown by Vite, but the React app expects the backend API at the same origin when proxied. For full integration, run the frontend and backend and use a browser extension or configure a proxy.

Notes:
- The backend routes that read `data/seed.json` should now work because that file exists at `data/seed.json`.
- The sample credentials: test@example.com / password123 (for local testing only).
- This project is prepared for local development and testing; do not use the sample data in production.

