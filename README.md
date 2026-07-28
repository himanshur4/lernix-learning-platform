# Lernix Learning Platform

Lernix is a full-featured e-learning platform built to deliver a smooth and engaging learning experience. It allows users to browse, enroll in, and rate various educational courses while enabling educators to create and manage their own content.

#### 🌐 Live Demo: [https://lernix-psi-two.vercel.app](https://lernix-psi-two.vercel.app)

---

## Features

- **Secure Authentication** — Role-based user authentication via **Clerk** (student and educator roles)
- **Course Payments** — Secure payments and checkout using **Stripe**
- **Redis Caching** — Course listing cached with Redis to reduce database load and speed up the landing page; cache automatically clears when a new course is published
- **Cloudinary Media** — Upload and delivery of course thumbnails, previews, and videos with CDN optimization
- **Course Enrollment** — Browse all published courses, view details, and enroll after payment
- **Educator Tools** — Create courses, upload media, track enrolled students, and view earnings via a dedicated dashboard
- **Progress Tracking** — Students can track lecture completion status in real time
- **Course Ratings** — Enrolled students can rate courses from 1 to 5 stars

---

## Tech Stack

- **Node.js** & **Express.js** — Backend API
- **MongoDB** (Mongoose) — Database
- **Redis** (ioredis) — Caching layer for course data
- **Clerk** — Authentication and user management
- **Stripe** — Payment processing
- **Cloudinary** — Image and video storage and delivery
- **React.js** — Frontend framework
- **Context API** — Global state management
- **Tailwind CSS** — Styling

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/himanshur4/lernix-learning-platform.git
cd lernix-learning-platform
```

### 2. Backend Setup

```bash
cd server
npm install
# Configure environment variables in server/.env
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

---

## Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_url
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
CURRENCY=usd
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`client/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## Redis Caching

- The platform uses **Redis** to cache the list of all published courses (`lernix:all_courses`)
- Cached data expires automatically after **1 hour**
- The cache is **invalidated immediately** when an educator publishes a new course, ensuring users always see fresh content
- This reduces repeated MongoDB queries and improves landing page response time

---

## Stripe Integration

- Stripe is integrated on the frontend using `@stripe/react-stripe-js` and `@stripe/stripe-js`
- Secure payment intent creation is handled on the backend via the Stripe SDK
- Users can enroll in paid courses after successful payment via Stripe Checkout sessions

---

## Cloudinary Integration

- Used to upload and manage course thumbnails, previews, and videos
- Ensures optimized, fast-loading media content with built-in CDN support
- Media files are stored securely and fetched dynamically across the platform

