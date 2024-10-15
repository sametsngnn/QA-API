# Question-Answer Forum Application

This project is a question-answer forum application where users can ask questions and other users can answer them. Users can also vote on questions and answers, and edit or delete their own posts. API is from the expressjs section of the [Modern Web Geliştirme Kursu](https://www.udemy.com/course/komple-sifirdan-web-gelistirme-kursu/) course. Thanks to [Mustafa Murat Coşkun](https://git.hub.com/mustafamuratcoskun).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Technologies](#technologies)
- [Images](#images)

## Features

- User registration and login (JWT token-based authentication)
- Users can ask questions and answer other users' questions
- Voting system for questions and answers (like/dislike)
- Questions and answers can be edited or deleted
- Sort questions by "Most Liked" or "Most Answered"
- Pagination with limit selection
- User profile photo upload functionality

## Installation

### Requirements

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/sametsngnn/QA-API.git
```
2. Navigate to the API directory:

```bash
cd QA-API/API
```
3. Install the necessary dependencies:

```bash
npm install
```

4. Start MongoDB and create a api/config/env/config.env file:

```
# Server Variables
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI = mongodb+srv://...

# Json Web Token
JWT_SECRET_KEY = simpleSecretKey
JWT_EXPIRE=10m

# Cookie
JWT_COOKIE=10

# Reset Password
RESET_PASSWORD_EXPIRE=3600000

#NodeMailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=example@gmail.com
SMTP_PASS=examplePass
```
5. Using Dummy Generator

- Import Dummy Data to Database from JSON Files in API/dummy Directory
```bash
npm import
```

- Deleting All Files in Database
```bash
npm delete
```
6. Start the server:

```bash
npm run dev
```

7. To start the frontend, navigate to the /client directory and follow these steps:

```bash
cd client
npm install
npm start
```

## Usage
- Register and Login: Users can register and log into the platform.
- Ask Questions: Logged-in users can create new questions.
- Answer Questions: Users can provide answers to any question.
- Vote: Users can vote on questions and answers.
- Profile Management: Users can upload a profile picture and update their information.


## API Documentation
### Users
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/users/:id - Get a specific user
- PUT /api/users/:id - Update user information
### Questions
- GET /api/questions - Retrieve all questions
- POST /api/questions - Create a new question
- GET /api/questions/:id - Get a specific question
- PUT /api/questions/:id - Update a question
- DELETE /api/questions/:id - Delete a question
### Answers
- POST /api/questions/:id/answers - Add an answer to a question
- PUT /api/questions/:id/answers/:answerId - Update an answer
- DELETE /api/questions/:id/answers/:answerId - Delete an answer
### Admin
- DELETE /api/admin/user/:id - Delete user
- GET /api/admin/block/:id -Block user


## Technologies

### Backend:
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)

### Frontend:
- Angular
- Bootstrap

### Others:
Multer (for file uploads)

# Images

![img](https://github.com/user-attachments/assets/a61e6b59-a8fa-4c5c-9e1b-ceb5a1bdaad4)
![img2](https://github.com/user-attachments/assets/edc2b1c6-909c-4812-b656-dd10e836a7c8)

