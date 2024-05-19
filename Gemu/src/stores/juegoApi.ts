import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

interface Juego {
  idJuego: number
  titulo: string
  descripcion: string
  precio: number
  descuento: number
  plataforma: string
}

export const JuegoApi = defineStore('juego', {
  state: () => ({
    juego: null as Juego | null
  }),

  actions: {
    async GetJuego(idJuego: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Juego/${idJuego}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener el juego.')
        }

        const data = await response.json()

        this.juego = data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async CrearProducto(producto: any) {
      try {
        const token = usarioAPi.getToken()

        const newProducto = {
          nombre: producto.nombre,
          precio: producto.precio,
          descripcion: producto.descripcion,
          estado: producto.estado,
          cantidad: producto.cantidad
        }

        const response = await fetch(`${baseUrl}/Producto/crear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newProducto)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al crear el producto.')
        }

        const data = await response.json()

        this.juego = data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async UpdateDatosProducto(datos: any) {
      try {
        const token = usarioAPi.getToken()

        const newProducto = {
          idProducto: datos.idProducto,
          nombre: datos.nombre,
          precio: datos.precio,
          descripcion: datos.descripcion,
          estado: datos.estado,
          cantidad: datos.cantidad
        }

        const response = await fetch(`${baseUrl}/Producto/${datos.idProducto}/datos `, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newProducto)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al actualizar los producto del producto.')
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async EliminarProducto(idProducto: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Producto/${idProducto} `, {
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

        console.log('se elimino el producto')
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
})
