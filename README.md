# E-Learning MERN Platform

A full-stack e-learning platform built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to browse courses, enroll, leave reviews, and instructors to manage courses with AI-powered description generation.

## Features

- **User Authentication**: Secure registration and login with JWT (Access & Refresh tokens).
- **Course Management**: Create, update, and delete courses.
- **AI Integration**: Generate course descriptions using AI (Groq SDK / Llama 3).
- **Enrollment System**: Users can enroll in courses and view their enrolled courses.
- **Reviews**: Users can leave reviews for courses.
- **Profile Management**: Users can update their profiles.
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive UI.

## Tech Stack

### Frontend
- **React** (v19)
- **Vite** (Build tool)
- **TypeScript**
- **Tailwind CSS** (v4)
- **Axios** (API requests)
- **React Router DOM** (Routing)

### Backend
- **Node.js** & **Express**
- **MongoDB** (Database) & **Mongoose**
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)
- **Groq SDK** (AI integration)

## Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (Local or Atlas connection string)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd elearning-mern
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH=your_jwt_refresh_secret_key
GROQ_API_KEY=your_groq_api_key
```

Start the backend server:
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Enrollment
- `POST /api/enroll/enroll/:courseId` - Enroll in a course
- `GET /api/enroll/my-courses` - Get user's enrolled courses
- `DELETE /api/enroll/:courseId` - Cancel enrollment

### AI
- `POST /api/ai/generate-description` - Generate course description using AI

## Project Structure

```
elearning-mern/
├── backend/         # Node.js/Express Backend
│   ├── config/      # DB Configuration
│   ├── controllers/ # Route Controllers
│   ├── middleware/  # Auth & Error Middleware
│   ├── models/      # Mongoose Models
│   ├── routes/      # API Routes
│   └── server.js    # Entry point
│
└── frontend/        # React Frontend
    ├── src/
    │   ├── api/     # API calls
    │   ├── components/
    │   ├── pages/
    │   └── ...
    └── ...
```
