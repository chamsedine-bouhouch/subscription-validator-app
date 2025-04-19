import api from "@/plugins/axios"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || '')
    const isAuthenticated = computed(() => !!token.value)
  
    const login = async ({ email, password }: { email: string; password: string }) => {
      const res = await api.post('/auth/login', { email, password })
      user.value = res.data.user
      token.value = res.data.token
      localStorage.setItem('token', res.data.token)
    }
  
    const logout = () => {
      user.value = null
      token.value = ''
      localStorage.removeItem('token')
    }
  
    const checkAuth = async () => {
      if (!token.value) return logout()
      try {
        const res = await api.get('/auth/me')
        user.value = res.data
      } catch {
        logout()
      }
    }
  
    return { user, token, isAuthenticated, login, logout, checkAuth }
  }, {
    persist: true
  })
  