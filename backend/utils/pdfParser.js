const fs = require('fs').promises;
const pdf = require('pdf-parse');

async function extractTextFromPdf(filePath) {
  try {
    // Read the PDF file into a buffer
    const dataBuffer = await fs.readFile(filePath);
    
    // Parse the PDF with error handling
    const data = await pdf(dataBuffer);
    
    if (!data || !data.text) {
      throw new Error('No text content found in PDF');
    }
    
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`Failed to process PDF: ${error.message}`);
  }
}

module.exports = { extractTextFromPdf };
