// Load environment variables
require('dotenv').config();

// Basic configuration
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('Starting server with configuration:');
console.log('- Port:', PORT);
console.log('- Environment:', NODE_ENV);
console.log('- MongoDB URI:', process.env.MONGO_URI ? '***' : 'Not set');

// Initialize Express
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");

const app = express();

// Configure CORS with specific origins and wildcard support for Vercel
const allowedOrigins = [
  'https://ai-powered-interview-tau.vercel.app',  // Production Vercel frontend
  'https://ai-powered-interview-*.vercel.app',    // Vercel preview deployments
  'https://aipoweredinterview.onrender.com',      // Render backend
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:10000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if the origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const regex = new RegExp('^' + allowedOrigin.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    });

    if (isAllowed) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      console.error('CORS error:', { origin, allowedOrigins });
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'x-auth-token',
    'Access-Control-Allow-Origin',
    'Cache-Control',  // Add this line
    'cache-control'   // And this line for case-sensitivity
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
};

// Connect to MongoDB
connectDB();

// Create uploads directories if they don't exist
const uploadsRootDir = path.join(__dirname, 'uploads');
const resumesDir = path.join(uploadsRootDir, 'resumes');

const ensureDirExists = (dirPath) => {
  console.log('Ensuring directory exists at:', dirPath);
  try {
    if (!fs.existsSync(dirPath)) {
      console.log(`Creating directory: ${dirPath}`);
      fs.mkdirSync(dirPath, { recursive: true });
      console.log('Directory created successfully');
    } else {
      console.log('Directory already exists');
    }

    // Test write permissions
    const testFile = path.join(dirPath, 'test-permission.txt');
    fs.writeFileSync(testFile, 'test', 'utf8');
    fs.unlinkSync(testFile);
    console.log('Write permissions verified');
  } catch (error) {
    console.error(`Error setting up directory ${dirPath}:`, error);
    process.exit(1);
  }
};

ensureDirExists(uploadsRootDir);
ensureDirExists(resumesDir);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enable CORS pre-flight for all routes
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use('/uploads', express.static(uploadsRootDir));

// Root route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "AI Interview Prep API is running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      sessions: "/api/sessions",
      questions: "/api/questions",
      resume: "/api/resume"
    },
    documentation: "Coming soon..."
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/resume", resumeRoutes);
// Test file upload endpoint
app.post('/api/test-upload', (req, res) => {
  console.log('Test upload endpoint hit');
  console.log('Request headers:', req.headers);
  console.log('Request body keys:', Object.keys(req.body));
  console.log('Request files:', req.files);
  console.log('Request file:', req.file);
  
  res.json({
    success: true,
    message: 'Test endpoint working',
    headers: req.headers,
    body: req.body,
    files: req.files,
    file: req.file
  });
});

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// File upload functionality has been removed

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: NODE_ENV === 'development' ? err.message : undefined
  });
});

// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log('Allowed origins:', allowedOrigins);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please free the port or use a different one.`);
  }
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle server close gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;