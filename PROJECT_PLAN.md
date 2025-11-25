# Project Plan: Attendance and Internal Marks Management System

## 1. Overview
Build a full-stack web application with role-based access for Students, Staff, and Admin. The system will allow secure authentication, management of attendance and internal marks, automatic attendance calculation, notifications, visualizations, and reporting.

## 2. Technologies
- Frontend:
  - React 19 + TypeScript
  - TanStack Router (for SPA routing)
  - shadcn/ui component library
  - Tailwind CSS v4 (styling)
  - Form validation library (e.g., React Hook Form or Zod)
- Backend:
  - Node.js with Express or Fastify
  - JWT-based authentication with bcrypt password hashing
  - ORM: Prisma or Sequelize
  - Database: SQLite (development) / PostgreSQL or MySQL (production)
- Other:
  - JSON Web Tokens for secure authorization
  - Role-based access control middleware

## 3. Architecture
```
Frontend (React) <--> Backend API (Node.js + Express) <--> Database (PostgreSQL/SQLite)
```

## 4. Folder Structure

```
/frontend
  /src
    /components
      /common           # Reusable UI components
      /auth             # Login, Register components
      /dashboard
        /admin
        /staff
        /student
    /routes             # TanStack Router definitions
    /utils
    /styles             # Tailwind configs and global styles
    App.tsx
    main.tsx

/backend
  /src
    /controllers       # Route handlers
    /middlewares       # Auth, validation, RBAC
    /models            # ORM models (Prisma schema or Sequelize models)
    /routes            # REST API routes
    /services          # Business logic
    /utils
    server.ts          # Entry point
  prisma/              # Prisma related files, if using
.env                  # Environment variables
package.json
tsconfig.json
...

```

## 5. Core Features & Milestones

### Milestone 1: Project Setup
- Initialize React frontend
- Setup TailwindCSS v4 and shadcn/ui
- Setup TanStack Router with placeholder routes
- Setup backend Node.js server and ORM connection
- Setup environment config and .env files

### Milestone 2: Authentication
- Backend: User model with bcrypt password hashing
- Backend: JWT issuing and verifying
- Backend: Auth routes (register, login, logout)
- Frontend: Login/Register forms, validation, auth state management

### Milestone 3: Role-Based Routing & Dashboards
- Protected routes based on JWT and role
- Role dashboards UI: Admin, Staff, Student

### Milestone 4: Attendance and Marks Management
- Backend API for attendance and marks CRUD
- Calculation of attendance % automatically on data update
- Frontend forms and pages for staff to input attendance and marks
- Frontend view for students to see attendance and marks

### Milestone 5: Notifications & Reports
- Backend logic for generating notifications (e.g., low attendance)
- Frontend UI for viewing notifications
- Visualization charts (attendance trends, marks distribution)
- Export reports (CSV or PDF)

### Milestone 6: Testing and Validation
- Add form validations (frontend & backend)
- Unit and integration tests
- User acceptance testing

## 6. Next Steps
- Await approval of this project plan
- Setup frontend folder & React project in `frontend/`
- Proceed to build project incrementally as per milestones

---

Please confirm if you'd like me to proceed with setting up the frontend React project structure next.
