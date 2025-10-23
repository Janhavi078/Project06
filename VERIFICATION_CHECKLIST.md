# ✅ Installation & Verification Checklist

Use this checklist to verify that the authentication system is properly installed and working.

## 📦 Pre-Installation Checklist

- [ ] Node.js installed (v14+)
  ```bash
  node --version
  ```
- [ ] npm installed
  ```bash
  npm --version
  ```
- [ ] MongoDB installed OR MongoDB Atlas account created
  ```bash
  mongod --version
  ```
- [ ] Git installed (optional)
  ```bash
  git --version
  ```

## 🔧 Installation Checklist

- [ ] Dependencies installed
  ```bash
  npm install
  ```
  - Should install 135+ packages
  - Should show "0 vulnerabilities"

- [ ] .env file created
  - [ ] Copy from .env.example
  - [ ] Update MONGODB_URI
  - [ ] Update JWT_SECRET
  - [ ] Update PORT (optional)

- [ ] MongoDB is running
  - [ ] Local: `net start MongoDB` (Windows) or `sudo systemctl start mongod` (Linux/Mac)
  - [ ] Cloud: MongoDB Atlas connection string configured

## 🚀 Server Start Checklist

- [ ] Server starts without errors
  ```bash
  npm start
  ```

- [ ] Console shows success messages:
  - [ ] "✅ MongoDB connected successfully"
  - [ ] "🚀 Server is running on http://localhost:3000"
  - [ ] No error messages in red

- [ ] No port conflicts (PORT 3000 is free)

## 🌐 Frontend Pages Checklist

### Home Page (/)
- [ ] Opens at http://localhost:3000/
- [ ] Navigation bar visible
- [ ] "Login" button visible in header
- [ ] "Sign Up" button visible in header
- [ ] No 404 errors
- [ ] No console errors (F12)

### Login Page (/login)
- [ ] Opens at http://localhost:3000/login
- [ ] Form displays correctly
- [ ] Email field present
- [ ] Password field present
- [ ] "Sign In" button present
- [ ] "Sign up" link present
- [ ] Page is responsive (test resize)
- [ ] Dark theme applies correctly

### Signup Page (/signup)
- [ ] Opens at http://localhost:3000/signup
- [ ] Form displays correctly
- [ ] Name field present
- [ ] Email field present
- [ ] Password field present
- [ ] Confirm Password field present
- [ ] Terms checkbox present
- [ ] "Create Account" button present
- [ ] "Sign in" link present
- [ ] Password strength indicator visible
- [ ] Page is responsive

### Courses Page (/courses)
- [ ] Opens at http://localhost:3000/courses
- [ ] Navigation includes Login and Sign Up links

### Test Page (/test-auth)
- [ ] Opens at http://localhost:3000/test-auth
- [ ] Authentication status section visible
- [ ] API test buttons visible
- [ ] Results area present

## 🔐 Authentication Functionality Checklist

### Signup Functionality
- [ ] Can create new account with valid data
  - Name: "Test User"
  - Email: "test@example.com"
  - Password: "password123"
  - Confirm Password: "password123"
  - Terms: Checked

- [ ] Form validation works:
  - [ ] Empty name shows error
  - [ ] Invalid email shows error
  - [ ] Short password shows error
  - [ ] Password mismatch shows error
  - [ ] Unchecked terms shows error

- [ ] Password strength indicator:
  - [ ] Shows "Weak" for simple passwords
  - [ ] Shows "Medium" for moderate passwords
  - [ ] Shows "Strong" for complex passwords

- [ ] Success flow:
  - [ ] Success message appears
  - [ ] Redirects to home page after 1.5s
  - [ ] Token stored in localStorage
  - [ ] User data stored in localStorage

- [ ] Error handling:
  - [ ] Duplicate email shows error
  - [ ] Server errors display properly

### Login Functionality
- [ ] Can login with existing credentials
  - Email: Previously registered email
  - Password: Correct password

- [ ] Form validation works:
  - [ ] Empty email shows error
  - [ ] Invalid email format shows error
  - [ ] Empty password shows error

- [ ] Success flow:
  - [ ] Success message appears
  - [ ] Redirects to home page
  - [ ] Token stored in localStorage
  - [ ] User data stored in localStorage

- [ ] Error handling:
  - [ ] Wrong password shows error
  - [ ] Non-existent email shows error
  - [ ] Server errors display properly

### Token Management
- [ ] Token is generated on signup
- [ ] Token is generated on login
- [ ] Token is stored in localStorage
- [ ] Token format is valid JWT
- [ ] User data is stored with token

Check in DevTools:
```javascript
// Open DevTools (F12) > Console
localStorage.getItem('authToken')
localStorage.getItem('user')
```

## 🧪 API Testing Checklist

### Test Page Method
- [ ] Visit http://localhost:3000/test-auth
- [ ] Click "Test Signup API"
  - [ ] Creates new user
  - [ ] Returns success response
  - [ ] Shows token in response
- [ ] Click "Test Login API"
  - [ ] Authenticates user
  - [ ] Returns token
- [ ] Click "Test Profile API"
  - [ ] Requires token
  - [ ] Returns user data

### Manual API Testing
Using curl or Postman:

