# Athlete Training REST API

## Overview

This project is a RESTful API designed to help athletes and coaches track workouts, training plans, and performance data. The system supports secure authentication, role-based access control, and user-specific data management.

This API was developed as a final project and enhanced based on code review feedback to meet MVP requirements and improve security, reliability, and structure.

---

## Live API

Base URL:
https://your-api-name.onrender.com

Health Check:
GET /

---

## Features

* JWT-based authentication
* Role-based access control (Athlete / Coach)
* Secure user registration (prevents role escalation)
* User-scoped data (no cross-user access)
* Ownership enforcement for coaches
* CRUD operations for:

  * Workouts
  * Training Plans
  * Performance Records
* Middleware-based request handling
* Basic unit testing with Jest and Supertest

---

## Tech Stack

* Node.js
* Express.js
* Sequelize ORM
* SQLite (or PostgreSQL if upgraded)
* JSON Web Tokens (JWT)
* bcrypt
* Jest & Supertest

---

## Authentication

### Register

POST /auth/register

Request Body:
{
"username": "testuser",
"password": "password123"
}

Note:
All users are registered as "athlete" by default to prevent privilege escalation.

---

### Login

POST /auth/login

Response:
{
"token": "your_jwt_token"
}

---

### Using the Token

Include this header in all protected routes:

Authorization: Bearer YOUR_TOKEN

---

## API Endpoints

### Workouts

* GET /workouts
  Returns only workouts belonging to the authenticated user

* POST /workouts
  Creates a workout assigned to the logged-in user

* DELETE /workouts/:id
  Only the owner can delete

---

### Training Plans (Coach Only)

* POST /plans
  Create a training plan

* PUT /plans/:id
  Only the coach who created the plan can update it

* DELETE /plans/:id
  Only the owner can delete

---

### Performance Records

* GET /records
  Returns only user-specific records

* POST /records
  Creates a performance record tied to the user

---

## Security Improvements (Post Code Review)

The following critical issues were identified and resolved:

* Fixed middleware order so JSON request bodies are properly parsed
* Prevented privilege escalation by removing client-controlled role assignment
* Enforced ownership checks on training plans
* Restricted workout and performance data to authenticated users only
* Prevented userId spoofing in protected routes

---

## Running Locally

Install dependencies:
npm install

Start server:
node index.js

---

## Testing

Run tests:
npm test

Includes:

* Authentication endpoint test
* Basic request validation

---

## Postman Documentation

https://documenter.getpostman.com/view/your-link

This collection demonstrates:

* Authentication flow
* Protected routes with JWT
* CRUD operations for all resources

---

## Deployment

This API is deployed using Render.

Live URL:
https://Final-API.onrender.com

---

## Author

Keonne Gladden

Final Project – Athlete Training REST API
