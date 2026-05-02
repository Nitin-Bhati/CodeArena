# CodeArena 🚀

CodeArena is a full-stack competitive programming platform (similar to LeetCode) where users can solve coding problems, test their solutions in real-time, and get AI-powered assistance.

## ✨ Features

- **Problem Solving:** Support for multiple languages (C++, Java, JavaScript) with a built-in Monaco Editor.
- **Real-time Execution:** Integrated with Judge0 API to run and submit code against hidden test cases.
- **AI Assistant:** Integrated with Google Gemini AI to provide hints and explain complex coding concepts.
- **Admin Panel:** Comprehensive tools for admins to create, delete, and manage problems.
- **Video Solutions:** Support for uploading and viewing video editorials for problems.
- **Authentication:** Secure JWT-based authentication with Redis-backed token blacklisting for logouts.
- **Responsive UI:** Built with React 19, Tailwind CSS 4, and DaisyUI for a modern, dark-themed experience.

## 🏗️ Architecture

CodeArena follows a **Decoupled Client-Server Architecture**:

-   **Frontend (Client):** A Single Page Application (SPA) built with React. It handles user interactions, code editing via Monaco Editor, and state management using Redux. It communicates with the backend via RESTful APIs using Axios.
-   **Backend (Server):** A Node.js Express server that orchestrates business logic, authentication, and integration with third-party services.
-   **Execution Engine:** Leverages the **Judge0 API** for sandboxed code execution, ensuring security and isolation while running user-submitted code.
-   **AI Logic:** Integrates **Google Gemini AI** to provide intelligent code hints and explanations based on the specific problem context.
-   **Data Layer:**
    -   **MongoDB:** Stores persistent data such as user profiles, problem statements, test cases, and submission history.
    -   **Redis:** Acts as a high-speed in-memory store for token blacklisting (security) and session management.
-   **Media Storage:** **Cloudinary** is used for efficient hosting and streaming of video editorials.

## 📁 Project Structure

```text
CodeArena/
├── backend/                # Express Server
│   ├── src/
│   │   ├── config/         # DB and Redis configurations
│   │   ├── controllers/    # Request handlers & business logic
│   │   ├── middleware/     # Auth and validation guards
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoint definitions
│   │   ├── utils/          # Helpers (validators, code execution logic)
│   │   └── index.js        # Entry point
│   └── .env                # Server environment variables
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI parts (Editor, Chat, etc.)
│   │   ├── pages/          # Main views (Login, Home, Problem)
│   │   ├── store/          # Redux state management
│   │   ├── utils/          # Axios client & helpers
│   │   ├── App.jsx         # Routing & main component
│   │   └── main.jsx        # App entry point
│   └── .env                # Client environment variables
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4 + DaisyUI
- **Editor:** @monaco-editor/react
- **Routing:** React Router 7

### Backend
- **Runtime:** Node.js (Express)
- **Database:** MongoDB (Mongoose)
- **Cache:** Redis (for session/token management)
- **AI:** Google Generative AI (Gemini)
- **Execution:** Judge0 API
- **Media:** Cloudinary (for video solution storage)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Redis account (Redis Labs or local)
- Cloudinary account
- Gemini AI API Key

### Installation

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd CodeArena
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=3000
   DB_CONNECT_STRING=your_mongodb_uri
   JWT_KEY=your_secret_key
   REDIS_HOST=your_redis_host
   REDIS_PORT=your_redis_port
   REDIS_PASS=your_redis_password
   JUDGE0_KEY=your_judge0_api_key
   GEMINI_KEY=your_gemini_api_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` folder:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Running Locally

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## 🌐 Deployment (Railway)

### Backend
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: Add all variables from your backend `.env` file.
- Add `FRONTEND_URL`: `https://your-frontend-domain.up.railway.app`

### Frontend
- Root Directory: `frontend`
- Build Command: `npm run build`
- Environment Variables:
  - `VITE_API_URL`: `https://your-backend-domain.up.railway.app`

## 📝 License

This project is licensed under the ISC License.
