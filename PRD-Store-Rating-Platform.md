# Product Requirements Document — Store Rating Platform

**Author:** Harshal Patil
**Version:** 1.0
**Last updated:** August 2026
**Status:** Draft — for internal dev reference (Roxile Systems Fullstack Intern Coding Challenge)

---

## 1. Overview

A web application where end users can discover stores and rate them on a scale of 1–5.
The platform has three roles — **System Administrator**, **Normal User**, and **Store
Owner** — each with a distinct set of permissions behind a single, unified login system.

**Goal:** demonstrate a clean, role-based full-stack app with proper auth, validation,
and CRUD flows using React (frontend), Express (backend), and MySQL (database).

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React (Vite) | functional components + hooks, no class components |
| Backend | Node.js + Express | REST API, layered as routes → controllers → services → models |
| Database | MySQL | raw SQL via `mysql2`, no ORM — keeps schema explicit and easy to reason about |
| Auth | JWT (access token) + bcrypt for password hashing | stored in httpOnly cookie or localStorage (decide based on time left) |
| Styling | Tailwind CSS | fast to ship, consistent spacing/typography |

---

## 3. User Roles & Permissions Matrix

| Capability | Admin | Normal User | Store Owner |
|---|:---:|:---:|:---:|
| Sign up | ❌ (created by admin) | ✅ | ❌ (created by admin) |
| Log in / Log out | ✅ | ✅ | ✅ |
| Update own password | ✅ | ✅ | ✅ |
| Add stores | ✅ | ❌ | ❌ |
| Add users (admin/normal/store_owner) | ✅ | ❌ | ❌ |
| View dashboard stats (total users/stores/ratings) | ✅ | ❌ | ❌ |
| View store list + filters | ✅ | ✅ (search only) | ❌ |
| View user list + filters | ✅ | ❌ | ❌ |
| Submit/edit a rating | ❌ | ✅ | ❌ |
| View own store's rating summary | ❌ | ❌ | ✅ |
| View list of raters for own store | ❌ | ❌ | ✅ |

---

## 4. Database Schema

### 4.1 `users`

| Column | Type | Constraints |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| name | VARCHAR(60) | NOT NULL, length 20–60 (validated at app layer) |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| password | VARCHAR(255) | NOT NULL (bcrypt hash) |
| address | VARCHAR(400) | NOT NULL |
| role | ENUM('admin','normal','store_owner') | NOT NULL, DEFAULT 'normal' |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP |

### 4.2 `stores`

| Column | Type | Constraints |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| name | VARCHAR(60) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| address | VARCHAR(400) | NOT NULL |
| owner_id | INT | FK → users.id (nullable — not every store needs an owner account) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 4.3 `ratings`

| Column | Type | Constraints |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| user_id | INT | FK → users.id, NOT NULL |
| store_id | INT | FK → stores.id, NOT NULL |
| rating | TINYINT | NOT NULL, CHECK (rating BETWEEN 1 AND 5) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP |

**Unique constraint:** `(user_id, store_id)` — one user can rate a store only once,
but can *update* that rating (this is what "modify their submitted rating" means in
the spec). **Backend Note:** Handle this gracefully using an UPSERT (`INSERT ... ON DUPLICATE KEY UPDATE`) logic, or strictly validate that `POST` only creates new ratings and `PUT` only updates existing ones.

**Derived value:** `stores.average_rating` is NOT stored as a column — compute it via
`AVG(rating)` on read (`GROUP BY store_id`) to avoid stale data. If performance ever
becomes a concern, revisit with a cached column + trigger, but not needed at this scale.

---

## 5. API Design (REST)

### Auth
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Normal user self-registration |
| POST | `/api/auth/login` | Public | Returns JWT on success |
| POST | `/api/auth/logout` | Authenticated | Invalidate session/clear cookie |
| PUT | `/api/auth/update-password` | Authenticated | Any logged-in role |

