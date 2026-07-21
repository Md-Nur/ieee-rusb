# IEEE RUSB Project Context & Architecture Guide

> **Purpose**: This document serves as the authoritative single source of context for AI assistants, agents, and human developers working on the **IEEE Rajshahi University Student Branch (IEEE RUSB)** web platform.

---

## 1. Project Overview

The **IEEE RUSB** web application is the official digital platform for the IEEE Student Branch at Rajshahi University. It facilitates community management, member directory listings, executive committee administration, technical society activities, event management, technical blogging, photo galleries, user onboarding, and approval workflows.

- **Target Audience**: Students, Faculty Members, Alumni, Executive Committee Members, and Guests.
- **Repository Path**: `/Users/md.nurealamsiddiquee/Projects/ieee-rusb`
- **Main Domain**: Configurable via `NEXT_PUBLIC_URL`

---

## 2. Technology Stack & Key Dependencies

### Core Framework & Runtime
- **Next.js** `^16.0.7` (App Router)
- **React** `^19.2.1` & **React DOM** `^19.2.1`
- **TypeScript** `^5`
- **Package Manager / Runtime**: Bun / Node.js

### Database & ORM
- **MongoDB** via **Mongoose** `^8.9.4`
- Connection singleton in `src/lib/dbConnect.ts` targeting database `ieee_rusb`.

### Authentication & Authorization
- **JWT (jsonwebtoken)** `^9.0.2` stored in HTTP cookies (`userToken`).
- **bcryptjs** `^2.4.6` for password hashing.
- Role-Based Access Control (RBAC) with `isAdmin` boolean flag and role/position vectors.

### UI & Styling
- **Tailwind CSS** `^3.4.1` with **DaisyUI** `^4.12.23`
- **PostCSS** & **ESLint**
- **Framer Motion** `^12.29.0` for animations
- **Swiper** `^11.2.1` for carousels
- **React Icons** `^5.4.0`
- **React Toastify** `^11.0.2` for notifications

### Forms & Rich Text Editing
- **React Hook Form** `^7.54.2`
- **TinyMCE** (`@tinymce/tinymce-react` `^5.1.1` & `tinymce` `^7`) for rich blog & event content creation.

### Image & Media Handling
- **ImgBB API** (`NEXT_PUBLIC_IMGBB_API_KEY`) for hosted image uploads.
- **Sharp** `^0.33.5` for server-side image processing.
- Configured domain origins in `next.config.ts` (`i.ibb.co`, `img.freepik.com`, `ieee.org`, etc.).

### Communication
- **Nodemailer** `^7.0.12` for transactional email delivery (e.g. password resets).

---

## 3. Directory Structure

```
ieee-rusb/
├── .env / .env.sample       # Environment variables
├── next.config.ts           # Next.js config (Remote image patterns)
├── package.json             # Dependencies & scripts
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── PROJECT_CONTEXT.md       # (This file) AI & Developer context
├── README.md                # General project notes & position lists
├── todo.md                  # Active task list & bug tracking
├── scripts/                 # Root utility & maintenance scripts
│   ├── add_executive_role.ts
│   └── check_users.js
└── src/
    ├── app/                 # Next.js App Router
    │   ├── (pages)/         # Page routes grouping
    │   │   ├── (community)/ # Member directory (alumni, EC, faculty, students, graduates)
    │   │   ├── (events)/    # Events pages (all-events, upcoming-events)
    │   │   ├── (societies)/ # 6 Technical Society pages (aps, cs, pes, ras, sps, wie)
    │   │   ├── (user)/      # Authenticated user actions (add-blog, add-event, add-img, dashboard)
    │   │   ├── admin/       # Admin panel & management dashboards
    │   │   ├── blogs/       # Blog listings and detail pages
    │   │   ├── content/     # Dynamic content rendering ([slug])
    │   │   ├── edit-content/# Content editing interface
    │   │   ├── gallery/     # Photo gallery
    │   │   ├── join/        # Member registration page
    │   │   ├── login/       # Login page
    │   │   ├── forgot-password / reset-password
    │   │   └── societies/   # Society selection and overview
    │   ├── api/             # API Endpoints (App Router handlers)
    │   │   ├── auth/        # Password reset flow
    │   │   ├── contents/    # Content CRUD & approval
    │   │   ├── img/         # Image upload handler
    │   │   ├── jwt/         # Token validation
    │   │   └── users/       # User management, login, profile, registration, approval
    │   ├── globals.css      # Custom styling & Tailwind directives
    │   ├── layout.tsx       # Root app layout
    │   └── page.tsx         # Home page
    ├── components/          # React Components by Feature
    │   ├── Admin/           # Admin tables & approval components
    │   ├── Auth/            # Authentication UI elements
    │   ├── Btns/            # Reusable button components
    │   ├── Content/         # Content display and cards
    │   ├── Dashboard/       # Dashboard components
    │   ├── Footer.tsx       # Main footer
    │   ├── Form/            # Input components & rich text integration
    │   ├── Gallery/         # Photo gallery grid & modals
    │   ├── Home/            # Hero, speeches, carousel, sections
    │   ├── Loading.tsx      # Global loading UI
    │   ├── Nav/             # Navigation bars (Main & Mobile)
    │   ├── ShowContents.jsx # Admin content table with filtering
    │   ├── ShowUsers.jsx    # Admin user directory table with approval actions
    │   ├── Skeletons/       # Skeleton loading indicators
    │   └── Societies/       # Society-specific components
    ├── context/             # React Context definitions (userAuth, join)
    ├── provider/            # React Provider wrappers (UserAuthProvider, JoinProvider)
    ├── lib/                 # Core utilities & data fetchers
    │   ├── api-utils.ts     # Base URL resolver
    │   ├── auth.ts          # Server-side cookie-based JWT user extraction
    │   ├── constants.ts     # Positions, departments, roles, societies definitions
    │   ├── content-data.ts  # Cached server-side content retrieval (`unstable_cache`)
    │   ├── dbConnect.ts     # Mongoose MongoDB connection handler
    │   ├── designation.ts   # Designation priority matrix & sorting logic
    │   ├── serialize.ts     # Data serialization helper for MongoDB documents
    │   └── user-data.ts     # Cached user retrieval logic
    ├── models/              # Mongoose Database Models
    │   ├── content.model.ts # Content schema (blogs & events)
    │   ├── photos.model.ts  # Gallery photo schema
    │   └── user.model.ts    # User profile & credentials schema
    └── scripts/             # Local database seeding & debugging scripts
        ├── check_admin.js
        ├── create_admin.js
        └── debug_ras.js
```

