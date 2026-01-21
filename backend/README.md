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

## Donation endpoints (Chapa)

- `POST /api/donations/create-payment-intent` — body: `{ amount, currency, campaignId?, donationType?, tier? }` (protected, returns Chapa checkout URL)
- `POST /api/donations/webhook` — Chapa webhook endpoint (public, called by Chapa)
- `GET /api/donations/user/:userId` — get user's donations (protected)
- `GET /api/donations/stats` — get donation stats

### Chapa Setup

- Set `CHAPA_SECRET_KEY` in your `.env` file.
- Set `BACKEND_URL` and `FRONTEND_URL` for correct callback/return URLs.
- Ensure your webhook endpoint `/api/donations/webhook` is accessible by Chapa (public URL in production).

### Donation Flow

1. Frontend calls `create-payment-intent` to get Chapa checkout URL.
2. User completes payment on Chapa.
3. Chapa calls your webhook with payment status.
4. On success: donation is saved, campaign progress is updated, and a receipt is emailed to the donor.

## Dev tips

- Seed dev data: `npm run seed` (clears and inserts sample records). Do not run in production.
- Ensure `backend/.env` contains `MONGODB_URI` for local MongoDB before starting the server.
