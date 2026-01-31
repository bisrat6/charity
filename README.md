# Corner Stone - Charity Connect Platform

Corner Stone is a modern, full-stack charity platform connecting donors and volunteers with meaningful causes. Built with the **MERN Stack** (MongoDB, Express, React, Node.js).

## 🚀 Key Features

*   **Campaigns**: Browse and donate to various charitable causes with real-time progress tracking.
*   **Donations**: Secure payment processing via **Chapa** integration.
*   **Volunteering**: Apply to volunteer with skill tracking and application status updates.
*   **User Dashboard**: Track your donations, volunteer applications, and impact.
*   **Admin Panel**: Full control over campaigns, users, and volunteer vetting.
*   **Authentication**: Secure JWT-based login and signup with role-based access control.

## 🛠️ Tech Stack

*   **Frontend**: React, Vite, Tailwind CSS, Axios, React Router.
*   **Backend**: Node.js, Express, Mongoose (MongoDB).
*   **Security**: BCrypt (hashing), JWT (tokens), CORS protections.

## 🏁 Quick Start

### Prerequisites
*   Node.js installed
*   MongoDB installed and running locally

### 1. Setup Backend
```bash
cd backend
npm install
# Set up .env file (see .env.example)
npm run seed  # (Optional) Populates database with sample campaigns
npm run dev   # Starts server on port 5000
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev   # Starts Vite server on port 5173
```

## 📂 Project Structure

*   `/backend` - API logic, database models, and routes.
*   `/frontend` - React User Interface.
*   `IMPLEMENTATION_SUMMARY.md` - Detailed technical breakdown of implemented features.

## 📄 Documentation

For a deep dive into the implementation details, endpoints, and file structure, please read the [Implementation Summary](./IMPLEMENTATION_SUMMARY.md).