---

## 4. Data Models & Database Schemas

### 1. User Model (`src/models/user.model.ts`)
- **Collection**: `users`
- **Fields**:
  - `name`: string (required)
  - `email`: string (required, unique, indexed)
  - `phone`: string (required)
  - `avatar`: string (optional)
  - `linkedin`: string (optional)
  - `password`: string (hashed, required)
  - `roles`: Array of enum values: `["executive-committee", "faculty-member", "student-member", "graduate-member", "alumni"]`
  - `position`: Enum value representing general position/title (e.g., `"Counselor"`, `"Advisor"`, `"Chairperson"`, `"General Secretary"`, `"Volunteer"`, etc.)
  - `designation`: Academic title for faculty (`"Professor"`, `"Associate Professor"`, `"Assistant Professor"`, `"Lecturer"`)
  - `dept`: Academic department enum (`"Electrical & Electronic Engineering"`, `"Computer Science & Engineering"`, `"Materials Science & Engineering"`, `"Information & Communication Engineering"`, `"Applied Chemistry & Chemical Engineering"`, `"Others"`)
  - `session`: string (e.g. `"2020-21"`)
  - `ieee_id`: string (optional, unique, indexed)
  - `isAdmin`: boolean (default `false`)
  - `isApproved`: boolean (default `false`, indexed)
  - `societies`: Array of society keys user belongs to.
  - `society_designations`: Array of objects `{ society: string, designation: string }` for society-specific roles.
  - `forgotPasswordToken`, `forgotPasswordTokenExpiry`: Password reset fields.

### 2. Content Model (`src/models/content.model.ts`)
- **Collection**: `contents`
- **Fields**:
  - `title`: string (required)
  - `content`: string (HTML rich text from TinyMCE, required)
  - `type`: string enum `["blog", "event"]` (required)
  - `date`: string (required)
  - `thumbnail`: string (image URL, required)
  - `slug`: string (unique identifier for URLs, required)
  - `regUrl`: string (optional registration URL for events)
  - `tags`: string[]
  - `userId`: ObjectId reference to `User` (required)
  - `society`: Enum of societies or `"main"` (default `"main"`)
  - `societyId`, `societySlug`: Optional fields for society mapping
  - `isApproved`: boolean (default `false`)
  - `timestamps`: `createdAt`, `updatedAt`

### 3. Photos / Gallery Model (`src/models/photos.model.ts`)
- **Collection**: `galleries`
- **Fields**:
  - `title`: string (required)
  - `date`: string (required)
  - `img`: string (image URL, required)
  - `isApproved`: boolean (default `false`)

---

## 5. Key Business Logic & Algorithms

