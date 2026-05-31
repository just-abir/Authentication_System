# 🎵 Role-Based Authentication Music Streaming Backend

A professional Node.js backend API for a music streaming platform with **role-based authentication** and **authorization**. Users can register as either **Artists** or **Listeners** and perform role-specific actions.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration with role selection (Artist/Listener)
- Secure login with JWT tokens
- Password hashing with bcryptjs
- HTTP-only secure cookies
- Role-based access control (RBAC)

### 🎤 Artist Features

- Upload music files to cloud storage (ImageKit)
- Create albums and manage tracks
- Organize multiple songs in albums

### 👥 Listener Features

- Browse all available music tracks
- View all albums with details
- Get individual album information
- Search and explore artists

### 📁 Additional Features

- Proper error handling and validation
- RESTful API design
- MongoDB data persistence
- Cloud file storage integration

---

## 🛠️ Tech Stack

| Technology        | Purpose               |
| ----------------- | --------------------- |
| **Node.js**       | Runtime environment   |
| **Express.js**    | Web framework         |
| **MongoDB**       | NoSQL Database        |
| **Mongoose**      | MongoDB ODM           |
| **JWT**           | Authentication tokens |
| **bcryptjs**      | Password hashing      |
| **Multer**        | File upload handling  |
| **ImageKit**      | Cloud file storage    |
| **CORS**          | Cross-origin requests |
| **Cookie-Parser** | Cookie handling       |

---

## 📁 Project Structure

```
Role_Base_Authentication/
├── src/
│   ├── controllers/          # Business logic for routes
│   │   ├── user.controller.js       # User registration & login
│   │   └── music.controller.js      # Music & album management
│   ├── models/               # Database schemas
│   │   ├── user.model.js            # User schema
│   │   ├── music.model.js           # Music schema
│   │   └── album.model.js           # Album schema
│   ├── routes/               # API route definitions
│   │   ├── user.routes.js           # User endpoints
│   │   └── music.routes.js          # Music & album endpoints
│   ├── middlewares/          # Custom middleware
│   │   └── user.middlewares.js      # Role-based access control
│   ├── services/             # External service integration
│   │   └── storage.service.js       # ImageKit upload service
│   ├── Utils/                # Helper functions
│   │   ├── generateToken.js         # JWT token generation
│   │   └── sendToken.js             # Token response helper
│   ├── DB/                   # Database connection
│   │   └── Database.js              # MongoDB connection setup
│   └── app.js                # Express app configuration
├── server.js                 # Server entry point
├── package.json              # Project dependencies
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- ImageKit account

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Role_Base_Authentication.git
   cd Role_Base_Authentication
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your actual credentials

4. **Start the server**
   ```bash
   npm run dev    # Development mode with nodemon
   npm start      # Production mode
   ```

The server will run on `http://localhost:3000`

---

## 🔑 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Server Port
PORT=3000

# JWT Secret (use a strong random string)
JWT_SECRET=your_secure_jwt_secret_key_here

# ImageKit API Key (for file uploads)
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

# Environment (development/production)
NODE_ENV=development
```

### How to get credentials:

- **MongoDB:** Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **ImageKit:** Create account at [ImageKit.io](https://imagekit.io)
- **JWT_SECRET:** Generate a random string (use `crypto` module or online generator)

---

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api
```

### 👤 User Endpoints

#### Register User

```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "listener"  // or "artist"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "listener"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login User

```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    /* user object */
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get All Users

```http
GET /users
```

#### Get User by ID

```http
GET /users/:id
```

---

### 🎵 Music Endpoints

#### Create Music (Artist Only)

```http
POST /musics/create
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- music: <audio_file>
- title: "Song Title"
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "music created",
  "music": {
    "_id": "507f1f77bcf86cd799439011",
    "url": "https://imagekit.io/...",
    "title": "Song Title",
    "artist": "507f1f77bcf86cd799439010"
  }
}
```

#### Create Album (Artist Only)

```http
POST /musics/album
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Album Name",
  "musics": ["musicId1", "musicId2", "musicId3"]
}
```

#### Get All Music (Listener Only)

```http
GET /musics/all
Authorization: Bearer <token>
```

#### Get All Albums (Listener Only)

```http
GET /musics/all/album
Authorization: Bearer <token>
```

#### Get Album by ID (Listener Only)

```http
GET /musics/all/album/:id
Authorization: Bearer <token>
```

---

## 🔐 Authentication

### How Authentication Works

1. **Registration:** User creates account with email, password, and role
2. **Password Hashing:** Passwords are hashed using bcryptjs (10 salt rounds)
3. **Login:** User provides email and password
4. **Token Generation:** JWT token created with userId and role, expires in 7 days
5. **Cookie Storage:** Token stored in HTTP-only secure cookie
6. **Protected Routes:** Middleware checks token and role for each request

### JWT Token Payload

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "role": "artist",
  "iat": 1622505600,
  "exp": 1623110400
}
```

### Role-Based Access

- **Artist:** Can create/upload music and create albums
- **Listener:** Can view all music and albums

---

## 💡 Usage Examples

### Using cURL

**Register as Artist:**

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "securepass123",
    "role": "artist"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

**Upload Music (with cookie from login):**

```bash
curl -X POST http://localhost:3000/api/musics/create \
  -H "Cookie: token=<your_token_here>" \
  -F "title=My Song" \
  -F "music=@/path/to/audio.mp3"
```

### Using Postman

1. **Set base URL:** `http://localhost:3000/api`
2. **Register:** POST to `/users/register` with JSON body
3. **Login:** POST to `/users/login`, copy the token
4. **Subsequent requests:** Add `Cookie: token=<token>` header or use Postman's cookie jar

---

## 🐛 Common Issues & Solutions

| Issue                     | Solution                                              |
| ------------------------- | ----------------------------------------------------- |
| "MONGO_URI not defined"   | Check `.env` file and restart server                  |
| "Invalid token"           | Re-login to get a fresh token                         |
| "Forbidden: unauthorized" | Ensure correct role (artist/listener) for endpoint    |
| "Cannot find module"      | Run `npm install`                                     |
| "Port already in use"     | Change PORT in `.env` or kill process using port 3000 |

---

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Created as a professional music streaming backend with role-based authentication.

---

## 📧 Contact & Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

## 🎯 Future Enhancements

- [ ] Add search functionality for music and albums
- [ ] Implement playlist creation for listeners
- [ ] Add rating/review system
- [ ] Implement music streaming playback
- [ ] Add pagination for large datasets
- [ ] Implement music recommendations
- [ ] Add social features (follow artists)
- [ ] Implement music download functionality

---

**Happy Coding! 🚀**
