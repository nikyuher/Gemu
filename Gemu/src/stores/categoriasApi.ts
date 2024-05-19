import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const CategoriaApi = defineStore('categoria', {
  state: () => ({
    listaCategoriaSeccion: [] as any[],
    listCategoriasProducto: [] as any[],
    listCategoriasJuego: [] as any[]
  }),

  actions: {
    async GetCategoriasProducto(idProducto: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Producto/${idProducto}/categorias`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener categorias.')
        }

        const data = await response.json()

        this.listCategoriasProducto = data
      } catch (error) {
        throw new Error(`Error al obtener las categorias: ${error}`)
      }
    },
    async GetCategoriasJuego(idProducto: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Juego/${idProducto}/categorias`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener categorias.')
        }

        const data = await response.json()

        this.listCategoriasJuego = data
      } catch (error) {
        throw new Error(`Error al obtener las categorias: ${error}`)
      }
    },
    async GetCategoriaSeccion(seccion: string) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Categoria/seccion?nombre=${seccion}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener categorias.')
        }

        const data = await response.json()

        this.listaCategoriaSeccion = data
      } catch (error) {
        throw new Error(`Error al obtner las categorias: ${error}`)
      }
    },
    async DeleteCategoriasProducto(idProducto: number, idsCategoria: number[]) {
      try {
        const token = usarioAPi.getToken()

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
    async AsignarCategoriaProducto(idProducto: number, idsCategoria: number[]) {
      try {
        const token = usarioAPi.getToken()

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
      } catch (error) {
        throw new Error(`Error al asignar las categorias: ${error}`)
      }
    }
  }
})
