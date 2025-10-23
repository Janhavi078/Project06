# 🗺️ Authentication System Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  login.html  │  │ signup.html  │  │  index.html  │          │
│  │    (UI)      │  │    (UI)      │  │   (Home)     │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
│         └──────────────────┼──────────────────┘                  │
│                            │                                      │
│                     ┌──────▼──────┐                              │
│                     │   auth.js   │ (Frontend Logic)             │
│                     │ - Validate  │                              │
│                     │ - API calls │                              │
│                     │ - Token mgmt│                              │
│                     └──────┬──────┘                              │
│                            │                                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   HTTP Request  │
                    │ (JSON + Token)  │
                    └────────┬────────┘
                             │
┌────────────────────────────▼──────────────────────────────────────┐
│                       SERVER (Node.js/Express)                     │
├───────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │                      server.js                          │     │
│  │  - Express app setup                                    │     │
│  │  - Middleware configuration                             │     │
│  │  - Route mounting                                       │     │
│  │  - MongoDB connection                                   │     │
│  └────────────────────┬────────────────────────────────────┘     │
│                       │                                           │
│         ┌─────────────┼─────────────┐                            │
│         │             │             │                            │
│    ┌────▼────┐   ┌────▼────┐  ┌────▼────┐                       │
│    │  CORS   │   │  JSON   │  │ Static  │                       │
│    │  (MW)   │   │ Parser  │  │  Files  │                       │
│    └─────────┘   └─────────┘  └─────────┘                       │
│                       │                                           │
│                  ┌────▼────┐                                      │
│                  │ Routes  │                                      │
│                  │  /api   │                                      │
│                  └────┬────┘                                      │
│                       │                                           │
│         ┌─────────────┴─────────────┐                            │
│         │                           │                            │
│    ┌────▼────────┐           ┌──────▼──────┐                    │
│    │ Public      │           │ Protected   │                    │
│    │ Routes      │           │ Routes      │                    │
│    │ /signup     │           │ /profile    │                    │
│    │ /login      │           │             │                    │
│    └────┬────────┘           └──────┬──────┘                    │
│         │                           │                            │
│         │                     ┌─────▼─────┐                      │
│         │                     │   auth    │ (Middleware)         │
│         │                     │ Verify JWT│                      │
│         │                     └─────┬─────┘                      │
│         │                           │                            │
│    ┌────▼───────────────────────────▼──────┐                    │
│    │       authController.js                │                    │
│    │  - signup()    (register user)         │                    │
│    │  - login()     (authenticate)          │                    │
│    │  - getProfile() (get user data)        │                    │
│    └────┬───────────────────────────────────┘                    │
│         │                                                         │
│    ┌────▼────┐                                                   │
│    │  User   │ (Model - models/User.js)                         │
│    │  Model  │ - Schema definition                               │
│    │         │ - Password hashing                                │
│    │         │ - Validation                                      │
│    └────┬────┘                                                   │
│         │                                                         │
└─────────┼─────────────────────────────────────────────────────────┘
          │
     ┌────▼────┐
     │ MongoDB │
     │Database │
     │         │
     │ Users   │
     │ Collection:                                                  
     │ {                                                            
     │   _id: ObjectId,                                             
     │   name: String,                                              
     │   email: String (unique),                                    
     │   password: String (hashed),                                 
     │   createdAt: Date                                            
     │ }                                                            
     └─────────┘
```

## Data Flow

### 1. Signup Flow

```
User fills form → Validation → API POST /api/auth/signup
                                        ↓
                                 authController.signup()
                                        ↓
                      Check if user exists ← MongoDB
                                        ↓
                      Hash password (bcrypt)
                                        ↓
                      Save user → MongoDB
                                        ↓
                      Generate JWT token
                                        ↓
                      Response: {token, user}
                                        ↓
                      Store in localStorage
                                        ↓
                      Redirect to home
```

### 2. Login Flow

```
User enters credentials → Validation → API POST /api/auth/login
                                            ↓
                                 authController.login()
                                            ↓
                           Find user by email ← MongoDB
                                            ↓
                           Compare passwords (bcrypt)
                                            ↓
                           Generate JWT token
                                            ↓
                           Response: {token, user}
                                            ↓
                           Store in localStorage
                                            ↓
                           Redirect to home
```

### 3. Protected Route Access

```
User requests profile → Add token to header → API GET /api/auth/profile
                                                      ↓
                                               auth middleware
                                                      ↓
                                               Verify JWT
                                                      ↓
                                             authController.getProfile()
                                                      ↓
                                          Fetch user data ← MongoDB
                                                      ↓
                                          Response: {user}
