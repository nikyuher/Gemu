import { defineStore } from 'pinia'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl

export const reseñaApi = defineStore('reseña', {
  state: () => ({
    listReseñasJuego: [] as any[],
    listReseñasProducto: [] as any[]
  }),

  actions: {
    async crearReseñaJuego(datosReseña: any) {
      try {
        const token = datosReseña.token

        const reseña = {
          idUsuario: datosReseña.idUsuario,
          idJuego: datosReseña.idJuego,
          comentario: datosReseña.comentario,
          calificacion: datosReseña.calificacion
        }

        const response = await fetch(`${baseUrl}/Reseña/juego?idJuego=${datosReseña.idJuego}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(reseña)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al crear la reseña.')
        }

        console.log('Creado exitosamente')
      } catch (error) {
        console.error('Error con la api:', error)
        throw error
      }
    },
    async crearReseñaProducto(datosReseña: any) {
      try {
        const token = datosReseña.token

        const reseña = {
          idUsuario: datosReseña.idUsuario,
          idProducto: datosReseña.idProducto,
          comentario: datosReseña.comentario,
          calificacion: datosReseña.calificacion
        }

        const response = await fetch(
          `${baseUrl}/Reseña/producto?idProducto=${datosReseña.idProducto}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(reseña)
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al crear la reseña.')
        }
      } catch (error) {
        console.error('Error con la api:', error)
        throw error
      }
    },
    async listaReseñasJuego(idJuego: number) {
      try {
        const response = await fetch(`${baseUrl}/Juego/${idJuego}/reseñas`, {
          method: 'GET',
          headers: {}
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener las reseñas.')
        }

        const data = await response.json()

        this.listReseñasJuego = [data]
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async listaReseñasProducto(idProducto: number) {
      try {
        const response = await fetch(`${baseUrl}/Producto/${idProducto}/reseñas`, {
          method: 'GET',
          headers: {}
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener las reseñas.')
        }

        const data = await response.json()

        this.listReseñasProducto = [data]
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
})
