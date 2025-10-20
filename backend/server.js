require("dotenv").config();
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

// Configure CORS with specific origins and headers
// Update the allowedOrigins array to include your frontend domain
const allowedOrigins = [
  'https://aipoweredinterview-frontend1.onrender.com',  // Your frontend domain
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5174',
  'http://127.0.0.1:5174'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      console.error('CORS error:', { origin, allowedOrigins });
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Accept-Language',
    'Content-Length',
    'Cache-Control',
    'X-CSRF-Token',
    'X-Forwarded-For',
    'X-Forwarded-Proto',
    'X-Forwarded-Port',
    'X-Forwarded-Host',
    'X-Forwarded-Prefix',
    'X-Request-Id',
    'X-Request-Start',
    'X-Requested-With',
    'X-Real-IP',
    'X-HTTP-Method-Override',
    'X-Forwarded-For',
    'X-Forwarded-Host',
    'X-Forwarded-Proto',
    'X-Forwarded-SSL',
    'X-Forwarded-Port',
    'X-Forwarded-Prefix',
    'X-Request-Id',
    'X-Request-Start',
    'X-Requested-With',
    'X-Real-IP',
    'X-HTTP-Method-Override',
    'X-Forwarded-For',
    'X-Forwarded-Host',
    'X-Forwarded-Proto',
    'X-Forwarded-SSL',
    'X-Forwarded-Port',
    'X-Forwarded-Prefix',
    'X-Request-Id',
    'X-Request-Start',
    'X-Requested-With',
    'X-Real-IP',
    'X-HTTP-Method-Override',
    'X-Forwarded-For',
    'X-Forwarded-Host',
    'X-Forwarded-Proto',
    'X-Forwarded-SSL',
    'X-Forwarded-Port',
    'X-Forwarded-Prefix',
    'X-Request-Id',
    'X-Request-Start',
    'X-Requested-With',
    'X-Real-IP',
    'X-HTTP-Method-Override',
    'X-Forwarded-For',
    'X-Forwarded-Host',
    'X-Forwarded-Proto',
    'X-Forwarded-SSL',
    'X-Forwarded-Port',
    'X-Forwarded-Prefix',
    'X-Request-Id',
    'X-Request-Start',
    'X-Requested-With',
    'X-Real-IP',
    'X-HTTP-Method-Override',
    'Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Request-Method'
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Connect to MongoDB
connectDB();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads/resumes');
console.log('Ensuring uploads directory exists at:', uploadsDir);
try {
  if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created successfully');
  } else {
    console.log('Uploads directory already exists');
  }
  
  // Test write permissions
  const testFile = path.join(uploadsDir, 'test-permission.txt');
  fs.writeFileSync(testFile, 'test', 'utf8');
  fs.unlinkSync(testFile);
  console.log('Write permissions verified in uploads directory');
} catch (error) {
  console.error('Error setting up uploads directory:', error);
  process.exit(1);
}

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors(corsOptions));

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
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server 
const PORT = process.env.PORT || 5001;

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

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Allowed origins:', allowedOrigins);
}).on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please free the port or use a different one.`);
  }
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