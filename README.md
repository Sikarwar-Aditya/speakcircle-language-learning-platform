<div align="center">
  <h1>SpeakCircle 🌍</h1>
  <p>An interactive language exchange platform connecting learners worldwide through chat, video calls, and more.</p>
</div>

---

## 🚀 Overview

SpeakCircle is a live language learning platform crafted to bridge speakers of diverse native languages with individuals eager to learn new ones. Users can create profiles, discover language partners, send connection requests, and engage in meaningful conversations tailored to their language practice needs.

Whether your goal is to enhance speaking skills, expand vocabulary, or form global friendships, SpeakCircle offers an intuitive experience with cutting-edge communication tools such as messaging, video conferencing, and interactive features — all supported by a scalable and responsive technology stack.

---

## ✨ Key Features

- 💬 **Instant Messaging** with live typing status, message reactions, and smooth synchronization for natural conversations  
- 🎥 **Private and Group Video Chats** including screen sharing and session recording to enrich language practice  
- 🔒 **Secure JWT Authentication** protecting user data and access  
- 🎨 **Customizable Experience** with 32 distinct UI themes to suit personal preferences  
- ⚙️ **Robust Tech Stack:** React, Express, MongoDB, TailwindCSS, and TanStack Query ensuring smooth frontend and backend operations  
- 🧩 **State Management** powered by Zustand for efficient app-wide data handling  
- 🚨 Comprehensive **Error Handling** on both client and server sides for reliability  
- 🚀 **Free Hosting & Deployment** for hassle-free access  
- 🎯 Built on **Stream’s scalable platform** to deliver real-time messaging and notifications  
- ⏳ Plus many additional features aimed at scalability, security, and user engagement  

---

## ⚙️ Environment Configuration

### Backend (`/backend`)
Create a `.env` file in the backend directory with:

```env
PORT=5001
MONGO_URI=your_mongo_uri
STEAM_API_KEY=your_steam_api_key
STEAM_API_SECRET=your_steam_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```
### Frontend (`/frontend`)
Create a `.env` file in the frontend directory with:

```env
VITE_STREAM_API_KEY=your_stream_api_key
```
## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```
