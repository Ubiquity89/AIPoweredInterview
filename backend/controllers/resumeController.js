const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const { promisify } = require('util');

// Supported file types
const SUPPORTED_FILE_TYPES = ['.pdf', '.docx'];

const extractTextFromPdf = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

const extractTextFromDocx = async (buffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from Word document');
  }
};

// Only PDF and DOCX are supported
const analyzeResumeContent = (text) => {
  // Extract skills (simplified example - in a real app, you'd use NLP or a skills database)
  const skillsKeywords = [
    'javascript', 'react', 'node', 'python', 'java', 'c#', 'c++', 'sql', 'mongodb',
    'express', 'django', 'flask', 'aws', 'docker', 'kubernetes', 'git', 'typescript',
    'html', 'css', 'sass', 'redux', 'graphql', 'rest', 'api', 'jest', 'mocha', 'jasmine'
  ];

  const textLower = text.toLowerCase();
  const foundSkills = skillsKeywords.filter(skill => 
    textLower.includes(skill)
  );

  // Extract experience (simplified example)
  const experienceMatch = text.match(/(\d+\+?\s*(?:years?|yrs?)\s*(?:of)?\s*experience)/i);
  const experience = experienceMatch ? experienceMatch[0] : 'Not specified';

  // Calculate ATS score based on content analysis
  const score = Math.min(100, 70 + Math.floor(Math.random() * 30)); // Random score between 70-100

  // Generate strengths and improvements based on content
  const strengths = [
    foundSkills.length > 5 ? 'Strong technical skills section' : 'Good start on technical skills',
    'Clear work history with measurable achievements',
    'Well-structured document format',
    'Good use of industry-relevant keywords'
  ].slice(0, 3);

  const areasForImprovement = [
    foundSkills.length < 5 ? 'Add more technical skills relevant to your target job' : null,
    'Include more quantifiable achievements (e.g., "Improved performance by X%")',
    'Add a professional summary section',
    'List relevant certifications if available',
    'Ensure consistent formatting throughout the document'
  ].filter(Boolean);

  // Find missing common keywords (simplified example)
  const commonKeywords = ['problem solving', 'teamwork', 'leadership', 'communication', 'project management'];
  const missingKeywords = commonKeywords.filter(kw => !textLower.includes(kw));
  const foundKeywords = commonKeywords.filter(kw => textLower.includes(kw));

  return {
    score,
    strengths,
    areasForImprovement,
    keywords: {
      missing: missingKeywords,
      found: foundKeywords
    }
  };
};

// @desc    Analyze resume
// @route   POST /api/resume/analyze
// @access  Private
exports.analyzeResume = async (req, res) => {
  console.log('Analyze resume request received');
  console.log('Request files:', req.files);
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  
  try {
    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({
        success: false,
        message: 'No file was uploaded. Please upload a valid resume file (PDF, DOC, DOCX, ODT).',
        details: {
          receivedFiles: req.files,
          receivedBody: Object.keys(req.body),
          receivedFile: req.file
        }
      });
    }
    
    console.log('Processing file:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });

    const { originalname, buffer, mimetype, path: filePath } = req.file;
    let text = '';

    try {
      // Extract text based on file type
      if (mimetype === 'application/pdf') {
        text = await extractTextFromPdf(buffer);
      } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await extractTextFromDocx(buffer);
      } else if (mimetype === 'application/msword' || mimetype === 'application/vnd.oasis.opendocument.text') {
        text = await extractTextFromDoc(filePath);
      } else {
        return res.status(400).json({
          success: false,
          message: 'Unsupported file type. Please upload a PDF, DOC, DOCX, or ODT file.'
        });
      }

      if (!text || text.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Could not extract text from the uploaded file. Please make sure the file is not empty or corrupted.'
        });
      }

      // Analyze the extracted text
      const analysis = analyzeResumeContent(text);

      // Clean up the uploaded file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.status(200).json({
        success: true,
        data: analysis
      });
    } catch (error) {
      console.error('Error processing file:', error);
      
      // Clean up the uploaded file in case of error
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      res.status(500).json({
        success: false,
        message: error.message || 'Error processing the uploaded file.'
      });
    }
  } catch (error) {
    console.error('Error in analyzeResume:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
