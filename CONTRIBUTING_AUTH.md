# 🎉 Contributing to Project06 Authentication System

Thank you for your interest in contributing to the Project06 Authentication System! This guide will help you get started.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

Please be respectful and considerate of others. We aim to create a welcoming environment for all contributors.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Project06.git
   cd Project06
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/Project06.git
   ```
4. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   copy .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Start MongoDB** (if using local installation)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Test the application**:
   - Visit http://localhost:3000/test-auth to run tests

## 🤝 How to Contribute

### Areas for Contribution

#### 1. **Bug Fixes** 🐛
- Check the Issues page for open bugs
- Fix bugs and submit a PR with clear description
- Include steps to reproduce the bug

#### 2. **New Features** ✨

**High Priority:**
- Email verification system
- Password reset functionality
- User profile management
- Logout functionality
- Session management

**Medium Priority:**
- Social authentication (Google, GitHub)
- Two-factor authentication
- Remember me functionality
- Rate limiting for login attempts
- Account lockout after failed attempts

**Low Priority:**
- User avatar upload
- Dark/Light theme toggle
- Activity log
- Account deletion

#### 3. **UI/UX Improvements** 🎨
- Improve form animations
- Add loading skeletons
- Enhance mobile responsiveness
- Add accessibility features (ARIA labels, keyboard navigation)
- Improve error messages

#### 4. **Documentation** 📚
- Improve setup guides
- Add API documentation
- Create video tutorials
- Write blog posts about implementation

#### 5. **Testing** 🧪
- Add unit tests
- Add integration tests
- Add end-to-end tests
- Improve test coverage

## 📝 Coding Guidelines

### JavaScript/Node.js Style

```javascript
// Use const for constants, let for variables
const API_BASE_URL = '/api/auth';
let userCount = 0;

// Use arrow functions for callbacks
const handleSubmit = async (e) => {
  e.preventDefault();
  // ...
};

// Use async/await instead of promises
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  console.error(error);
}

// Use meaningful variable names
const isUserLoggedIn = !!getToken();

// Add comments for complex logic
// Check if password meets strength requirements
const isStrongPassword = password.length >= 8 && /[A-Z]/.test(password);
```

### HTML/CSS Style

```html
<!-- Use semantic HTML -->
<main>
  <section id="login-section">
    <form id="loginForm">
      <!-- ... -->
    </form>
  </section>
</main>

<!-- Use meaningful class names -->
<div class="auth-container">
  <button class="btn-primary">Submit</button>
</div>
```

### File Naming Conventions

- Use kebab-case for files: `auth-service.js`, `user-profile.html`
- Use PascalCase for models: `User.js`, `Session.js`
- Use camelCase for functions: `getUserProfile()`, `validateEmail()`

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test the following:

**Signup Flow:**
- [ ] Valid signup works
- [ ] Duplicate email shows error
- [ ] Weak password shows error
- [ ] Empty fields show validation errors
- [ ] Password confirmation works
- [ ] Terms checkbox is required
- [ ] Success message appears
- [ ] User is redirected after signup

**Login Flow:**
- [ ] Valid login works
- [ ] Invalid credentials show error
- [ ] Empty fields show validation errors
- [ ] Remember me checkbox works
- [ ] Success message appears
- [ ] User is redirected after login

**General:**
- [ ] Responsive design works on mobile
- [ ] All links work correctly
- [ ] No console errors
- [ ] Loading states work
- [ ] Token is stored in localStorage

### API Testing

Test all endpoints using the test page:
```
http://localhost:3000/test-auth
```

Or use curl:
```bash
# Test signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## 📬 Pull Request Process

1. **Update your branch** with the latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Commit your changes** with clear messages:
   ```bash
   git add .
   git commit -m "feat: add email verification feature"
   ```

   **Commit Message Format:**
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Add screenshots if UI changes
   - List what you've tested

5. **Wait for review**:
   - Address any feedback
   - Keep your PR updated with main branch
   - Be patient and respectful

## 🎯 Example Contributions

### Example 1: Add Logout Button

**File:** `index.html`
```html
<!-- In the navigation -->
<div id="userMenu" class="hidden">
  <span id="userName"></span>
  <button onclick="logout()">Logout</button>
</div>
```

**File:** `auth.js`
```javascript
// Add logout function
const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

// Update navigation based on auth status
const updateNavigation = () => {
  const user = getUser();
  const userMenu = document.getElementById('userMenu');
  const loginLink = document.getElementById('loginLink');
  
  if (user) {
    userMenu.classList.remove('hidden');
    loginLink.classList.add('hidden');
    document.getElementById('userName').textContent = user.name;
  }
};
```

### Example 2: Add Password Strength Indicator

**File:** `signup.html`
```html
<div class="password-strength">
  <div id="strengthBar" class="strength-bar"></div>
  <p id="strengthText"></p>
</div>
```

**File:** `auth.js`
```javascript
const checkPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  // Update UI based on strength
  updateStrengthUI(strength);
};
```

## 🏆 Recognition

Contributors will be:
- Listed in the CONTRIBUTORS.md file
- Mentioned in release notes
- Given credit in the project README

## 📞 Getting Help

If you need help:
- Check existing documentation
- Search closed issues and PRs
- Ask in the issue you're working on
- Contact maintainers

## 🎉 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Contributing! 🚀**
