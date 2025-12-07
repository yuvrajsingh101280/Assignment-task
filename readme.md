# Auth App – Backend & Frontend

Full-stack authentication app built as an internship assignment for **HubCredo**.

- **Backend:** Node.js, Express, MongoDB, JWT, httpOnly cookies, n8n integration
- **Frontend:** React (Vite), Tailwind CSS v4, protected dashboard, clean modern UI

---

## Backend – Auth API

Node.js + Express + MongoDB authentication API with JWT + cookies.

### Features

- User **signup & login**
- Password hashing with **bcrypt**
- **JWT-based auth** stored in an HTTP-only cookie (`token`)
- Protected route to fetch logged-in user:  
  `GET /api/auth/user` (uses `protectRotue` middleware)
- **Logout** endpoint to clear auth cookie
- **n8n integration** on every new signup

### Main Endpoints

Base URL (production): `https://assignment-task-1.onrender.com`

- `POST /api/auth/signup`  
  Create a new user, hash password, set JWT cookie, trigger n8n webhook.

- `POST /api/auth/login`  
  Validate credentials, set JWT cookie, return user info.

- `POST /api/auth/logout`  
  Clear the auth cookie.

- `GET /api/auth/user`  
  Protected route. Returns the currently authenticated user if the JWT cookie is valid.

---

## n8n Workflow

On every successful signup, the backend calls an **n8n webhook**.

The workflow:

1. Receives user data (`userId`, `name`, `email`, `createdAt`)
2. Appends a new row into a Google Sheet called **"New Signups"**
3. Can be extended for sending welcome emails or any other automation

The webhook URL is hosted on **n8n.cloud** and stored securely in the `N8N_WEBHOOK_URL` environment variable.

---

## Frontend – React + Tailwind

The frontend is built with **React (Vite)** and **Tailwind CSS v4**, connected to the backend via Axios.

### Frontend Features

- **Sign Up page**

  - Name, email, password
  - Client-side validation
  - Show/Hide password toggle
  - On success → sets cookie via backend + redirects to Dashboard

- **Login page**

  - Email, password
  - Client-side validation
  - Show/Hide password toggle
  - On success → redirects to Dashboard

- **Dashboard**

  - Protected route (`/dashboard`) – only accessible when logged in
  - Uses `/api/auth/user` to fetch the current user from the backend
  - Shows a personalized welcome message: `Welcome back, {firstName}`
  - Displays basic profile info and session status

- **Authentication flow**
  - Axios instance with `withCredentials: true` for cookie-based auth
  - Global auth state handled via `AuthContext`
  - Auto-checks auth status on app load
  - Logout button clears session via `POST /api/auth/logout`

---

## Environment Variables

### Backend `.env`

> These values are for local development. In production, use your own secure values and **never commit real secrets**.

```env
MONGO_URL=
PORT=
JWT_SECRET=

COOKIE_SECURE=false          # false for localhost, true for production (HTTPS)
FRONTEND_URL=
N8N_WEBHOOK_URL=
NODE_ENV=
```
