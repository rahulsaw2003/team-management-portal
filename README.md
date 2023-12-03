# Full-Stack Web Application - User Management

This is a full-stack web application that allows users to view, search, filter, create teams, and manage users. The application is built with React.js for the frontend and Node.js, Express.js, and MongoDB for the backend.

## Table of Contents

- Features
- Tech Stack
- Getting Started
  - Prerequisites
  - Installation
- Frontend Setup
- Backend Setup
- API Endpoints
- Deployment

## Features

- Display users in a card format with pagination.
- Search users by name in real-time.
- Implement filters for Domain, Gender, and Availability.
- Create teams by selecting unique users.
- Show team details.
- Responsive design for different screen sizes.

## Tech Stack

### Frontend

- React.js
- Redux for state management
- Styling: [Tailwind CSS](https://tailwindcss.com/)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose for object modeling

## Getting Started

To get a copy of the project up and running on your local machine, follow these steps.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git

2. Install dependencies:
   ```bash
  cd your-repository
  cd client && npm install
  cd ../server && npm install

### Frontend Setup
- Navigate to the client directory:
  ```bash
  cd client
- Run the development server:
  ```bash
  npm start
- Open your browser and visit http://localhost:3000 to view the application.

### Backend Setup
- Navigate to the server directory:
  ```bash
  cd server
- Create a .env file with the following content:
  PORT=5000
  DB_NAME=your-db-name
  MONGODB_URI=your-mongodb-uri
- Run the server:
  ```bash
  npm start

### API Endpoints
- GET /api/users: Retrieve all users with pagination support.

- GET /api/users/:id: Retrieve a specific user by ID.

- POST /api/users: Create a new user.

- PUT /api/users/:id: Update an existing user.

- DELETE /api/users/:id: Delete a user.

- POST /api/team: Create a new team by selecting users from the list with unique domains and availability.

- GET /api/team/:id: Retrieve the details of a specific team by ID.

### Deployment
- Frontend: https://team-management-portal.vercel.app/
  
- Backend: https://user-management-server-kuxo.onrender.com/

## Author
- Name - Rahul Kumar Saw
- Email ID - 2021chb1052@iitrpr.ac.in

#### All Rights Reserved 2023



