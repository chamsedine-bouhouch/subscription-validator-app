import { defineStore } from 'pinia'
import api from '@/plugins/axios' // your custom Axios instance

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token'),
  }),

  actions: {
    async login({ email, password, remember }: { email: string; password: string; remember: boolean }) {
      try {
        const response = await api.post('/auth/login', { email, password })
        const { user, token } = response.data

        this.user = user
        this.token = token
        this.isAuthenticated = true

        if (remember) {
          localStorage.setItem('token', token)
        }

        return user
      } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Invalid credentials')
      }
    },

    logout() {
      this.user = null
      this.token = ''
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },

    async checkAuth() {
      if (this.token) {
        try {
          const response = await api.get('/auth/me')
          this.user = response.data
          this.isAuthenticated = true
        } catch (error) {
          this.logout()
        }
      }
    },
  },
})
