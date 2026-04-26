🏋️ Athlete Training & Performance API

A full-stack REST API built with Node.js and Express that allows athletes and coaches to manage workouts, training plans, and performance data. This project demonstrates secure backend architecture, authentication, role-based authorization, and production deployment.

🚀 Live API

Production URL (Render):
https://your-api-name.onrender.com

📬 Postman Documentation

Public Collection:
https://your-postman-link

📌 Project Overview

This API allows:

Athletes to track workouts and performance records
Coaches to create and manage training plans
Secure user authentication and role-based access
Full CRUD operations across multiple resources

This project was built as a capstone backend system to demonstrate real-world API development practices.

🧱 Tech Stack
Node.js
Express.js
Sequelize ORM
SQLite (development) / PostgreSQL (production)
JSON Web Tokens (JWT)
bcrypt (password hashing)
express-validator (input validation)
Jest & Supertest (testing)
🔐 Authentication & Authorization
Authentication
Users register and log in
Passwords are hashed using bcrypt
JWT tokens are issued on login
Protected routes require a valid token
Authorization (RBAC)
Role	Permissions
Athlete	Manage own workouts and performance records
Coach	Create and manage training plans
⚙️ Installation & Setup
Clone repository:
git clone https://github.com/YOUR_USERNAME/final-api.git
cd final-api
Install dependencies:
npm install
Create .env file:
PORT=3000
JWT_SECRET=your_secret_key
Setup database:
npm run setup
npm run seed
Start server:
npm start
🌐 Base URLs

Local:

http://localhost:3000

Production:

https://your-api-name.onrender.com
🔑 Authentication Usage

Include JWT token in headers:

Authorization: Bearer YOUR_TOKEN
📊 API ENDPOINTS
🔐 Auth Routes
Register

POST /auth/register

Request:

{
  "username": "user1",
  "email": "user@email.com",
  "password": "123456"
}
Login

POST /auth/login

Request:

{
  "username": "user1",
  "password": "123456"
}

Response:

{
  "token": "jwt_token_here"
}
🏋️ Workouts
Create Workout

POST /workouts

{
  "type": "Running",
  "duration": 30
}
Get All Workouts

GET /workouts

Get One Workout

GET /workouts/

Update Workout

PUT /workouts/

Delete Workout

DELETE /workouts/

📈 Performance Records
Create Record

POST /performance

{
  "metric": "Sprint Time",
  "value": "10.5s"
}
Get Records

GET /performance

Update Record

PUT /performance/

Delete Record

DELETE /performance/

📝 Training Plans (Coach Only)
Create Plan

POST /training-plans

{
  "title": "Offseason Plan",
  "description": "Strength + conditioning"
}
Get Plans

GET /training-plans

Update Plan

PUT /training-plans/

Delete Plan

DELETE /training-plans/

❗ Error Handling
Standard Error
{
  "error": "Something went wrong"
}
Validation Error
{
  "errors": [
    {
      "msg": "Field is required"
    }
  ]
}
🧪 Testing

Run tests:

npm test
Test Coverage Includes:
User registration and login
JWT authentication
Protected routes
Role-based authorization
Error handling
☁️ Deployment (Render)
Push project to GitHub
Go to Render
Create new Web Service
Connect repository
Add environment variables:
JWT_SECRET
DATABASE_URL (if using PostgreSQL)
Deploy
📁 Project Structure
final-api/
├── models/
├── routes/
├── middleware/
├── database/
├── tests/
├── index.js
├── package.json
🎯 Future Improvements
Pagination and filtering
Refresh tokens
Email verification
Advanced analytics
👨‍💻 Author

Keonne Gladden
