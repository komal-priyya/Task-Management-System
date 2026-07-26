# Task Management System

A full-stack task management application built with the MERN stack. The project includes a React frontend and a Node.js/Express backend connected to MongoDB, with authentication, authorization, protected routes, role-based admin access, and secure cookie-based JWT authentication.

This project started as a basic task management application with a vanilla JavaScript frontend and has been upgraded to a React-based MERN application with a more complete authentication and authorization system.

---

## 🚀 Features

### Authentication

- User registration
- User login
- User logout
- Password hashing with bcrypt
- JWT-based authentication
- JWT stored in HTTP-only cookies
- Authentication verification through protected API routes
- User profile endpoint
- Authentication state management on the frontend

### Authorization

- Protected backend routes
- Protected frontend routes
- Guest-only routes for Login and Register pages
- Logged-in users are redirected away from Login/Register
- Unauthenticated users are redirected to Login
- Role-based authorization
- Admin-only routes
- Normal users receive `403 Forbidden` when accessing admin routes

### Task Management

- Create Todos
- View Todos belonging to the logged-in user
- Update Todos
- Delete Todos
- Todo ownership verification
- Users cannot modify or delete another user's Todos
- Todos are stored in MongoDB
- Todo data is associated with the authenticated user

### Admin Functionality

- Admin role support
- Admin middleware
- Admin routes
- Admin access control
- Admin can manage users and Todos according to authorization rules
- Normal users cannot access admin-only endpoints

### Frontend

- React-based user interface
- React Router for navigation
- Protected routes
- Guest routes
- Login and registration pages
- Dashboard
- Profile page
- Todo creation and management
- Edit and delete Todo functionality
- Authentication state handled through React Context
- API communication using `fetch`
- Credentials included for cookie-based authentication
- Responsive UI built with Tailwind CSS

### Error Handling

- Authentication errors
- Authorization errors
- Invalid credentials handling
- Duplicate email handling
- Invalid MongoDB ObjectId handling
- Protected route errors
- Unauthorized Todo access handling
- Appropriate HTTP status codes

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Vite
- JavaScript (ES6+)
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser
- CORS
- dotenv

### Development Tools

- Git
- GitHub
- VS Code
- Postman

---

## 📁 Project Structure

```text
Task Management System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── GuestRoute.jsx
│   │   │   └── ProtectedRoute.jsx
|   |   |   ├──TodoForm.jsx
│   │   │   
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Logout.jsx
│   │   │   └── Profile.jsx
│   │   │   ├──Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── todoController.js
│   │
│   ├── middleware/
│   │   ├── AdminMiddleware.js
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── todoModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├──utils/
|   |   ├──generateToen.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
---

## ⚙️ Installation

### Clone the repository

```bash
git clone  https://github.com/komal-priyya/Task-Management-System.git
```

### Navigate to the backend

```bash
cd backend
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env

DATABASE_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

### Start the server

```bash
npm start
```

---

## 🔐 Authentication Flow

1. Register a new account.
2. Log in with your credentials.
3. A JWT is generated and stored in an HTTP-only cookie.
4. Protected routes verify the token before allowing access.
5. Each user can only manage their own tasks.

---

## 📌 Future Improvements

- Task Categories
- Due Dates
- Task Priorities
- Search & Filter
- Pagination
- Responsive UI
- React Frontend
- Docker Deployment

---

## 👩‍💻 Author

**Komal Priya**

If you found this project helpful, feel free to ⭐ the repository.
