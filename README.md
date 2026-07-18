# 📋 Task Management System

A full-stack Task Management System that allows users to securely register, log in, and manage their personal tasks. The application uses JWT authentication, HTTP-only cookies, and MongoDB to provide a secure and efficient task management experience.

---

## 🚀 Features

- 🔐 User Registration & Login
- 🔒 Password Hashing using bcrypt
- 🍪 JWT Authentication with HTTP-only Cookies
- 🛡️ Protected Routes
- ➕ Create Tasks
- 📄 View Personal Tasks
- ✏️ Update Tasks
- ❌ Delete Tasks
- 🗄️ MongoDB Database Integration
- 🌐 RESTful API Architecture

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- Cookie Parser
- CORS
- dotenv

---

## 📁 Project Structure

```
task-management-system/
│
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env (not included)
│   ├── package-lock.json
|   |── package.json
│   └── server.js
│
|── frontend/
|   ├──css/
|   ├──js/
|   ├──pages/
|   ├──index.html
├── .gitignore
└── README.md
```

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
