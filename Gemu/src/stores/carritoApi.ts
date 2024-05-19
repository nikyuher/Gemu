import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const CarritoApi = defineStore('carrito', {
  state: () => ({
    listaCarrito: [] as any[],
    CantidadCarrito: 0 as number,
    TotalPrecio: 0 as number
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
    async AñadirJuego(idUsuario: number, idJuego: number) {
      try {
        const token = usarioAPi.getToken()

        const idCarrito = usarioAPi.$state.usuarioId?.idCarrito

        const response = await fetch(
          `${baseUrl}/Carrito/${idCarrito}/usuario/${idUsuario}/añadir-juego`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(idJuego)
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al añadir el juego.')
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
    },
    async DeleteJuegoCarrito(idProducto: number, idUsuario: number) {
      try {
        const token = usarioAPi.getToken()
        const idCarrito = usarioAPi.$state.usuarioId?.idCarrito
        const response = await fetch(`${baseUrl}/Carrito/${idCarrito}/usuario/${idUsuario}/juego`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(idProducto)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al eliminar el producto.')
        }
      } catch (error) {
        throw new Error(`Error al eliminar el producto: ${error}`)
      }
    },
    async DeleteProductosCompra(idsProducto: number[], idUsuario: number) {
      try {
        const token = usarioAPi.getToken()
        const idCarrito = usarioAPi.$state.usuarioId?.idCarrito
        for (const idProducto of idsProducto) {
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
        }
      } catch (error) {
        throw new Error(`Error al eliminar el producto: ${error}`)
      }
    },
    async DeleteJuegosCompra(idsJuego: number[], idUsuario: number) {
      try {
        const token = usarioAPi.getToken()
        const idCarrito = usarioAPi.$state.usuarioId?.idCarrito
        for (const idJuego of idsJuego) {
          const response = await fetch(
            `${baseUrl}/Carrito/${idCarrito}/usuario/${idUsuario}/juego`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(idJuego)
            }
          )
          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'error al eliminar el juego.')
          }
        }
      } catch (error) {
        throw new Error(`Error al eliminar el juego: ${error}`)
      }
    },
    getCatidadCarrito(): number | 0 {
      return this.CantidadCarrito
    },
    getTotalPrecio(): number | 0 {
      return this.TotalPrecio
    },
    setCatidadCarrito(cantidad: number) {
      this.CantidadCarrito = cantidad
    },
    setTotalPrecio(total: number) {
      this.TotalPrecio = total
    }
  }
})
