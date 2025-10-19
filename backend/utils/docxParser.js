const mammoth = require('mammoth');
const fs = require('fs').promises;

async function extractTextFromDocx(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from Word document');
  }
}

module.exports = { extractTextFromDocx };
