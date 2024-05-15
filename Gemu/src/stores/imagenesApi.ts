import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const ImagenesApi = defineStore('imagenes', {
  state: () => ({
    listaImagenes: [] as any[]
  }),

  actions: {
    async ImagenesProducto(idJuego: number, imagenes: string[]) {
      try {
        const token = usarioAPi.getToken()

        const imagenesObj = imagenes.map((imagen, index) => ({
          datos: imagen,
          esPortada: index === 0,
          productoId: idJuego
        }))

        const response = await fetch(`${baseUrl}/Imagen/producto `, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(imagenesObj)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al asignar las imagenes.')
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async EliminarImagenesProducto(idProducto: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Imagen/producto `, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(idProducto)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al eliminar las imagenes.')
        }

        console.log('se elimino las imagenes')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async guardarImagenes(imagenes: string[]) {
      try {
        this.listaImagenes = imagenes
      } catch (error) {
        console.error('Error al eliminar las imágenes:', error)
        throw error
      }
    }
  }
})
