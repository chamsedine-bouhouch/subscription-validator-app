import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/plugins/axios'

export const useInscriptionStore = defineStore('inscription', () => {
  const inscriptions = ref<any[]>([])
  const loading = ref(false)
  const error = ref<any>(null)

  const totalInscriptions = computed(() => inscriptions.value.length)
  const validatedCount = computed(() => inscriptions.value.filter((i) => i.validated).length)
  const tokensGeneratedCount = computed(
    () => inscriptions.value.filter((i) => i.bearer_token).length,
  )

  const fetchInscriptions = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/inscriptions')
      inscriptions.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const validateInscription = async (id: number) => {
    try {
      await api.post(`/inscriptions/${id}/validate`)
      const index = inscriptions.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        inscriptions.value[index].validated = true
        inscriptions.value[index].validation_date = new Date().toISOString()
      }
    } catch (err) {
      console.error('Validation failed', err)
    }
  }

  const generateToken = async (id: number) => {
    try {
      const response = await api.post(`/inscriptions/token/${id}`)
      const index = inscriptions.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        inscriptions.value[index].bearer_token = response.data.bearer_token
      }
      return response.data
    } catch (err) {
      console.error('Token generation failed', err)
      throw err
    }
  }

  return {
    inscriptions,
    loading,
    error,
    fetchInscriptions,
    validateInscription,
    generateToken,
    totalInscriptions,
    validatedCount,
    tokensGeneratedCount,
  }
})
