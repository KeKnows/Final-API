
# Final-API
# Athlete Training API

## Overview
This REST API is designed to help athletes track workouts, training plans, and performance over time. It provides a centralized backend system for managing athletic data efficiently.

---

## Features
- User authentication (JWT)
- Role-based access (Athlete / Coach)
- Workout tracking
- Training plan management
- Performance record tracking
- Secure RESTful API design

---

## Tech Stack
- Node.js
- Express.js
- Sequelize ORM
- SQLite
- JWT Authentication
- bcrypt password hashing

---

## Setup Instructions

### 1. Install dependencies
npm install

### 2. Setup database
npm run setup

### 3. Seed database (optional)
npm run seed

### 4. Start server
npm start

---

## Authentication

### Register
POST /auth/register

### Login
POST /auth/login

Returns JWT token for protected routes.

---

## API Routes

### Workouts
- GET /workouts
- POST /workouts
- PUT /workouts/:id
- DELETE /workouts/:id

### Training Plans (Coach Only)
- GET /plans
- POST /plans
- PUT /plans/:id
- DELETE /plans/:id

### Performance Records
- GET /records
- POST /records
- PUT /records/:id
- DELETE /records/:id

---

## Authorization
- Athletes: manage workouts + performance records
- Coaches: manage training plans

---

## Author
Final Project – REST API for Athlete Training System

http://localhost:3000/ (Postman testing)
