import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const ProductoApi = defineStore('producto', {
  state: () => ({
    listaImagenes: [] as any[],
    idProducto: null as number | null
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
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async ImagenesJuego(idJuego: number, imagenes: string[]) {
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
          throw new Error(errorData.message || 'error al aginar las imagenes.')
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
        console.error('Error al guardar las imágenes:', error)
        throw error
      }
    }
  }
})
