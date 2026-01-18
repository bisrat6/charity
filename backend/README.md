# Backend (Phase One)

Quick start:

1. Copy `.env.example` to `.env` and set values.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Run server:

```bash
npm run dev
```

4. Run startup check (creates sample records):

```bash
npm run check-startup
```

## Postman collection

Import `backend/CORNERSTONE-API.postman_collection.json` into Postman to get ready-made requests for local development. Set the `baseUrl` variable to `http://localhost:5000` and, after signing in, paste the returned token into the `token` variable to test protected endpoints.

## Auth endpoints

- `POST /api/auth/signup` — body: `{ name, email, password }`
- `POST /api/auth/signin` — body: `{ email, password }` (returns `token`)
- `POST /api/auth/forgot-password` — body: `{ email }` (sends/logs reset token)
- `POST /api/auth/reset-password` — body: `{ token, password }`
- `GET /api/auth/me` — protected; header `Authorization: Bearer <token>`

## Dev tips

- Seed dev data: `npm run seed` (clears and inserts sample records). Do not run in production.
- Ensure `backend/.env` contains `MONGODB_URI` for local MongoDB before starting the server.
