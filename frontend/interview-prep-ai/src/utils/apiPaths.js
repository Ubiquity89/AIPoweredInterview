export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register", // Signup
    LOGIN: "/auth/login", // Authenticate user & return JWT token
    GET_PROFILE: "/auth/profile", // Get logged-in user details
  },

  RESUME: {
    ANALYZE: "/resume/analyze", // Analyze resume and return ATS score and insights
  },

  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image", // Upload profile picture
  },

  AI: {
    GENERATE_QUESTIONS: "/ai/generate-questions", // Generate interview questions and answers using Gemini
    GENERATE_EXPLANATION: "/ai/generate-explanation", // Generate concept explanation using Gemini
  },

  SESSION: {
    CREATE: "/sessions/create", // Create a new interview session with questions
    GET_ALL: "/sessions/my-sessions", // Get all user sessions
    GET_ONE: (id) => `/sessions/${id}`, // Get session details with questions
    DELETE: (id) => `/sessions/${id}`, // Delete a session
  },

  QUESTION: {
    ADD_TO_SESSION: "/questions/add", // Add more questions to a session
    PIN: (id) => `/questions/${id}/pin`, // Pin or Unpin a question
    UPDATE_NOTE: (id) => `/questions/${id}/note`, // Update/Add a note to a question
  },
};
