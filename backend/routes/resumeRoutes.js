const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middlewares/authMiddleware');
const { analyzeResume } = require('../controllers/resumeController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/resumes');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to allow only PDF and DOCX files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and DOCX files are supported.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});
// @desc    Analyze resume file
// @route   POST /api/resume/analyze
// @access  Public (temporarily for testing)
router.post('/analyze', upload.single('resume'), (req, res) => {
  console.log('File upload received:', req.file);
  console.log('Request body:', req.body);
  
  // Simple test response
  res.json({
    success: true,
    message: 'File received successfully',
    file: req.file,
    body: req.body
  });
});

// Original protected route (commented out for now)
// router.post('/analyze', protect, upload.single('resume'), analyzeResume);

module.exports = router;
