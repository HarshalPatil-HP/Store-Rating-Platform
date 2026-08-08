# Build Timeline & Progress Tracker — Store Rating Platform

**Deadline: 11 Aug, 9:00 AM** | **Today: 8 Aug**
Rule: check a box only after it actually runs/works, not after you "wrote" it.

---

## DAY 1 — 8 Aug (tonight) — DB + Backend Skeleton

### Phase 1.1 — Database (THINK then CODE, ~1 hr)
- [done] `backend/src/db/connection.js` — mysql2 pool using `.env` vars
- [done] `backend/src/db/schema.sql` — write CREATE TABLE for `users`, `stores`, `ratings` (use Section 4 of the PRD, don't improvise columns)
- [done] Run schema.sql in MySQL Workbench/CLI, confirm 3 tables exist (`SHOW TABLES;`)
- [done] Manually `INSERT` one test admin row (bcrypt hash it later, plain text ok just to confirm insert works, delete after)

### Phase 1.2 — Models (CODE, ~1 hr)
- [ ] `backend/src/models/userModel.js` — functions: `createUser`, `findByEmail`, `findById`, `listUsers(filters, sort)`
- [ ] `backend/src/models/storeModel.js` — `createStore`, `listStores(filters, sort)`, `findStoreById`
- [ ] `backend/src/models/ratingModel.js` — `upsertRating`, `getRatingsForStore`, `getAverageForStore`
- [ ] Quick sanity check: call one model function from a scratch `test.js`, `console.log` result, delete file after

### Phase 1.3 — Core middleware + app shell (CODE, ~1 hr)
- [ ] `backend/src/middleware/errorHandler.js` — one function, consistent `{success:false, message}` JSON
- [ ] `backend/src/app.js` — express init, `express.json()`, cors, mount error handler at bottom (routes come later)
- [ ] `backend/server.js` — `app.listen(PORT)`
- [ ] Run `node server.js`, confirm "listening on port X" — commit: `git commit -m "db + models + app skeleton"`

**Stop for today once this runs. Sleep matters more than rushing — you have 2.5 days left.**

---

## DAY 2 — 9 Aug — Full Backend (Auth → Admin → User → Owner)

### Phase 2.1 — Validators (THINK+CODE, ~45 min)
- [ ] `backend/src/utils/validators.js` — name/email/password/address/rating rules from PRD Section 7 (plain functions, no library needed if short on time)

### Phase 2.2 — Auth (CODE, ~2 hr)
- [ ] `backend/src/middleware/auth.js` — `verifyToken`, `requireRole(roles)`
- [ ] `backend/src/controllers/authController.js` — `signup`, `login` (bcrypt.compare + jwt.sign), `logout`, `updatePassword`
- [ ] `backend/src/routes/authRoutes.js` — wire the 4 routes
- [ ] Mount in `app.js`: `app.use('/api/auth', authRoutes)`
- [ ] **Test in Postman NOW**: signup → login → copy token → hit a dummy protected route. Don't move on until login returns a real JWT.

### Phase 2.3 — Admin APIs (CODE, ~2 hr)
- [ ] `backend/src/controllers/adminController.js` — dashboard stats, createUser, listUsers, createStore, listStores
- [ ] `backend/src/routes/adminRoutes.js` — all routes behind `requireRole(['admin'])`
- [ ] Mount + test each endpoint in Postman with admin token

### Phase 2.4 — Normal User APIs (CODE, ~1.5 hr)
- [ ] `backend/src/controllers/userController.js` — listStores (with search + own rating joined in), submitRating, updateRating
- [ ] `backend/src/routes/userRoutes.js`
- [ ] Mount + test in Postman with a normal-user token

### Phase 2.5 — Store Owner API (CODE, ~45 min)
- [ ] `backend/src/controllers/ownerController.js` — dashboard: raters list + average rating
- [ ] `backend/src/routes/ownerRoutes.js`
- [ ] Mount + test

### Phase 2.6 — Seed script + wrap-up (~30 min)
- [ ] `backend/src/db/seed.js` — inserts one admin (hashed password) so you can log in without manual SQL
- [ ] Full Postman pass: every route from PRD Section 5, one by one
- [ ] `git commit -m "backend complete"`, merge `backend` branch into `main`

**Backend must be 100% done and tested by end of Day 2. Do not start React with a half-working backend.**

---

## DAY 3 — 10 Aug — React (Learn + Build)

### Phase 3.1 — React refresher (THINK, ~1.5 hr, morning)
- [ ] Re-do useState practice (Toggle component from earlier)
- [ ] Learn: props, `useEffect` (for API calls on mount), conditional rendering, `.map()` for lists
- [ ] Learn React Router basics: `<Routes>`, `<Route>`, `useNavigate`

### Phase 3.2 — Frontend plumbing (CODE, ~1.5 hr)
- [ ] `frontend/src/services/api.js` — axios instance, baseURL, request interceptor attaches JWT
- [ ] `frontend/src/context/AuthContext.jsx` — stores user + token, `login()`, `logout()` functions
- [ ] `frontend/src/components/ProtectedRoute.jsx` — redirect to `/login` if no token/wrong role
- [ ] `frontend/src/App.jsx` — set up all routes from PRD Section 6 (pages can be empty stubs for now)

### Phase 3.3 — Auth pages (CODE, ~1.5 hr)
- [ ] `pages/Login.jsx` — form, calls `authAPI.login`, saves token via context, redirects by role
- [ ] `pages/Signup.jsx` — form with validation matching backend rules
- [ ] Test: signup a real user, log in, confirm redirect works

### Phase 3.4 — Admin screens (CODE, ~3 hr, afternoon/evening)
- [ ] `pages/admin/AdminDashboard.jsx` — 3 stat cards from `/api/admin/dashboard`
- [ ] `components/UserList.jsx` — table + sort headers + filter inputs
- [ ] `components/StoreList.jsx` — same pattern
- [ ] `pages/admin/AddUser.jsx`, `AddStore.jsx` — forms

### Phase 3.5 — Normal user + owner screens (CODE, ~2 hr, night)
- [ ] `pages/user/StoreListing.jsx` — store cards/table + search + star rating input
- [ ] `components/RatingStars.jsx` — reusable 1-5 star clickable component
- [ ] `pages/owner/OwnerDashboard.jsx` — average rating + raters table
- [ ] `pages/UpdatePassword.jsx`

**By end of Day 3: every screen exists and talks to the backend, even if ugly.**

---

## DAY 4 — 11 Aug, before 9 AM — Polish + Submit

### Phase 4.1 — Styling pass (~1.5 hr, late night 10th / early 11th)
- [ ] Tailwind cleanup — consistent spacing, buttons, table styling. Function > beauty, but don't submit unstyled HTML.

### Phase 4.2 — Full end-to-end test (~1 hr)
- [ ] Fresh browser: signup → login as each of 3 roles → do every action listed in PRD per role
- [ ] Fix whatever breaks — this WILL surface bugs, budget real time for it

### Phase 4.3 — README + submission (~45 min)
- [ ] `README.md` — setup steps, `.env.example`, tech stack, how to run both servers
- [ ] Final commit + push all 3 branches, merge to `main`
- [ ] Submit **with buffer before 9 AM**, not at 8:59

---

## Rules while executing
1. Don't skip Postman testing to "save time" — untested backend code wastes more time later.
2. If a phase is taking 2x longer than estimated, cut scope (e.g. skip pagination, skip extra styling) — don't cut testing.
3. Update this file's checkboxes as you go — that's your only progress signal, use it.
