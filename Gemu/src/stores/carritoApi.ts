import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const CarritoApi = defineStore('carrito', {
  state: () => ({
    listaCarrito: [] as any[]
  }),

  actions: {
    async ListaCarrito(idUsuario: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Carrito/usuario?id=${idUsuario}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener el carrito.')
        }

        const data = await response.json()

        this.listaCarrito = [data]
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async AñadirProducto(idUsuario: number, idProdcuto: number) {
      try {
        const token = usarioAPi.getToken()

        const idCarrito = usarioAPi.$state.usuarioId?.idCarrito

        const response = await fetch(
          `${baseUrl}/Carrito/${idCarrito}/usuario/${idUsuario}/añadir-producto`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(idProdcuto)
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al añadir el producto.')
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async DeleteProductoCarrito(idProducto: number, idUsuario: number) {
      try {
        const token = usarioAPi.getToken()
        const idCarrito = usarioAPi.$state.usuarioId?.idCarrito
        const response = await fetch(
          `${baseUrl}/Carrito/${idCarrito}/usuario/${idUsuario}/producto`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(idProducto)
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al eliminar el producto.')
        }
      } catch (error) {
        throw new Error(`Error al eliminar el producto: ${error}`)
      }
    }
  }
})
