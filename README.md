# 📚 Live Attendance System API

A real-time backend application for managing classroom attendance using **Node.js**, **Express**, **MongoDB**, and **WebSockets**.

This project demonstrates authentication, role-based authorization, CRUD operations, and real-time communication between teachers and students.

---

## 🚀 Features

- 🔐 User Authentication (Register, Login, Current User)
- 👨‍🏫 Role-Based Access Control (Teacher & Student)
- 📖 Class Management (CRUD)
- ⚡ Real-time Attendance using WebSockets
- 💾 Attendance Persistence in MongoDB
- ✅ Input Validation using Zod
- 🔑 Password Hashing using bcrypt
- 🎟 JWT Authentication
- 🌐 RESTful API Design

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- WebSocket (`ws`)
- JWT
- bcrypt
- Zod
- dotenv

---

## 📁 Project Structure

```
src/
│
├── config/
│   └── db.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── role.middleware.js
│
├── models/
│   ├── User.js
│   ├── Class.js
│   └── Attendance.js
│
├── routes/
│   ├── auth.routes.js
│   └── class.routes.js
│
├── ws/
│   └── attendance.ws.js
│
└── index.js

.env
package.json
README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/live-attendance-system.git
```

Go to the project directory

```bash
cd live-attendance-system
```

Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

## ▶️ Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

---

### Classes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/classes` | Create class |
| GET | `/api/classes` | Get all classes |
| GET | `/api/classes/:id` | Get class by ID |
| PUT | `/api/classes/:id` | Update class |
| DELETE | `/api/classes/:id` | Delete class |

---

### WebSocket

The server supports a single active classroom session.

Students connect through WebSocket to receive live attendance updates.

Teachers can start and end attendance sessions, while student attendance is persisted in MongoDB.

---

## 🔒 Authentication

Protected routes require a JWT token.

Example:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📌 Future Improvements

- Multiple classroom support
- WebSocket room management
- Attendance analytics
- Pagination
- Refresh Tokens
- Rate Limiting
- Docker Support
- Unit & Integration Tests

---

## 📄 License

This project is licensed under the MIT License.
