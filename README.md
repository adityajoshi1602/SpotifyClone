# Spotify Backend Clone

A backend system that replicates core Spotify-like functionality with role-based access for **Artists** and **Listeners**. Built using Node.js, Express, MongoDB, JWT, and secure authentication practices.

---

## Overview

This project implements a music platform backend where:

- Artists can upload songs and create albums  
- Users can browse and listen to songs  
- Authentication is handled using JWT and HTTP-only cookies  
- Input validation and error handling are enforced  

The system follows a modular and scalable backend architecture.

---

## Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT (JSON Web Tokens)  
- bcrypt  
- express-validator  
- dotenv  

---

## Features

### Authentication
- User registration and login  
- Password hashing using bcrypt  
- JWT-based authentication  
- Token stored in HTTP-only cookies  

### Role-Based Access
- Artist:
  - Upload songs  
  - Create albums using uploaded songs  
  - Manage uploaded content  
- Listener:
  - Browse songs  
  - Stream/listen to songs  

### Song Management
- Upload songs (artist only)  
- Store metadata (title, artist, etc.)  
- Retrieve and list songs  

### Album Management
- Create albums (artist only)  
- Add uploaded songs to albums  
- Fetch albums and their songs  

### Validation & Security
- Input validation using express-validator  
- Protected routes using middleware  
- Error handling system  

---

## Project Structure


## Project Structure

```
project-root/
│
├── controllers/ # Business logic
├── models/ # Mongoose schemas
├── routes/ # API routes
├── middlewares/ # Auth & validation middleware
├── services/ # Optional service layer
├── config/ # Database configuration
├── utils/ # Helper functions
├── uploads/ # Uploaded songs (if stored locally)
│
├── app.js # Express app setup
├── server.js # Entry point
├── .env # Environment variables
└── package.json
```

---

## Installation

1. Clone the repository
```
git clone [https://github.com/your-username/spotify-backend-clone.git](https://github.com/adityajoshi1602/SpotifyClone)
```

2. Navigate to the project directory
```
cd spotify-backend-clone
```

3. Install dependencies
```
npm install
```

4. Create a `.env` file and add:
```
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Start the server
```
npm run dev
```

---

## API Endpoints (Sample)

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/login`

### Songs
- POST `/api/songs/upload` (Artist only)
- GET `/api/songs`
- GET `/api/songs/:id`

### Albums
- POST `/api/albums` (Artist only)
- GET `/api/albums`
- GET `/api/albums/:id`

---

## Security Notes

- Passwords are hashed using bcrypt  
- JWT tokens are stored in HTTP-only cookies  
- Routes are protected via middleware  
- Input validation prevents malformed data  

---

## Future Improvements

- Add streaming optimization (chunk-based streaming)  
- Integrate cloud storage (AWS S3 / Cloudinary)  
- Add playlists and likes system  
- Implement search and recommendation engine  

---

## Author
Built as a backend system project using Node.js and MongoDB.