### Admin
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/admin/dashboard` | Admin | Total users, stores, ratings counts |
| POST | `/api/admin/users` | Admin | Create user (admin/normal/store_owner) |
| GET | `/api/admin/users` | Admin | List users, supports `?name=&email=&address=&role=&sort=&order=` |
| GET | `/api/admin/users/:id` | Admin | User detail. *If role is `store_owner`, must fetch and include their associated store's average rating.* |
| POST | `/api/admin/stores` | Admin | Create store *(Must accept `owner_id` to link store to a store owner)* |
| GET | `/api/admin/stores` | Admin | List stores, supports filters + sort |

### Normal User
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/stores` | Normal User | List stores. Supports search `?name=&address=` and sort `?sort=&order=`. *Must `LEFT JOIN` ratings on current user's ID to include user's own submitted rating.* |
| POST | `/api/stores/:id/ratings` | Normal User | Submit a new rating |
| PUT | `/api/stores/:id/ratings` | Normal User | Modify own rating |

### Store Owner
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/owner/dashboard` | Store Owner | Average rating + list of raters for their store |

**Auth middleware:** every protected route runs through `verifyToken` → `requireRole([...])`.
Keep role-checking centralized in one middleware, not duplicated per controller.

---

## 6. Frontend Route Map

| Route | Component | Access |
|---|---|---|
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/admin/dashboard` | AdminDashboard | Admin |
| `/admin/users` | UserList (+ Add User modal/page) | Admin |
| `/admin/stores` | StoreList (+ Add Store modal/page) | Admin |
| `/admin/users/:id` | UserDetail | Admin |
| `/stores` | StoreListing (search + rate) | Normal User |
| `/owner/dashboard` | OwnerDashboard | Store Owner |
| `/account/password` | UpdatePassword | Any logged-in role |

Route protection via a `ProtectedRoute` wrapper component that checks JWT + role from
context/state before rendering; redirects to `/login` otherwise.

---

## 7. Form Validation Rules (client + server, both — never trust client-only)

| Field | Rule |
|---|---|
| Name | min 20, max 60 characters |
| Address | max 400 characters |
| Email | standard email format |
| Password | 8–16 characters, at least one uppercase letter, at least one special character |
| Rating | integer, 1–5 inclusive |

Server-side validation is the source of truth (e.g. via `express-validator` or manual
checks in the controller) — client-side is just for UX, so it must never be skipped
on the backend even if the frontend already checked it.

---

## 8. Sorting & Filtering

All list views (users, stores) support:
- **Sort**: ascending/descending on Name, Email, and other key fields — implemented via
  `ORDER BY ${field} ${direction}` with a whitelist of allowed columns (never interpolate
  raw query params directly into SQL — prevents injection).
- **Filter**: partial match (`LIKE '%value%'`) on Name, Email, Address; exact match on Role.

---

## 9. Non-Functional Notes

- Passwords always hashed with bcrypt (salt rounds ~10), never stored/logged in plaintext.
- JWT secret in `.env`, never committed.
- Centralized error-handling middleware in Express — consistent JSON error shape
  (`{ success: false, message: "..." }`).
- Input sanitization on all write endpoints.
- Basic rate limiting on `/api/auth/login` to slow brute-force attempts (nice-to-have if time allows).

---

## 10. Suggested Folder Structure

```
backend/
  src/
    db/
    middleware/auth.js
    routes/
    controllers/
    models/
    utils/validators.js
    app.js
  server.js

frontend/
  src/
    components/
    pages/
    context/AuthContext.jsx
    services/api.js
    App.jsx
```

---

## 11. Build Order (for the 3–4 day window)

1. DB schema + seed script (create admin user manually via seed, since admin can't self-register)
2. Auth endpoints (signup, login, JWT middleware)
3. Admin endpoints (users, stores, dashboard)
4. Normal user endpoints (store list, ratings)
5. Store owner endpoint (dashboard)
6. React: auth pages → role-based routing → admin screens → user screens → owner screen
7. Validation pass (both ends) + sorting/filtering
8. README + `.env.example` + final polish

---

## 12. Open Questions (for interview discussion, not blockers)

- Should store owners be created only via admin, or can a normal user request store-owner status? *(Spec implies admin-only creation — going with that.)*
- Is there a need for pagination on large lists? *(Not stated — will add basic limit/offset if time allows, otherwise plain list is acceptable for challenge scope.)*
