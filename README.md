# Store Rating Platform

A full-stack web application that allows users to discover stores and rate them on a scale of 1–5. Built with React (Frontend), Express & Node.js (Backend), and MySQL (Database).

## Features

- **Role-based Access Control**: System Administrator, Normal User, and Store Owner.
- **Admin Dashboard**: Manage stores, users, and view platform statistics.
- **User Features**: Browse stores, search by name/address, and submit/modify ratings.
- **Store Owner Dashboard**: View average ratings and see who rated their store.

## Getting Started

### Prerequisites
- Node.js
- MySQL

### Setup

1. **Database Setup**
   - Create a MySQL database (e.g., `store_rating_platform`).
   - Run the SQL schema (located in `backend/src/db/schema.sql`) to generate tables.

2. **Environment Variables**
   - Configure your `.env` file at the root with your database credentials and JWT secret.

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
