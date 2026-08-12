# RC-Blog — Full-Stack MERN Blog Platform

A modern, responsive blogging platform built with the MERN stack (MongoDB, Express, React, Node.js), featuring JWT authentication, full CRUD blog management, live search and filtering, dark mode, and a polished, animated UI.

**Live demo:** [your-frontend.vercel.app](#)
**API:** [your-backend.onrender.com](#)

---

## Features

- User registration & login with JWT authentication and bcrypt password hashing
- Protected routes (Dashboard, Create/Edit post, Edit profile) with automatic redirect for unauthenticated users
- Full CRUD on blog posts — create, read, update, delete — with author-only authorization on edit/delete
- Live search and category filtering (debounced, server-side via MongoDB regex queries)
- User dashboard with post stats and account details
- Editable user profile with password strength validation
- Light/dark theme toggle with persisted preference
- Responsive design with mobile hamburger navigation
- Toast notifications for all key actions
- SEO-friendly dynamic meta tags per page (via `react-helmet-async`)
- Lazy-loaded images with broken-image fallback
- Global backend error handling with structured error responses

---

## Tech Stack

**Frontend:** React (Vite), React Router v6, Tailwind CSS, Framer Motion, Axios, React Hot Toast, React Helmet Async, Lucide Icons

**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, express-async-handler, CORS

**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## Project Structure
blog-post-thoughts/ # React frontend
├── src/
│ ├── api/ # Axios instance with interceptors
│ ├── components/ # Reusable UI components
│ ├── context/ # AuthContext, ThemeContext
│ ├── data/ # Static category list
│ ├── pages/ # Route-level pages
│ ├── utils/ # Validation helpers
│ ├── App.jsx
│ └── main.jsx
├── vercel.json
└── package.json

server/ # Express backend
├── config/db.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js
└── package.json

---

## Local Setup

### Prerequisites
- Node.js v18.18+ (v20 LTS recommended)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone and install

```bash
git clone <repo-url>
cd blog-app && npm install
cd ../server && npm install
```

### 2. Environment variables

`server/.env`:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development

`blog-post-thoughts/.env`:

VITE_API_URL=http://localhost:5000/api

Generate a JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Run both servers

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd blog-app && npm run dev
```

Frontend: `http://localhost:5173` · Backend: `http://localhost:5000`

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Log in, returns JWT |
| PUT | `/api/auth/profile` | Protected | Update name, bio, avatar, password |

### Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users/profile` | Protected | Get logged-in user's profile |

### Blogs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/blogs` | Public | Get all posts (supports `?search=` & `?category=`) |
| GET | `/api/blogs/my-blogs` | Protected | Get logged-in user's posts |
| GET | `/api/blogs/:id` | Public | Get a single post |
| POST | `/api/blogs` | Protected | Create a post |
| PUT | `/api/blogs/:id` | Protected (author only) | Update a post |
| DELETE | `/api/blogs/:id` | Protected (author only) | Delete a post |

All protected routes require an `Authorization: Bearer <token>` header.

---

## Deployment

### Backend (Render)
1. Push `server/` to GitHub
2. Render → New Web Service → root directory `server`
3. Build: `npm install` · Start: `npm start`
4. Set env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_ENV=production`

### Frontend (Vercel)
1. Push `blog-app/` to GitHub
2. Vercel → New Project → import repo (Vite auto-detected)
3. Set env var: `VITE_API_URL=<your-render-backend-url>/api`
4. Deploy — `vercel.json` handles SPA routing

### Database (MongoDB Atlas)
1. Create a free M0 cluster
2. Network Access → allow `0.0.0.0/0` (or your host's static IP on paid tiers)
3. Database Access → create a user, copy the connection string into `MONGO_URI`

---

## License

MIT