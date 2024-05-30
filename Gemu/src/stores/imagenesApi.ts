import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const ImagenesApi = defineStore('imagenes', {
  state: () => ({
    listaImagenes: [] as any[],
    imagenesProductos: [] as any[],
    imagenesJuegos: [] as any[]
  }),

  actions: {
    async AddImagenesProducto(idProducto: number, imagenes: string[]) {
      try {
        const token = usarioAPi.getToken()

        const imagenesObj = imagenes.map((imagen, index) => ({
          datos: imagen,
          esPortada: index === 0,
          productoId: idProducto
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

        console.log('Imagenes agregadas correctamente')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async AddImagenesJuego(idJuego: number, imagenes: string[]) {
      try {
        const token = usarioAPi.getToken()

        const imagenesObj = imagenes.map((imagen, index) => ({
          datos: imagen,
          esPortada: index === 0,
          juegoId: idJuego
        }))

        const response = await fetch(`${baseUrl}/Imagen/juego `, {
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

        console.log('Imagenes agregadas correctamente')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async GetImagenesProducto(idProducto: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Imagen/producto?id=${idProducto}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener las imagenes.')
        }

        const data = await response.json()

        this.imagenesProductos = data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async GetImagenesJuego(idJuego: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Imagen/juego?id=${idJuego}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener las imagenes.')
        }

        const data = await response.json()

        this.imagenesJuegos = data
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
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async EliminarImagenesJuego(idJuego: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Imagen/juego `, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(idJuego)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al eliminar las imagenes.')
        }
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
