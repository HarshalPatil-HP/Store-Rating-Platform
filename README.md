# Store Rating Platform

A full-stack web application where users can discover stores and rate them on a scale of 1–5. Built with React (frontend), Express & Node.js (backend), and MySQL (database).

**Live demo:** https://store-rating-platform-hp.vercel.app

---

## Features

- **Role-based access control** — System Administrator, Normal User, and Store Owner, each with a distinct set of permissions behind a single login system.
- **Admin dashboard** — add users and stores, assign store owners, view platform-wide stats (total users, stores, ratings), browse and search all users/stores.
- **Normal user features** — sign up, browse all stores, search by name/address, submit a rating (1–5), and modify a previously submitted rating.
- **Store owner dashboard** — view the store's average rating and the list of users who rated it.
- **Validation** — name, email, address, and password rules enforced on both frontend and backend.
- **JWT-based authentication** with role-protected API routes and frontend routes.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express |
| Database | MySQL (raw SQL via `mysql2`, no ORM) |
| Auth | JWT + bcrypt |
| Deployment | Vercel (frontend), Render (backend), Aiven (MySQL) |

---

## Project Structure

```
Store-Rating-Platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # request handlers (business logic)
│   │   ├── db/               # connection pool + schema.sql
│   │   ├── middleware/       # auth, validation, error handling
│   │   ├── models/           # raw SQL query functions
│   │   ├── routes/           # route definitions
│   │   ├── utils/            # ApiError, ApiResponse, asyncHandler
│   │   └── validators/       # express-validator rule sets
│   └── index.js
├── frontend/
│   └── src/
│       ├── components/admin/ # admin dashboard sub-components
│       ├── context/          # AuthContext (global auth state)
│       ├── pages/            # one file per screen
│       └── services/         # configured axios instance
├── PRD-Store-Rating-Platform.md   # product requirements doc
└── PROGRESS-TRACKER.md            # build log
```

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+)
- MySQL

### 1. Database Setup
```sql
CREATE DATABASE store_rating_db;
```
Then run the schema:
```sql
-- paste contents of backend/src/db/schema.sql
```

### 2. Backend Setup
```
cd backend
npm install
```
Create a `.env` file inside `backend/`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=store_rating_db
PORT=3000
JWT_SECRET=your_secret_key
```
Seed an admin account:
```
node src/db/seed.js
```
Start the server:
```
npm run dev
```

### 3. Frontend Setup
```
cd frontend
npm install
npm run dev
```
By default the frontend points to the deployed backend in `src/services/api.js` — update `baseURL` there to `http://localhost:3000/api` for local development against a local backend.

---

## User Roles

| Role | How to get access |
|---|---|
| Normal User | Sign up directly from the app |
| Store Owner | Created by an Admin |
| Admin | Seeded via `backend/src/db/seed.js` |

---

## API Overview

All routes are prefixed with `/api`.

- `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/change-password`
- `GET /admin/dashboard`, `POST /admin/users`, `GET /admin/users`, `POST /admin/stores`, `GET /admin/stores`
- `GET /user/stores`, `POST /user/stores/:storeId/rating`
- `GET /owner/dashboard`

Full request/response details are documented in `PRD-Store-Rating-Platform.md`.