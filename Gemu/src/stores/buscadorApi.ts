import { defineStore } from 'pinia'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl

export const buscadorApi = defineStore('buscador', {
  state: () => ({
    listaBusqueda: [] as any[]
  }),

  actions: {
    async busqueda(nombre: string) {
      try {
        const response = await fetch(`${baseUrl}/Buscador?nombre=${nombre}`, {
          method: 'GET',
          headers: {}
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener la busqueda.')
        }

        const data = await response.json()

        this.listaBusqueda = [data]
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
})
