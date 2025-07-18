# Student Management System - Backend API


Node.js backend API for a Student Management System with JWT authentication and role-based access control.

## Features

- 🔐 JWT Authentication
- 👥 Role-based authorization (Super Admin, Staff)
- 📝 Student management (CRUD operations)
- 👩‍💼 Staff management
- 🔑 Permission system
- 🛡️ Secure password hashing (bcrypt)
- 🧹 Input validation


## Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- MongoDB Atlas or local MongoDB instance


## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/AbhijithTA/Student_Management_Backend
```

### 2. Install dependencies
```
npm install
```

### 3. Environment Configuration
Create a .env file in the root directory:

```
MONGO_URL ="Your mongoURL"
JWT_SECRET ="Secret key for jwt"
PORT = "port in which the server should run"
```

### 4. Start the server
```
npm run dev
```

API will be available at: http://localhost:PORT


Technologies Used
🟢 Node.js

🟦 Express.js

🍃 MongoDB (Mongoose)

🔑 JWT

🔄 Bcrypt

🧹 ESLint + Prettier

