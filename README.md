
# Lernix 🎓

**Lernix** is a full-stack learning platform that allows users to browse and purchase courses, track progress, and access educational content. It features secure Clerk authentication, Stripe-powered payments, Cloudinary media handling, and seamless contextual state management.

#### 🌐 Live Demo: [https://lernix-psi-two.vercel.app](https://lernix-psi-two.vercel.app)

---

## 🚀 Features

* 🔐 User authentication via **Clerk**
* 💳 Secure payments using **Stripe**
* ☁️ **Cloudinary** integration for course media upload and delivery
* 📚 Browse and enroll in courses
* 📝 Create your own courses
* 💡 Modern, responsive UI with smooth user experience

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** (via Mongoose)
* **Stripe** (for handling payments)
* **Cloudinary** (for image/video storage and delivery)
* **React.js**
* **Context API** (for global state)
* **Clerk** (authentication)
* **Tailwind CSS**
* **Stripe.js** and **React Stripe** (client-side payments)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/himanshur4/lernix-learning-platform.git
cd lernix-learning-platform
```

### 2. Backend Setup

```bash
cd server
npm install
# Configure environment variables
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
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

## 💳 Stripe Integration

* Stripe is integrated on the frontend using `@stripe/react-stripe-js` and `@stripe/stripe-js`
* Secure payment intent creation is handled on the backend via Stripe SDK
* Users can enroll in paid courses after successful payment

---

## ☁️ Cloudinary Integration

* Used to upload and manage course thumbnails, previews, and videos
* Ensures optimized, fast-loading media content with built-in CDN support
* Media files are stored securely and fetched dynamically across the platform

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/eb87bc26-78fc-45ac-94e7-50d74ee3c700)
![image](https://github.com/user-attachments/assets/0bbb6901-2251-4025-b899-e827c5aaf103)

---

## 🙌 Contributing

Open to contributions! Feel free to fork the repo, open issues, or submit pull requests.

---

## 📄 License

[MIT License](LICENSE)




