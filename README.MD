# 🔐 Secure Task Management Dashboard

A full-stack secure task management application built using React, TypeScript, Node.js, Express, and MongoDB.  
The application ensures all frontend-backend interactions are authenticated and strictly type-safe.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- React Router
- Axios
- @tanstack/react-query (for data fetching & state management)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Zod (validation)

---

## 📌 Features

- 🔐 JWT-based authentication (Login / Register)
- 🚫 No public access to task APIs
- 📦 Full CRUD operations (Create, Read, Update, Delete)
- 👤 User-specific task ownership enforcement
- ⚡ React Query for efficient server-state management
- 🧪 Strict TypeScript usage (no `any` types)
- Deploy frontend and backend to cloud platforms

# Secure Task Management Dashboard

A full-stack task management application built with React, TypeScript, Node.js, Express, and MongoDB. The app provides JWT-based authentication and user-specific task ownership with a focus on type-safety and clear developer experience.

## Key Features

- **Authentication:** JWT-based login and registration
- **Task CRUD:** Create, read, update, and delete tasks (user-scoped)
- **Protected APIs:** All task routes require authentication
- **Validation:** Input validation using Zod
- **API Docs:** Swagger documentation for backend endpoints
- **Frontend:** React + TypeScript + Tailwind CSS with React Query for server state

## Tech Stack

- Frontend: React (Vite), TypeScript, Tailwind CSS, React Router, Axios, @tanstack/react-query
- Backend: Node.js, Express, TypeScript, MongoDB (Mongoose), JWT, Zod

## Getting Started

Prerequisites:

- Node.js (>=16)
- npm or yarn
- MongoDB (Atlas or local)

Clone the repo and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/secure-task-dashboard.git
cd secure-task-dashboard
```

Backend (run from the `backend` folder):

```bash
cd backend
npm install
# create a .env file (see template below)
npm run dev
```

Frontend (run from the `frontend` folder):

```bash
cd frontend
npm install
npm run dev
```

Default ports:

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## Backend .env Template

Create `backend/.env` with the following variables (replace placeholders):

```
PORT=5000
MONGO_URI=mongodb+srv://taskuser:ePDJZHEnw3HMC3t@cluster0.hrfmq6d.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_here
```

Security note: Never commit real secrets to the repository. Use environment variables or a secrets manager.

## Available Scripts

- Backend:
	- `npm run dev` — start backend in development with ts-node / nodemon
	- `npm run build` — compile TypeScript
	- `npm start` — run compiled backend
- Frontend:
	- `npm run dev` — start Vite dev server
	- `npm run build` — build production assets
	- `npm preview` — preview built app

## API Documentation

Swagger is configured in the backend and served (by default) at `/api-docs` when the backend is running. Open `http://localhost:5000/api-docs` to view and test endpoints.

## Development Notes

- Uses `@tanstack/react-query` to manage server state and caching on the frontend.
- Axios instance includes interceptor to attach JWT token from client storage.
- Zod schemas validate incoming request payloads on the backend.

## Contributing

Contributions are welcome. Open an issue or submit a PR with a clear description of changes.

## License

This project is provided as-is. Add your preferred license if you plan to release it.

---

If you'd like, I can also:

- Add a quick start script or npm workspace config
- Create a `.env.example` file in `backend/`
- Open a PR with these changes

---

## 📦 Third-Party Packages & Design Decisions

The following third-party libraries were selected to enhance scalability, maintainability, and security of the application.

---

### 🔹 @tanstack/react-query

Used for efficient server-state management and data fetching.

**Why chosen:**
- Automatic caching and background refetching
- Built-in loading and error states
- Query invalidation after mutations
- Cleaner alternative to manual `useEffect` + state management
- Improves scalability for future feature expansion

React Query significantly simplifies asynchronous data handling and improves overall frontend performance.

---

### 🔹 Axios

Used for handling HTTP requests between frontend and backend.

**Why chosen:**
- Cleaner syntax compared to native fetch
- Automatic JSON parsing
- Built-in interceptors (used to attach JWT token to requests)
- Centralized API configuration

Axios allows secure and maintainable API communication.

---

### 🔹 Zod

Used for backend request validation.

**Why chosen:**
- Schema-based validation
- Type-safe validation with TypeScript integration
- Clear and structured error handling
- Prevents invalid or malicious input from reaching database logic

Zod ensures strong input validation and improves backend reliability.

---

### 🔹 jsonwebtoken (JWT)

Used for implementing stateless authentication.

**Why chosen:**
- Secure token-based authentication
- Scalable (no server-side session storage required)
- Allows protected routes using middleware
- Industry-standard authentication approach

JWT ensures that all task operations are securely tied to authenticated users.

---

### 🔹 Tailwind CSS

Used for styling and responsive UI design.

**Why chosen:**
- Utility-first approach
- Rapid UI development
- Consistent design system
- Responsive design with minimal custom CSS
- Clean and modern UI implementation

Tailwind enables scalable and maintainable styling without writing large CSS files.

---

### 🔹 Swagger (swagger-jsdoc & swagger-ui-express)

Used for API documentation.

**Why chosen:**
- Self-documented backend endpoints
- Improves developer experience
- Allows easy testing of APIs
- Demonstrates production-ready API design

Swagger makes backend endpoints transparent and easy to evaluate.


## ⚠️ Known Limitations & Future Improvements

While the core functional and security requirements are fully implemented, the following enhancements could further improve the system if additional time were available:

---

### 🎨 UI & User Experience Enhancements
- Add smoother animations and micro-interactions
- Improve visual hierarchy and design polish
- Implement dark/light theme toggle
- Add advanced filtering, sorting, and search functionality
- Improve mobile-first responsiveness and accessibility compliance (ARIA roles)

---

### 🔐 Advanced Security Improvements
- Implement Two-Factor Authentication (2FA)
- Add third-party email verification during registration
- Introduce refresh token mechanism for improved session management
- Implement rate limiting to prevent brute-force attacks
- Add account lockout policy after repeated failed login attempts

---

### ⚙️ Backend & Architecture Improvements
- Introduce role-based access control (RBAC)
- Add structured logging and monitoring
- Implement centralized error logging (e.g., using a logging service)
- Add automated unit and integration testing
- Introduce Docker support for containerized deployment

---

### 🚀 Deployment & DevOps Enhancements
- Deploy frontend and backend to cloud platforms
- Configure CI/CD pipeline
- Add environment-based configuration management

---

