📦 PCN Inventory & Customer Management System
Full Stack Project – Final Year Project

Technologies: Node.js • TypeScript • Express • MongoDB • React • TypeScript • TailwindCSS

🧩 Overview

PCN Inventory & Customer Management System is a full-stack web application designed for both customers and PCN staff to manage:

Vehicle inventory

Customer interactions

Pre-orders

Vehicle tracking

Inquiries

Document uploads

Appointments

Finance operations

Shipping processes

Reporting & analytics

This README documents both the backend (pcn-backend) and frontend (pcn-frontend), including project structure, setup, features, API design, and development workflow.

🚀 System Architecture

This project uses a 3-tier architecture + clean-architecture principles for scalable development.

Frontend (React + TypeScript + TailwindCSS)

Presentation layer

Customer portal + Admin dashboard

API communication using Axios

Reusable components

Clean folder structure

Backend (Node.js + Express + TypeScript)

REST API

Controllers → Services → Repositories

MongoDB via Mongoose

Authentication with JWT

Role-based authorization (Customer, Staff, Admin)

Database (MongoDB Atlas)

Collections for: Users, Vehicles, Orders, Pre-orders, Tracking, Appointments, Invoices, Notifications, etc.

🧱 Features
👤 Customer Portal

Register & login

Browse vehicle inventory

Filter/search vehicles

View vehicle details

Make inquiries

Request pre-orders

Track pre-ordered vehicles

View past activities

Book appointments

Upload required documents

Live notifications

🏢 Staff / Admin Portal

Manage vehicle inventory (add, update, delete)

Handle customer orders & pre-orders

Update vehicle status (On Freight → In Transit → Delivered)

Generate invoices

Manage LC Department operations

Finance department features

Shipping management

Tracking center

Analytics dashboard

Notification system

Document management

📂 Backend Folder Structure (pcn-backend)
pcn-backend/
├─ src/
│   ├─ config/          ← DB, environment, logger
│   ├─ routes/          ← API route definitions
│   ├─ controllers/     ← Request handlers
│   ├─ services/        ← Business logic
│   ├─ repositories/    ← Mongoose queries
│   ├─ models/          ← Mongoose schemas
│   ├─ middleware/      ← Auth, validation, error handlers
│   ├─ utils/           ← Helper functions
│   └─ app.ts           ← Express app
│
├─ .env.example
├─ tsconfig.json
├─ package.json
└─ README.md

📂 Frontend Folder Structure (pcn-frontend)
pcn-frontend/
├─ src/
│   ├─ api/
│   ├─ components/
│   ├─ pages/
│   │   ├─ public/       ← Login, Register, Home
│   │   ├─ customer/     ← Customer Portal pages
│   │   └─ admin/        ← Admin/Staff Portal pages
│   ├─ layouts/
│   ├─ context/
│   ├─ hooks/
│   ├─ services/
│   ├─ utils/
│   ├─ types/
│   ├─ assets/
│   ├─ router/
│   ├─ App.tsx
│   └─ index.tsx
│
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
├─ tsconfig.json
└─ README.md

🔐 Authentication
JWT-based auth

Customers login → receive token

Staff/Admin login → different role token

Middleware checks permissions:

customer

staff

admin

Roles determine access to different endpoints and UI sections.

🌐 API Endpoints Overview
Auth
Method	Endpoint	Description
POST	/api/auth/register	Customer register
POST	/api/auth/login	Login user
GET	/api/auth/me	Get logged-in user
Vehicles
Method	Endpoint	Description
GET	/api/vehicles	List all vehicles
GET	/api/vehicles/:id	Vehicle details
POST	/api/vehicles	Add vehicle (admin)
PATCH	/api/vehicles/:id	Update vehicle
DELETE	/api/vehicles/:id	Delete vehicle
Pre-Orders
Method	Endpoint	Description
POST	/api/preorders	Customer pre-order
GET	/api/preorders/customer/:id	Customer pre-orders
PATCH	/api/preorders/admin/update/:id	Admin update status
Tracking
Method	Endpoint	Description
GET	/api/tracking/:orderId	Track a vehicle
PATCH	/api/tracking/update/:id	Admin updates tracking stage
Invoices / Finance / Shipping / Analytics

Each module includes CRUD APIs following the same pattern:

Controller → Service → Repository

🧪 API Testing

Use Postman to test endpoints:

Import all endpoints

Test login → copy token → use in Authorization header

Test protected routes

Validate responses

⚙️ Tech Stack
Frontend

React (TypeScript)

TailwindCSS

Axios

React Router

Context API (or Zustand/Redux)

Backend

Node.js

Express

TypeScript

Mongoose

JWT authentication

Bcrypt password hashing

Database

MongoDB Atlas