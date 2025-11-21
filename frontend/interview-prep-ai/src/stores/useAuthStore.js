// src/stores/useAuthStore.js
import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  setUser: (userData) => set({ user: userData, isAuthenticated: !!userData }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Login user
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post('http://localhost:5001/api/auth/register', userData);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },

  // Check if user is authenticated
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      set({ isLoading: true });
      const response = await axios.get('http://localhost:5001/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      set({ 
        user: response.data.user, 
        isAuthenticated: true,
        isLoading: false 
      });
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
      return false;
    }
  }
}));

export default useAuthStore;
