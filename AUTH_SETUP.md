# 🔐 Authentication System Setup Guide

This guide will help you set up and run the Login and Signup system for Project06 (UniLeap).

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
  - Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)
- **Git** (optional, for version control)

## 🚀 Quick Start

### Step 1: Install Dependencies

Open a terminal in the Project06 directory and run:

```bash
npm install
```

This will install all required packages:
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `dotenv` - Environment variable management
- `cors` - Cross-origin resource sharing

### Step 2: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` file and update the values:
   ```
   MONGODB_URI=mongodb://localhost:27017/unileap-auth
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=3000
   ```

   **Important:** 
   - If using MongoDB Atlas, replace `MONGODB_URI` with your connection string
   - Change `JWT_SECRET` to a secure random string for production

### Step 3: Start MongoDB

If using local MongoDB:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

If using MongoDB Atlas, skip this step (your database is already running in the cloud).

### Step 4: Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on http://localhost:3000
📝 Login: http://localhost:3000/login
📝 Signup: http://localhost:3000/signup
```

### Step 5: Access the Application

Open your browser and navigate to:
- **Home:** http://localhost:3000/
- **Login:** http://localhost:3000/login
- **Signup:** http://localhost:3000/signup

## 📁 Project Structure

```
Project06/
├── server.js              # Express server and routes
├── package.json           # Project dependencies
├── .env                   # Environment variables (not in git)
├── .env.example          # Example environment file
├── models/
│   └── User.js           # User model with password hashing
├── controllers/
│   └── authController.js # Authentication logic
├── routes/
│   └── authRoutes.js     # API routes for auth
├── middleware/
│   └── auth.js           # JWT verification middleware
├── auth.js               # Frontend authentication logic
├── login.html            # Login page
├── signup.html           # Signup page
└── index.html            # Home page
```

## 🔌 API Endpoints

### POST /api/auth/signup
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### POST /api/auth/login
Login an existing user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### GET /api/auth/profile
Get current user profile (requires authentication)

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## ✨ Features Implemented

### Frontend Features:
- ✅ Responsive Login and Signup pages
- ✅ Real-time form validation
- ✅ Email format validation
- ✅ Password strength indicator
- ✅ Password confirmation matching
- ✅ Loading states with spinners
- ✅ Success/error message displays
- ✅ Dark theme matching the website design
- ✅ Mobile-responsive design
- ✅ JWT token storage in localStorage
- ✅ Auto-redirect after successful login/signup

### Backend Features:
- ✅ User registration with validation
- ✅ Secure password hashing with bcrypt
- ✅ JWT token generation and validation
- ✅ Protected routes with authentication middleware
- ✅ MongoDB database integration
- ✅ Email uniqueness validation
- ✅ Error handling and validation
- ✅ CORS enabled for cross-origin requests

## 🧪 Testing the System

### Manual Testing:

1. **Sign Up:**
   - Go to http://localhost:3000/signup
   - Fill in: Name, Email, Password, Confirm Password
   - Check "I agree to terms"
   - Click "Create Account"
   - Should redirect to home page

2. **Login:**
   - Go to http://localhost:3000/login
   - Enter your registered email and password
   - Click "Sign In"
   - Should redirect to home page

3. **Check Authentication:**
   - Open browser Developer Tools (F12)
   - Go to Application > Local Storage
   - Should see `authToken` and `user` stored

### Using API Testing Tools:

You can test the API using Postman or curl:

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Profile (replace YOUR_TOKEN with actual token)
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔧 Troubleshooting

### MongoDB Connection Error
**Problem:** `MongoDB connection error`

**Solutions:**
- Make sure MongoDB is running
- Check if the connection string in `.env` is correct
- For MongoDB Atlas, check if your IP is whitelisted
- Verify username/password for Atlas connection

### Port Already in Use
**Problem:** `Port 3000 is already in use`

**Solution:**
- Change the PORT in `.env` file to another port (e.g., 3001)
- Or kill the process using port 3000

### Token Validation Error
**Problem:** `Invalid token` or `Access denied`

**Solution:**
- Make sure the JWT_SECRET in `.env` matches what was used to create tokens
- Clear localStorage and login again
- Check if token is expired (tokens are valid for 7 days)

### User Already Exists
**Problem:** Can't create account with the same email

**Solution:**
- This is expected behavior - each email can only be registered once
- Use a different email or login with existing credentials

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It contains sensitive information
2. **Use strong JWT_SECRET** - Generate a random string for production
3. **Use HTTPS in production** - Encrypt data in transit
4. **Implement rate limiting** - Prevent brute force attacks
5. **Add email verification** - Confirm user emails before activation
6. **Implement password reset** - Allow users to recover accounts
7. **Use secure cookies** - Consider httpOnly cookies for tokens
8. **Add CSRF protection** - Prevent cross-site request forgery

## 🚀 Deployment

### Deploying to Production:

1. **Update Environment Variables:**
   - Use production MongoDB connection string
   - Generate a strong JWT_SECRET
   - Set NODE_ENV=production

2. **Recommended Platforms:**
   - **Heroku** - Easy deployment with MongoDB Atlas
   - **Vercel** - Great for Node.js apps
   - **Railway** - Simple deployment with built-in database
   - **DigitalOcean** - More control with VPS

3. **Database Options:**
   - **MongoDB Atlas** - Free tier available
   - **AWS DocumentDB** - MongoDB-compatible
   - **Azure Cosmos DB** - Enterprise option

## 📚 Next Steps

To enhance the authentication system:

1. **Email Verification:**
   - Send verification email on signup
   - Verify email before allowing login

2. **Password Reset:**
   - Implement "Forgot Password" functionality
   - Send reset link via email

3. **Social Authentication:**
   - Add Google OAuth integration
   - Add GitHub OAuth integration

4. **Two-Factor Authentication:**
   - Add SMS or email-based 2FA
   - Use authenticator apps

5. **User Profile Management:**
   - Allow users to update profile
   - Add profile picture upload
   - Change password functionality

6. **Session Management:**
   - Add logout functionality
   - Implement token refresh
   - Track active sessions

## 💡 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/) - Learn about JWT tokens
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)
- [MongoDB University](https://university.mongodb.com/) - Free courses

## 🤝 Contributing

If you want to improve the authentication system:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## ❓ Support

If you encounter any issues:

1. Check this documentation thoroughly
2. Look for similar issues in the GitHub issues section
3. Create a new issue with detailed information
4. Contact the project maintainers

---

**Happy Coding! 🚀**