- [ ] POST /api/auth/signup works
  ```bash
  curl -X POST http://localhost:3000/api/auth/signup \
    -H "Content-Type: application/json" \
    -d '{"name":"Curl Test","email":"curl@test.com","password":"test123"}'
  ```
  - [ ] Returns 201 status
  - [ ] Returns token
  - [ ] Returns user data

- [ ] POST /api/auth/login works
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"curl@test.com","password":"test123"}'
  ```
  - [ ] Returns 200 status
  - [ ] Returns token
  - [ ] Returns user data

- [ ] GET /api/auth/profile works (with token)
  ```bash
  curl http://localhost:3000/api/auth/profile \
    -H "Authorization: Bearer YOUR_TOKEN_HERE"
  ```
  - [ ] Returns 200 status
  - [ ] Returns user data

## 💾 Database Checklist

### MongoDB Connection
- [ ] Database connection successful
- [ ] Database created: `unileap-auth`
- [ ] Collection created: `users`

### Data Storage
- [ ] Users are saved to database
- [ ] Passwords are hashed (not plain text)
- [ ] Email is unique (duplicate check works)
- [ ] Timestamps are recorded

Check MongoDB:
```bash
# Connect to MongoDB
mongo

# Use database
use unileap-auth

# Show users
db.users.find().pretty()
```

You should see:
```javascript
{
  "_id": ObjectId("..."),
  "name": "Test User",
  "email": "test@example.com",
  "password": "$2a$10$..." // Hashed password
  "createdAt": ISODate("...")
}
```

## 🎨 UI/UX Checklist

### Visual Design
- [ ] Dark theme applied consistently
- [ ] Brand colors (#6366F1) used correctly
- [ ] Glass-morphism effects visible
- [ ] Animations smooth
- [ ] Loading spinners work
- [ ] Form fields styled correctly

### Responsiveness
- [ ] Works on mobile (< 768px)
  - [ ] Forms are usable
  - [ ] Buttons are tappable
  - [ ] Text is readable
- [ ] Works on tablet (768px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Navigation adapts to screen size

### User Feedback
- [ ] Success messages display in green
- [ ] Error messages display in red
- [ ] Field-level errors show
- [ ] Loading states are clear
- [ ] Button states change on hover

## 🔒 Security Checklist

- [ ] Passwords are hashed with bcrypt
- [ ] JWT tokens are properly signed
- [ ] Tokens expire (7 days)
- [ ] Protected routes require authentication
- [ ] Email addresses are validated
- [ ] SQL injection prevention (Mongoose)
- [ ] XSS prevention (no eval, proper escaping)
- [ ] CORS is configured
- [ ] Environment variables secure (.env not in git)

## 📚 Documentation Checklist

- [ ] README.md updated
- [ ] AUTH_SETUP.md present
- [ ] QUICKSTART.md present
- [ ] CONTRIBUTING_AUTH.md present
- [ ] IMPLEMENTATION_SUMMARY.md present
- [ ] ARCHITECTURE.md present
- [ ] .env.example present

## 🐛 Common Issues Resolution

### Issue: MongoDB connection failed
- [ ] Check if MongoDB is running
- [ ] Check MONGODB_URI in .env
- [ ] Check network connectivity (for Atlas)
- [ ] Check IP whitelist (for Atlas)

### Issue: Port already in use
- [ ] Change PORT in .env
- [ ] Kill process using port 3000

### Issue: Dependencies not installed
- [ ] Run `npm install`
- [ ] Delete node_modules and package-lock.json, then reinstall

### Issue: Token validation errors
- [ ] Check JWT_SECRET matches
- [ ] Clear localStorage
- [ ] Generate new token

### Issue: CORS errors
- [ ] Check server CORS configuration
- [ ] Check request origin

## ✅ Final Verification

### Complete System Test:
1. [ ] Start fresh (clear localStorage)
2. [ ] Create new account via /signup
3. [ ] Verify redirect to home
4. [ ] Check localStorage has token and user
5. [ ] Navigate to /login
6. [ ] Login with created credentials
7. [ ] Verify redirect to home
8. [ ] Check token is updated
9. [ ] Test /test-auth page
10. [ ] Test all API endpoints
11. [ ] Check MongoDB for user data
12. [ ] Verify password is hashed
13. [ ] Test on mobile device
14. [ ] Test all navigation links

### Performance Test:
- [ ] Page load time < 3 seconds
- [ ] API response time < 1 second
- [ ] No memory leaks
- [ ] No excessive console logs

### Browser Compatibility:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

## 🎉 Completion Status

If all items are checked:
- ✅ Installation is complete
- ✅ System is working correctly
- ✅ Ready for development/production

## 📊 Score Your Installation

Count your checkmarks:
- **90-100%** ✅ Perfect! System is fully operational
- **75-89%** 🟢 Good! Minor issues to fix
- **60-74%** 🟡 Fair. Some features need attention
- **< 60%** 🔴 Issues detected. Review setup guide

---

**Need Help?**
- Check [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed instructions
- Check [QUICKSTART.md](./QUICKSTART.md) for quick reference
- Use [test-auth.html](http://localhost:3000/test-auth) for debugging

**Date:** _______________  
**Verified by:** _______________  
**Status:** ☐ Pass  ☐ Fail  
**Notes:** _______________
