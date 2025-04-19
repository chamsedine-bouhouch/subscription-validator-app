import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async login(credentials) {
      // In a real app, you would make an API call here
      // This is a mock implementation for demonstration

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation - replace with actual API call
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        const userData = {
          id: 1,
          name: 'John Doe',
          email: credentials.email,
        }

        const token = 'mock-jwt-token'

        // Update state
        this.user = userData
        this.token = token
        this.isAuthenticated = true

        // Store token in localStorage if remember me is checked
        if (credentials.remember) {
          localStorage.setItem('token', token)
        }

        return userData
      } else {
        throw new Error('Invalid email or password')
      }
    },

    logout() {
      // Clear user data
      this.user = null
      this.token = null
      this.isAuthenticated = false

      // Remove token from localStorage
      localStorage.removeItem('token')
    },

    async checkAuth() {
      // Check if user is already authenticated
      if (this.token) {
        try {
          // In a real app, you would validate the token with your API
          // This is a mock implementation
          this.isAuthenticated = true
          this.user = {
            id: 1,
            name: 'John Doe',
            email: 'user@example.com',
          }
          return true
        } catch (error) {
          this.logout()
          return false
        }
      }
      return false
    },
  },
})
