# Lernix – Learning Platform

Lernix is a full-featured e-learning platform built to deliver a smooth and engaging learning experience. It allows users to browse, enroll in, and rate various educational courses while enabling admins to manage course content and users seamlessly.

## 🧭 Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/himanshur4/lernix-learning-platform.git
   ```
2. Install dependencies:

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Set up environment variables in `.env` files in both `client` and `server`.
4. Start the development servers:

   ```bash
   cd server && npm run dev
   cd ../client && npm run dev
   ```

---
## 🚀 Features

### 🔹 User Functionality

* **Sign Up / Log In** – Seamless and secure authentication powered by **Clerk**.
* **Browse Courses** – View and explore a list of available courses.
* **Enroll in Courses** – Easy enrollment in chosen courses.
* **Add Courses** - Add courses option for educators.
* **Watch Video Content** – Integrated video player for seamless learning.
* **Track Progress** – Keep track of completed lectures and progress in real-time.
* **Responsive UI** – Mobile-first design for all screen sizes.

### 🔸 Admin Functionality

* **Course Management** – Add, edit, or delete courses and lectures.
* **User Management** – View and manage enrolled users.
* **Dashboard Analytics** – Overview of platform metrics.

### 📦 Additional Features

* **Clerk Authentication** – Modern, scalable auth with support for social logins and session handling.
* **Cloudinary Integration** – Upload and manage videos and thumbnails in the cloud.
* **Stripe Payments** – Monetization via Stripe.
* **Protected Routes** – Role-based access control (Educator/User).
* **Searching and Filtering** – Find courses quickly by keyword.

---

## 🛠️ Tech Stack

### 💻 Frontend

* **React.js** (with Vite) – Fast and modern frontend framework
* **Tailwind CSS** – Utility-first styling
* **React Router DOM** – Declarative routing
* **Axios** – HTTP requests to backend
* **Clerk** – Authentication and user management

### 🌐 Backend

* **Node.js** + **Express.js** – Backend server and REST API
* **MongoDB** + **Mongoose** – NoSQL database and object modeling
* **Multer** – File upload middleware
* **Cloudinary SDK** – Media upload and management
* **Stripe SDK** – Payment processing

### 🧪 Tools & Utilities

* **Postman** – API testing
* **Dotenv** – Environment variable management
* **Nodemon** – Backend development with auto-reload

---



---


## 🙌 Contributing

Feel free to open issues or pull requests. Contributions are always welcome!

---

