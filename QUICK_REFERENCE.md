# 📇 Quick Reference Card - Project06 Authentication

## 🚀 Essential Commands

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development with auto-reload)
npm run dev

# Start MongoDB (Windows)
net start MongoDB

# Start MongoDB (Linux/Mac)
sudo systemctl start mongod
```

## 🌐 Important URLs

```
Home:        http://localhost:3000/
Login:       http://localhost:3000/login
Signup:      http://localhost:3000/signup
Courses:     http://localhost:3000/courses
Test Page:   http://localhost:3000/test-auth
```

## 📡 API Endpoints

```
POST   /api/auth/signup     - Register new user
POST   /api/auth/login      - Login user
GET    /api/auth/profile    - Get user profile (requires token)
```

## 📄 Request/Response Examples

### Signup
```javascript
// Request
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}

// Response
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

### Login
```javascript
// Request
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepass123"
}

// Response
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

### Get Profile
```javascript
// Request
GET /api/auth/profile
Headers: { "Authorization": "Bearer eyJhbGc..." }

// Response
{
  "success": true,
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

## 🔑 Environment Variables (.env)

```bash
MONGODB_URI=mongodb://localhost:27017/unileap-auth
JWT_SECRET=your_super_secret_key_here
PORT=3000
```

## 📁 Key Files

```
Frontend:
├── login.html          - Login page
├── signup.html         - Signup page
├── auth.js             - Frontend auth logic
└── test-auth.html      - API testing page

Backend:
├── server.js           - Express server
├── models/User.js      - User model
├── controllers/authController.js
├── routes/authRoutes.js
└── middleware/auth.js  - JWT verification

Config:
├── package.json        - Dependencies
├── .env                - Environment config
└── .gitignore          - Git ignore rules

Documentation:
├── AUTH_SETUP.md       - Setup guide
├── QUICKSTART.md       - Quick start
├── ARCHITECTURE.md     - System design
└── VERIFICATION_CHECKLIST.md
```

## 🔍 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check if MongoDB is running |
| Port 3000 in use | Change PORT in .env |
| Dependencies missing | Run `npm install` |
| Token invalid | Clear localStorage and login again |
| CORS error | Check server CORS config |

## 🧪 Testing Commands

```bash
# Test signup via curl
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Test login via curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Test profile (replace TOKEN)
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

## 🎨 Frontend Features

✅ Real-time form validation  
✅ Password strength indicator  
✅ Loading spinners  
✅ Success/error messages  
✅ Responsive design  
✅ Dark theme  
✅ Glass-morphism effects  

## 🔒 Security Features

✅ Password hashing (bcrypt)  
✅ JWT authentication  
✅ Token expiration (7 days)  
✅ Protected routes  
✅ Email validation  
✅ Input sanitization  
✅ CORS configuration  

## 💾 Database Structure

```javascript
User Schema:
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  createdAt: Date
}
```

## 🎯 Validation Rules

**Email:**
- Required
- Valid format (name@domain.com)
- Unique in database

**Password:**
- Required
- Minimum 6 characters
- Hashed before storage

**Name:**
- Required
- Minimum 2 characters

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

## 🔧 Development Tools

```javascript
// Check auth status in browser console
localStorage.getItem('authToken')
localStorage.getItem('user')

// Clear auth data
localStorage.removeItem('authToken')
localStorage.removeItem('user')

// Get current user
JSON.parse(localStorage.getItem('user'))
```

## 📚 Documentation Links

- **Setup:** `AUTH_SETUP.md`
- **Quick Start:** `QUICKSTART.md`
- **Architecture:** `ARCHITECTURE.md`
- **Contributing:** `CONTRIBUTING_AUTH.md`
- **Verification:** `VERIFICATION_CHECKLIST.md`
- **Summary:** `IMPLEMENTATION_SUMMARY.md`

## 🎓 Tech Stack Versions

```
Node.js:      v14+
Express:      v4.18.2
MongoDB:      v5+
Mongoose:     v8.0.0
JWT:          v9.0.2
bcryptjs:     v2.4.3
```

## ⚡ Quick Troubleshooting

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB status (Windows)
sc query MongoDB

# Check MongoDB status (Linux/Mac)
systemctl status mongod

# View npm dependencies
npm list --depth=0

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🎉 Success Indicators

✅ Server starts without errors  
✅ MongoDB connection successful  
✅ Login page loads correctly  
✅ Signup page loads correctly  
✅ API returns valid responses  
✅ Tokens are generated  
✅ Passwords are hashed  
✅ Validation works  

---

**Print this card for quick reference!** 📇

**Status:** ✅ System Operational  
**Version:** 1.0.0  
**Last Updated:** October 9, 2025
