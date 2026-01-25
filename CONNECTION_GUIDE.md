# Frontend-Backend Connection Guide

This guide explains how the frontend and backend are connected and how to run them together.

## Overview

The frontend (React + Vite) and backend (Express.js) are now fully connected and can communicate with each other.

## Configuration

### Backend Configuration

The backend server:
- Runs on port **5000** by default
- Has CORS configured to allow requests from `http://localhost:5173` (frontend)
- API endpoints are prefixed with `/api`

### Frontend Configuration

The frontend:
- Runs on port **5173** by default (Vite dev server)
- Has a proxy configured to forward `/api` requests to `http://localhost:5000`
- Uses axios for HTTP requests
- API service is located at `frontend/src/services/api.js`

## Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/cornerstone
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend (.env)

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** The Vite proxy will handle API requests in development, so you can also use relative URLs like `/api` instead of the full URL.

## Running the Application

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:5000`

### 2. Start the Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Integration

### Authentication

The frontend now has working authentication:

- **Sign Up**: `POST /api/auth/signup`
  - Body: `{ fullName, email, password }`
  - Stores JWT token in localStorage on success

- **Sign In**: `POST /api/auth/signin`
  - Body: `{ email, password }`
  - Stores JWT token in localStorage on success

### API Service

All API calls are centralized in `frontend/src/services/api.js`:

```javascript
import { authAPI } from '../services/api'

// Sign up
await authAPI.signup({ fullName, email, password })

// Sign in
await authAPI.signin({ email, password })
```

The API service automatically:
- Adds the JWT token to requests from localStorage
- Handles 401 errors (unauthorized) by clearing tokens and redirecting
- Uses the configured base URL

## Features Implemented

✅ CORS configuration in backend
✅ Axios HTTP client in frontend
✅ API service utility with interceptors
✅ Sign In form connected to backend
✅ Sign Up form connected to backend
✅ Token storage in localStorage
✅ Error handling and user feedback
✅ Vite proxy for development
✅ Environment variable support

## Testing the Connection

1. Start both servers (backend and frontend)
2. Navigate to `http://localhost:5173/signup`
3. Create a new account
4. You should be redirected to the home page on success
5. Navigate to `http://localhost:5173/signin`
6. Sign in with your credentials
7. Check the browser's Network tab to see API requests

## Troubleshooting

### CORS Errors

If you see CORS errors:
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that the backend CORS configuration includes your frontend origin

### Connection Refused

If you see "connection refused" errors:
- Ensure the backend is running on port 5000
- Check that the `VITE_API_URL` in frontend `.env` is correct
- Verify the Vite proxy configuration in `vite.config.js`

### 401 Unauthorized

If you get 401 errors:
- Check that the JWT token is being stored in localStorage
- Verify the token is being sent in the Authorization header
- Ensure the backend JWT_SECRET matches

## Next Steps

You can now:
- Add more API integrations (campaigns, donations, volunteers)
- Implement protected routes that require authentication
- Add user profile management
- Integrate other backend endpoints

