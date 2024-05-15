import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

interface Producto {
  idProducto: number
  nombre: string
  precio: number
  descripcion: string
  estado: string
  cantidad: number
}

export const ProductoApi = defineStore('producto', {
  state: () => ({
    producto: null as Producto | null
  }),

  actions: {
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

        const response = await fetch(`${baseUrl}/Producto/crear `, {
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

        this.producto = data
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
