import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const BibliotecaApi = defineStore('biblioteca', {
  state: () => ({
    listabiblioteca: [] as any[]
  }),

  actions: {
    async historialBiblioteca(idUsuario: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Biblioteca/usuario?id=${idUsuario}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener el historial.')
        }

        const data = await response.json()

        this.listabiblioteca = [data]
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
})
