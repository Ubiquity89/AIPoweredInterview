// src/config/vapi.js
export const VAPI_CONFIG = {
  apiKey: import.meta.env.VITE_VAPI_PUBLIC_KEY,
  baseUrl: import.meta.env.VITE_VAPI_BASE_URL || 'https://api.vapi.ai',
};