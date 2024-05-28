import { defineStore } from 'pinia'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl

export const CategoriaApi = defineStore('categoria', {
  state: () => ({
    listaCategoriaSeccion: [] as any[],
    listaCategoriaPlataforma: [] as any[],
    listCategoriasProducto: [] as any[],
    listCategoriasJuego: [] as any[]
  }),

  actions: {
    async GetCategoriasProducto(idProducto: number) {
      try {
        const response = await fetch(`${baseUrl}/Producto/${idProducto}/categorias`, {
          method: 'GET',
          headers: {}
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener categorias.')
        }

        const data = await response.json()

        this.listCategoriasProducto = data.productoCategorias
      } catch (error) {
        throw new Error(`Error al obtener las categorias: ${error}`)
      }
    },
    async GetCategoriasJuego(idProducto: number) {
      try {
        const response = await fetch(`${baseUrl}/Juego/${idProducto}/categorias`, {
          method: 'GET',
          headers: {}
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener categorias.')
        }

        const data = await response.json()

        this.listCategoriasJuego = data.juegoCategorias
      } catch (error) {
        throw new Error(`Error al obtener las categorias: ${error}`)
      }
    },
    async GetCategoriaSeccion(seccion: string) {
      try {
        const response = await fetch(`${baseUrl}/Categoria/seccion?nombre=${seccion}`, {
          method: 'GET',
          headers: {}
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener categorias.')
        }

        const data = await response.json()

        if (seccion === 'marketplace' || seccion === 'juegos') {
          this.listaCategoriaSeccion = data
        }
        if (seccion === 'plataforma') {
          this.listaCategoriaPlataforma = data
        }
      } catch (error) {
        throw new Error(`Error al obtner las categorias: ${error}`)
      }
    },
    async DeleteCategoriasProducto(idProducto: number, token: string, idsCategoria: number[]) {
      try {
        const response = await fetch(`${baseUrl}/Producto/${idProducto}/categorias`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(idsCategoria)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al eliminar las categorias.')
        }
      } catch (error) {
        throw new Error(`Error al eliminar las categorias: ${error}`)
      }
    },
    async AsignarCategoriaProducto(idProducto: number, token: string, idsCategoria: number[]) {
      try {
        const response = await fetch(`${baseUrl}/Producto/${idProducto}/añadir-categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(idsCategoria)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al asignar las categorias.')
        }
        console.log('Categorias agregadas correctamente')
      } catch (error) {
        throw new Error(`Error al asignar las categorias: ${error}`)
      }
    },
    async AsignarCategoriaJuego(idJuego: number, token: string, idsCategoria: number[]) {
      try {
        const response = await fetch(`${baseUrl}/Juego/${idJuego}/añadir-categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(idsCategoria)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al asignar las categorias.')
        }
        console.log('Categorias agregadas correctamente')
      } catch (error) {
        throw new Error(`Error al asignar las categorias: ${error}`)
      }
    }
  }
})
