# 🐾 PawCare

PawCare is a full-stack pet care platform designed to help pet owners manage their pets' health information, discover care providers, and access helpful pet-care resources from one place.

The project was built to explore full-stack development with authentication, pet health records, provider discovery, REST APIs, deployment, and AI integration.

## ✨ Features

- 🔐 User Authentication
  - User registration and login
  - JWT-based authentication
  - Protected routes

- 🐶 Pet Management
  - Add and manage pet information
  - View individual pet profiles

- 🩺 Health Records
  - Store important health information
  - Track vaccinations and medical details
  - Organize pet health records

- 🏥 Care Providers
  - Browse pet-care providers
  - View provider information
  - Find suitable services for pets

- 🤖 AI Pet-Care Assistant
  - Ask pet-care related questions
  - AI-generated responses using Gemini
  - Designed to provide general informational guidance

- 📱 Responsive Interface
  - Responsive design for desktop and mobile
  - Simple and user-friendly navigation

- 🌐 Deployment
  - Frontend deployed on Vercel
  - Backend deployed on Render
  - MongoDB Atlas used for database hosting

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- Vite
- CSS
- React Router

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcryptjs

### Database

- MongoDB
- Mongoose

### AI

- Google Gemini API

### Deployment

- Vercel
- Render
- MongoDB Atlas

## 📁 Project Structure

```text
PawCare/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── public/
├── package.json
├── vite.config.js
└── README.md
