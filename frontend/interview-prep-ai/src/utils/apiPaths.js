<<<<<<< HEAD
=======
export const BASE_URL = "https://aipoweredinterview.onrender.com";

>>>>>>> e96648df923642c9e83cc8e211fee0511221f42f
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

<<<<<<< HEAD
  QUESTION: {
    ADD_TO_SESSION: "/questions/add", // Add more questions to a session
    PIN: (id) => `/questions/${id}/pin`, // Pin or Unpin a question
    UPDATE_NOTE: (id) => `/questions/${id}/note`, // Update/Add a note to a question
  },
=======
    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add", // Add more questions to a session
        PIN: (id) => `/api/questions/${id}/pin`, // Pin or Unpin a question
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // Update/Add a note to a question
    },
>>>>>>> e96648df923642c9e83cc8e211fee0511221f42f
};
