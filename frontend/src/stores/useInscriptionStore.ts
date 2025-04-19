// src/stores/useInscriptionStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/plugins/axios'

export const useInscriptionStore = defineStore('inscription', () => {
  const inscriptions = ref([])
  const loading = ref(false)
  const error = ref(null)

  const totalInscriptions = computed(() => inscriptions.value.length)
  const validatedCount = computed(() => inscriptions.value.filter((item) => item.validated).length)
  const tokensGeneratedCount = computed(
    () => inscriptions.value.filter((item) => item.token).length,
  )

  const fetchInscriptions = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/inscriptions')
      inscriptions.value = response.data

      console.log('inscriptions', inscriptions.value)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const validateInscription = async (id: string) => {
    try {
      await api.post(`/api/inscription/${id}/validate`)
      const index = inscriptions.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        inscriptions.value[index].validated = true
      }
    } catch (err) {
      console.error('Validation failed', err)
    }
  }

  return {
    inscriptions,
    loading,
    error,
    fetchInscriptions,
    validateInscription,
    totalInscriptions,
    validatedCount,
    tokensGeneratedCount,
  }
})
