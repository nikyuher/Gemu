import { defineStore } from 'pinia'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl

export const CarritoApi = defineStore('carrito', {
  state: () => ({
    listaCarrito: [] as any[],
    CantidadCarrito: 0 as number,
    idsProducto: [] as number[],
    idsJuego: [] as number[],
    TotalPrecio: 0 as number
  }),

  actions: {
    async ListaCarrito(datosUser: any) {
      try {
        const token = datosUser.token
        const idUsuario = datosUser.idUsuario

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

        const cantidadProductos = data.carritoProductos?.length || 0
        const cantidadJuegos = data.carritoJuegos?.length || 0

        const precioJuego = data.carritoJuegos.reduce(
          (sum: number, juego: any) => sum + juego.juego.precio,
          0
        )
        const precioProducto = data.carritoProductos.reduce(
          (sum: number, producto: any) => sum + producto.producto.precio,
          0
        )

        this.setCatidadCarrito(cantidadProductos + cantidadJuegos)
        this.setTotalPrecio(precioJuego + precioProducto)

        this.listaCarrito = [data]
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async AñadirProducto(idProdcuto: number, datosUser: any) {
      try {
        const token = datosUser.token

        const idCarrito = datosUser.idCarrito
        const idUsuario = datosUser.idUsuario

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
    async AñadirJuego(idJuego: number, datosUser: any) {
      try {
        const token = datosUser.token

        const idCarrito = datosUser.idCarrito
        const idUsuario = datosUser.idUsuario

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
    async DeleteProductoCarrito(idProducto: number, datosUser: any) {
      try {
        const token = datosUser.token

        const idCarrito = datosUser.idCarrito
        const idUsuario = datosUser.idUsuario
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
    async DeleteJuegoCarrito(idProducto: number, datosUser: any) {
      try {
        const token = datosUser.token

        const idCarrito = datosUser.idCarrito
        const idUsuario = datosUser.idUsuario
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
    async DeleteProductosCompra(idsProducto: number[], datosUser: any) {
      try {
        const token = datosUser.token

        const idCarrito = datosUser.idCarrito
        const idUsuario = datosUser.idUsuario
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
    async DeleteJuegosCompra(idsJuego: number[], datosUser: any) {
      try {
        const token = datosUser.token

        const idCarrito = datosUser.idCarrito
        const idUsuario = datosUser.idUsuario
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
    getIdsJuego(): number[] | [] {
      return this.idsJuego
    },
    getIdsProducto(): number[] | [] {
      return this.idsProducto
    },
    setIdsJuego(lista: any[]) {
      this.idsJuego = lista
    },
    setIdsProducto(lista: any[]) {
      this.idsProducto = lista
    },
    setCatidadCarrito(cantidad: number) {
      this.CantidadCarrito = cantidad
    },
    setTotalPrecio(total: number) {
      this.TotalPrecio = total
    }
  }
})
