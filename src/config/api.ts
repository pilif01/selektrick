// API Configuration
// In production, the API is served from the same domain
// In development, it's on localhost:3001

const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001/api'
  : '/api';  // Same domain in production

export { API_BASE_URL };

