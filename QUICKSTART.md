# Quick Start Guide - Project06 Authentication

## 🚀 Quick Commands

### Start the Application:
```bash
npm start
```

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Access the Application:
- Home: http://localhost:3000/
- Login: http://localhost:3000/login
- Signup: http://localhost:3000/signup
- Courses: http://localhost:3000/courses

## ✅ Pre-flight Checklist

Before starting, make sure:
- [ ] Node.js is installed (`node --version`)
- [ ] MongoDB is installed and running
  - Windows: `net start MongoDB`
  - macOS/Linux: `sudo systemctl start mongod`
  - OR use MongoDB Atlas (cloud)
- [ ] Dependencies are installed (`npm install`)
- [ ] `.env` file exists with correct values

## 🧪 Test the System

1. **Create an account:**
   - Go to http://localhost:3000/signup
   - Fill in your details
   - Click "Create Account"

2. **Login:**
   - Go to http://localhost:3000/login
   - Enter your credentials
   - Click "Sign In"

3. **Verify authentication:**
   - Open DevTools (F12)
   - Check Application > Local Storage
   - Look for `authToken` and `user`

## 🐛 Common Issues

**Port already in use:**
```bash
# Change PORT in .env file to 3001 or another port
```

**MongoDB connection failed:**
```bash
# Make sure MongoDB is running
# Or use MongoDB Atlas connection string in .env
```

**Dependencies not installed:**
```bash
npm install
```

## 📖 Full Documentation

For complete setup instructions, see [AUTH_SETUP.md](./AUTH_SETUP.md)

## 🎯 What's Implemented

- ✅ User Registration (Signup)
- ✅ User Login
- ✅ Password Hashing (bcrypt)
- ✅ JWT Authentication
- ✅ Form Validation
- ✅ Error Handling
- ✅ Success Messages
- ✅ Responsive Design
- ✅ Dark Theme UI

## 🔜 Future Enhancements

- [ ] Email Verification
- [ ] Password Reset
- [ ] User Profile Page
- [ ] Logout Functionality
- [ ] Remember Me Feature
- [ ] Social Login (Google, GitHub)
- [ ] Two-Factor Authentication

---

Need help? Check [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed instructions!
