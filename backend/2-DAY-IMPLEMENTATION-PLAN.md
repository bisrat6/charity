# 2-Day Backend Implementation Plan (Team of 2)

## Overview

Building a **medium complexity** backend for CORNERSTONE charity website with a **2-person team** in **2 days**. This plan is structured into 7 phases with clear task division to enable parallel development.

**Tech Stack:** Node.js + Express.js + MongoDB + Mongoose + JWT + Stripe + NodeMailer

---

## Phase 1: Foundation Setup (Day 1 Morning - 3 hours)

**👤 Person A - Project Infrastructure**

#### [NEW] package.json
Initialize Node.js project with dependencies:
- `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `dotenv`, `cors`, `express-validator`, `stripe`, `nodemailer`

#### [NEW] .env.example
Environment variables template with MongoDB URI, JWT secret, Stripe keys, email credentials

#### [NEW] server.js
Express server with middleware (CORS, JSON parser, error handler), route mounting, MongoDB connection

#### [NEW] config/database.js
Mongoose connection configuration

**Folder structure:**
```
backend/
├── config/
├── models/
├── controllers/
├── routes/
├── middleware/
├── utils/
└── server.js
```

---

**👤 Person B - Database Models (Mongoose)**

#### [NEW] models/User.js
- `fullName`, `email` (unique), `password` (hashed), `role` (enum), `createdAt`

#### [NEW] models/Donation.js
- `userId` (ref User), `amount`, `currency`, `donationType`, `tier`, `stripePaymentIntentId`, `status`, `createdAt`

#### [NEW] models/Volunteer.js
- `userId` (ref User), `phone`, `skillset`, `availability`, `interests`, `message`, `status`, `createdAt`

#### [NEW] models/Campaign.js
- `title`, `description`, `goalAmount`, `currentAmount`, `status`, `createdBy` (ref User), `createdAt`, `updatedAt`

---

## Phase 2: Authentication System (Day 1 Afternoon - 3 hours)

**👤 Person A - Auth Implementation**

#### [NEW] routes/auth.js
- `POST /api/auth/signup` - Register user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/forgot-password` - Password reset (optional)

#### [NEW] controllers/authController.js
- User registration with bcrypt password hashing
- Login with JWT token generation (7-day expiry)
- Input validation (email format, password strength)
- Error handling (duplicate email, invalid credentials)

#### [NEW] middleware/auth.js
- JWT verification middleware for protected routes
- Attach user object to request

#### [NEW] utils/validators.js
- Email, password, phone validation helpers using express-validator

**Test:** Register user, login, verify JWT token works on protected route

---

## Phase 3: Email & Volunteer System (Day 1 Afternoon - 3 hours)

**👤 Person B - Volunteer + Email**

#### [NEW] utils/emailService.js
- NodeMailer configuration
- Email templates: `sendWelcomeEmail()`, `sendVolunteerConfirmation()`, `sendDonationReceipt()`

#### [NEW] routes/volunteers.js
- `POST /api/volunteers/apply` - Submit application
- `GET /api/volunteers/applications` - List all (admin)
- `PUT /api/volunteers/:id/status` - Update status (admin)
- `GET /api/volunteers/user/:userId` - User's application

#### [NEW] controllers/volunteerController.js
- Create volunteer application with validation
- Send confirmation email
- Update application status (pending/approved/rejected)
- Filter by skillset/availability

**Test:** Submit volunteer application, verify DB record and email sent

---

## Phase 4: Payment Integration (Day 2 Morning - 3 hours)

**👤 Person A - Stripe Donations**

#### [NEW] routes/donations.js
- `POST /api/donations/create-payment-intent` - Create Stripe intent
- `POST /api/donations/confirm` - Confirm payment
- `GET /api/donations/user/:userId` - User donation history
- `GET /api/donations/stats` - Overall statistics

#### [NEW] controllers/donationController.js
- Stripe SDK integration (test mode)
- Create payment intent with amount/metadata
- Confirm donation and update DB status
- Calculate statistics (total raised, lives impacted = donations ÷ 150)
- Send donation receipt email

**Test:** Create payment intent, confirm donation (use Stripe test cards), verify stats

---

## Phase 5: Campaign Management (Day 2 Morning - 3 hours)

**👤 Person B - Campaigns + Stats**

#### [NEW] routes/campaigns.js
- `GET /api/campaigns` - List active campaigns
- `GET /api/campaigns/:id` - Campaign details
- `POST /api/campaigns` - Create (protected, admin only)
- `PUT /api/campaigns/:id` - Update (protected, admin only)
- `DELETE /api/campaigns/:id` - Delete (protected, admin only)

#### [NEW] controllers/campaignController.js
- CRUD operations for campaigns
- Filter active/completed campaigns
- Calculate progress percentage (currentAmount / goalAmount)
- Update currentAmount when donations linked to campaign

#### [NEW] controllers/statsController.js
- Aggregate donation statistics
- Count active campaigns, total volunteers
- Lives impacted calculation

**Test:** Create campaign, list campaigns, update campaign amount

---

## Phase 6: Integration & Bug Fixes (Day 2 Afternoon - 2 hours)

**👥 Both Developers**

- Merge all modules into main server
- Test complete authentication flow (signup → login → protected route)
- Test donation flow (create intent → confirm → verify DB + email)
- Test volunteer application (submit → verify DB + email)
- Fix CORS issues for frontend integration
- Handle edge cases and validation errors
- Test with invalid inputs for each endpoint

---

## Phase 7: Testing & Documentation (Day 2 Afternoon - 2 hours)

**👥 Both Developers**

#### [NEW] CORNERSTONE-API.postman_collection.json
Postman collection with all endpoints and example requests

#### [NEW] README.md
API documentation:
- Setup instructions
- Environment variables
- Endpoint documentation with request/response examples
- Database schema overview
- Testing instructions

**Final Testing Checklist:**
- ✅ User can register and login
- ✅ Protected routes require valid JWT
- ✅ Donations create Stripe payment intents
- ✅ Donation confirmations update DB
- ✅ Volunteer applications save and send emails
- ✅ Campaigns CRUD works correctly
- ✅ Statistics endpoints return accurate data
- ✅ Frontend can make CORS requests successfully

---

## API Endpoints Summary

**Auth:**
- `POST /api/auth/signup`
- `POST /api/auth/signin`

**Donations:**
- `POST /api/donations/create-payment-intent`
- `POST /api/donations/confirm`
- `GET /api/donations/user/:userId` (protected)
- `GET /api/donations/stats`

**Volunteers:**
- `POST /api/volunteers/apply`
- `GET /api/volunteers/applications` (protected, admin)
- `PUT /api/volunteers/:id/status` (protected, admin)

**Campaigns:**
- `GET /api/campaigns`
- `GET /api/campaigns/:id`
- `POST /api/campaigns` (protected, admin)
- `PUT /api/campaigns/:id` (protected, admin)

**Stats:**
- `GET /api/stats` - Overall impact statistics

---

## Out of Scope (Phase 2 Features)

- ❌ OAuth social login
- ❌ Email verification workflow
- ❌ Recurring donation subscriptions
- ❌ File uploads for campaigns
- ❌ Advanced analytics dashboards
- ❌ Rate limiting
- ❌ Comprehensive automated tests
