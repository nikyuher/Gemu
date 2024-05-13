import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const CategoriaApi = defineStore('categoria', {
  state: () => ({
    listaImagenes: [] as any[]
  }),

  actions: {
    async guardarImagenes(imagenes: string[]) {
      try {
        this.listaImagenes = imagenes
      } catch (error) {
        console.error('Error al guardar las imágenes:', error)
        throw error
      }
    }
  }
})