```

## File Relationships

```
frontend/
├── login.html ──────────┐
├── signup.html ─────────┼──→ auth.js ──→ API calls
└── index.html ──────────┘

backend/
├── server.js
│   ├── requires → routes/authRoutes.js
│   └── connects → MongoDB
│
├── routes/authRoutes.js
│   ├── requires → controllers/authController.js
│   └── requires → middleware/auth.js
│
├── controllers/authController.js
│   └── requires → models/User.js
│
├── middleware/auth.js
│   └── verifies → JWT tokens
│
└── models/User.js
    └── defines → User schema
```

## Technology Stack

```
┌─────────────────────────────────────┐
│           FRONTEND                  │
├─────────────────────────────────────┤
│ HTML5         │ Structure           │
│ CSS3/Tailwind │ Styling             │
│ JavaScript    │ Logic & Validation  │
└─────────────────────────────────────┘
              ↕ HTTP/JSON
┌─────────────────────────────────────┐
│           BACKEND                   │
├─────────────────────────────────────┤
│ Node.js       │ Runtime             │
│ Express.js    │ Web Framework       │
│ JWT           │ Authentication      │
│ bcryptjs      │ Password Hashing    │
│ dotenv        │ Config Management   │
│ cors          │ CORS Policy         │
└─────────────────────────────────────┘
              ↕ Mongoose ODM
┌─────────────────────────────────────┐
│           DATABASE                  │
├─────────────────────────────────────┤
│ MongoDB       │ NoSQL Database      │
│ Collections   │ Users               │
└─────────────────────────────────────┘
```

## Security Layers

```
┌──────────────────────────────────────────┐
│ Layer 1: Client-Side Validation          │
│ - Email format                           │
│ - Password strength                      │
│ - Required fields                        │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Layer 2: Server-Side Validation          │
│ - Schema validation (Mongoose)           │
│ - Email uniqueness                       │
│ - Data sanitization                      │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Layer 3: Password Security               │
│ - bcrypt hashing (10 rounds)             │
│ - Salt generation                        │
│ - One-way encryption                     │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Layer 4: Token-Based Auth                │
│ - JWT generation                         │
│ - Token verification                     │
│ - Expiration (7 days)                    │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Layer 5: Middleware Protection           │
│ - Route protection                       │
│ - Authorization checks                   │
│ - Error handling                         │
└──────────────────────────────────────────┘
```

## Request/Response Cycle

```
1. User Action (Click Submit)
        ↓
2. Form Validation (client-side)
        ↓
3. API Request (fetch)
        ↓
4. Server Receives Request
        ↓
5. Route Handler (Express)
        ↓
6. Middleware Execution
        ↓
7. Controller Logic
        ↓
8. Database Query (MongoDB)
        ↓
9. Response Generation
        ↓
10. Send Response (JSON)
        ↓
11. Client Receives Response
        ↓
12. Update UI (Success/Error)
        ↓
13. Store Data (if success)
        ↓
14. Redirect (if applicable)
```

## Component Responsibilities

```
┌──────────────────────────────────────────────────────┐
│ Component            │ Responsibility                │
├──────────────────────────────────────────────────────┤
│ login.html           │ Login UI                      │
│ signup.html          │ Signup UI                     │
│ auth.js              │ Frontend auth logic           │
│ server.js            │ Express server setup          │
│ authRoutes.js        │ Define API endpoints          │
│ authController.js    │ Business logic                │
│ User.js              │ Data model & validation       │
│ auth.js (middleware) │ Token verification            │
│ .env                 │ Configuration                 │
└──────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│                   PRODUCTION                         │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐                                   │
│  │   Client     │                                   │
│  │  (Browser)   │                                   │
│  └──────┬───────┘                                   │
│         │                                            │
│         │ HTTPS                                      │
│         ↓                                            │
│  ┌──────────────┐                                   │
│  │   CDN/       │                                   │
│  │  Load Bal.   │                                   │
│  └──────┬───────┘                                   │
│         │                                            │
│         ↓                                            │
│  ┌──────────────┐        ┌──────────────┐          │
│  │  Node.js     │◄──────►│  MongoDB     │          │
│  │  Server      │        │  Atlas       │          │
│  │ (Heroku/     │        │ (Cloud DB)   │          │
│  │  Railway)    │        │              │          │
│  └──────────────┘        └──────────────┘          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

**This architecture diagram shows how all components work together to create a secure, scalable authentication system.**
