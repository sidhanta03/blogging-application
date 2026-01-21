# Blogging Application

A full-stack MERN blogging application where users can create, read, update, and delete blogs.

## Features

- **Authentication**: JWT-based auth with secure password hashing.
- **Blog Management**: CRUD operations for blogs.
- **Filtering**: Filter blogs by category and author.
- **Responsive UI**: Built with React and Tailwind CSS for a premium look on all devices.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, React Router, Axios.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running locally

### Installation

1. **Clone the repository** (if applicable)

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file in backend/ based on .env.example or use the provided one
   # Ensure MongoDB is running
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the App**
   Open http://localhost:5173 (or the port Vite displays) in your browser.

## API Endpoints

- `POST /auth/signup` - Register
- `POST /auth/login` - Login
- `GET /blogs` - Get all blogs (supports ?category= & ?author=)
- `POST /blogs` - Create blog
- `PUT /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog

## Folder Structure

- `backend/`: Node.js/Express API
- `frontend/`: React + Vite Application
