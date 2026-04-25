import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: '/api',
});

// Automatically add the Firebase Token to every single request!
api.interceptors.request.use(async (config) => {
  // auth.currentUser can be null briefly after sign-up — wait for the current user
  const user = auth.currentUser;
  if (user) {
    try {
      // Force-refresh=false is fine here; Firebase caches the token
      const token = await user.getIdToken(false);
      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.warn('Could not get ID token:', err.message);
    }
  }
  return config;
});

export default api;