### Designation Priority & Member Sorting (`src/lib/designation.ts`)
Users displayed on committee and member pages are sorted based on a strict organizational hierarchy:
1. Counselor (Priority 1)
2. Advisor (Priority 2)
3. Alumni (Priority 3)
4. Senior Member (Priority 4)
5. Chairperson (Priority 5)
6. Vice Chairperson (Priority 6)
7. General Secretary (Priority 7)
8. Assistant General Secretary (Priority 8)
9. Treasurer (Priority 9)
10. Webmaster (Priority 10)
11. Program Coordinator (Priority 11)
12. Graphic Designer (Priority 12)
13. Content Development (Priority 13)
14. Membership Development (Priority 14)
15. Public Relation Coordinator (Priority 15)
16. Photographer (Priority 16)
17. Publication Coordinator (Priority 17)
18. Volunteer (Priority 18)
19. Other (Priority 19)

*Note*: `sortUsersByDesignation` evaluates society-specific designations when rendering society committee pages. If identical priorities exist, members are sorted alphabetically by `name`.

### Department Shorthands (`src/lib/constants.ts`)
- Electrical & Electronic Engineering $\rightarrow$ `EEE`
- Computer Science & Engineering $\rightarrow$ `CSE`
- Materials Science & Engineering $\rightarrow$ `MSE`
- Information & Communication Engineering $\rightarrow$ `ICE`
- Applied Chemistry & Chemical Engineering $\rightarrow$ `ACCE`

### Technical Societies (Chapters & Affinity Groups)
1. **Robotics & Automation Society** (`robotics-&-automation-society` / RAS)
2. **Signal Processing Society** (`signal-processing-society` / SPS)
3. **Power & Energy Society** (`power-&-energy-society` / PES)
4. **Computer Society** (`computer-society` / CS)
5. **Antenna & Propagation Society** (`antenna-&-propagation-society` / APS)
6. **Women in Engineering** (`women-in-engineering-society` / WIE)

---

## 6. Authentication & User Approval Flow

1. **User Sign Up**: User submits registration form at `/join`. An unapproved profile (`isApproved: false`) is created in MongoDB.
2. **Admin Approval**: Admins review pending registrations at `/admin` (via `<ShowUsers />` component). Upon approval (`isApproved: true`), the member can log in and populate public member lists.
3. **Session Management**: On login (`/api/users/login`), a JWT `userToken` cookie is generated containing `{ id, email, isAdmin }`.
4. **Auth Context**: `<UserAuthProvider />` fetches `/api/jwt` on client-side mount (or accepts `initialUser` via server component) and updates `UserAuthContext`.
5. **Protected Actions**: Users can post blogs (`/add-blog`), propose events (`/add-event`), or add gallery photos (`/add-img`), which undergo an admin approval check (`isApproved: false` by default).

---

## 7. Environment Variables Reference

| Variable Name | Description | Example / Usage |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `super-secret-jwt-key` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` or `465` |
| `SMTP_USER` | Email username for Nodemailer | `noreply@ieee-rusb.org` |
| `SMTP_PASS` | Email app password | `app-password` |
| `NEXT_PUBLIC_URL` | Base URL of the app | `https://ieee-rusb.org` or `http://localhost:3000` |
| `NEXT_PUBLIC_TINY_API_KEY` | API Key for TinyMCE Rich Text Editor | TinyMCE dashboard key |
| `NEXT_PUBLIC_IMGBB_API_KEY` | API Key for ImgBB direct image uploads | ImgBB developer key |

---

## 8. Common Maintenance Scripts

Located under `src/scripts` & `scripts/`:
- **Create Admin**: `node src/scripts/create_admin.js` - Utility script to elevate or seed an initial admin user in database.
- **Check Admin**: `node src/scripts/check_admin.js` - Inspects current admin users.
- **Check Users**: `node scripts/check_users.js` - Audits existing database users.
- **Add Executive Role**: `bun run scripts/add_executive_role.ts` - Batch updates member role assignments.

---

## 9. Current Todos & Key Items (`todo.md`)
- Add Chairperson's speech to the homepage.
- Public Relations Coordinator position display issue on executive committee page.
- Visual margin/gap adjustment between navbar and hero section on homepage.

---

## 10. Guidelines for AI & Developers

1. **Routing & Server Components**: Prefer Server Components for data fetching using `getContent()` and `getUsers()` from `src/lib/`.
2. **Revalidation**: When adding or approving users or content, call Next.js `revalidateTag('users')` or `revalidateTag('content')`.
3. **Data Mutability**: Always serialize Mongoose documents using `serializeData()` from `src/lib/serialize.ts` before passing to client components.
4. **Design Consistency**: Maintain IEEE branding colors (IEEE Navy `#006699`, Gold accents, DaisyUI components).
