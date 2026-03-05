```markdown
# Login Page (Frontend + Backend)

A full‑stack login system built with **React (Vite)** on the frontend and **Express + SQLite + JWT** on the backend.  
It supports secure authentication, protected routes, and a simple welcome dashboard.

---

## 🚀 Features
- **Backend**
  - Express server with SQLite database
  - User authentication with bcrypt password hashing
  - JWT token generation and verification
  - Protected `/dashboard` route
  - Auto‑seeded `admin` user (`username: admin`, `password: admin`)

- **Frontend**
  - React (Vite) app with React Router
  - Login page with styled form
  - Welcome page with protected data fetch
  - JWT stored in `localStorage`
  - Simple CSS styling for login and welcome pages

---

## 📂 Project Structure
```
loginPage/
 ├── backend/
 │    ├── server.js
 │    ├── users.db
 │    ├── .env
 │    └── package.json
 ├── frontend/
 │    ├── src/
 │    │    ├── App.jsx
 │    │    ├── main.jsx
 │    │    └── components/
 │    │         ├── login/
 │    │         │    ├── index.jsx
 │    │         │    └── login.css
 │    │         └── welcome/
 │    │              ├── index.jsx
 │    │              └── welcome.css
 │    ├── .env
 │    └── package.json
 └── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/NajiniShaik/login-page.git
cd login-page
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file:
```
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend:
```bash
node server.js
```
Backend will start at `http://localhost:5000`.

---

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file:
```
VITE_API_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```
Frontend will start at `http://localhost:5173`.

---

## 🔑 Usage
- Visit `http://localhost:5173`
- Login with:
  ```
  username: admin
  password: admin
  ```
- On success, you’ll be redirected to the **Welcome page**.
- The Welcome page fetches protected data from `/dashboard`.

---

## 📦 Deployment
- **Backend** → Deploy to [Render](https://render.com), [Railway](https://railway.app), or similar.
- **Frontend** → Deploy to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com).
- Update `VITE_API_URL` in frontend `.env` to point to your deployed backend.

---

## 🛡️ .gitignore
Make sure you don’t push sensitive files:
```
# Node modules
**/node_modules/

# Environment files
**/.env

# Build output
frontend/dist/
frontend/build/

# Database
backend/users.db

# Logs
*.log
```

---

## 👩‍💻 Author
Developed by **Shaik Najini**  
Emerging Frontend Developer & Web Development Intern, expanding into backend architecture and API design.
```

---
  

Do you want me to also add a **“Live Demo” section** so you can drop in your Vercel/Render links once you deploy?
