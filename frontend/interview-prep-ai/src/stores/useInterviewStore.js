// src/stores/useInterviewStore.js
import { create } from 'zustand';

export const useInterviewStore = create((set) => ({
  // Interview state
  isInterviewActive: false,
  currentQuestion: null,
  interviewHistory: [],
  feedback: null,
  isLoading: false,
  error: null,
  interviewSettings: {
    type: '',
    role: '',
    difficulty: 'intermediate'
  },

  // Actions
  startInterview: () => set({ isInterviewActive: true, error: null }),
  endInterview: () => set({ isInterviewActive: false }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  addToHistory: (entry) => set((state) => ({
    interviewHistory: [...state.interviewHistory, entry]
  })),
  setFeedback: (feedback) => set({ feedback }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setInterviewState: (newState) => set((state) => ({
    ...state,
    ...newState,
    interviewSettings: {
      ...state.interviewSettings,
      ...(newState.interviewSettings || {})
    }
  }))
}));