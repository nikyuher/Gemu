import { defineStore } from 'pinia'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl

interface Producto {
  idProducto: number
  nombre: string
  precio: number
  descripcion: string
  estado: string
  cantidad: number
  calificacionPromedio: number
}

export const ProductoApi = defineStore('producto', {
  state: () => ({
    producto: null as Producto | null,
    productos: [] as any[],

    productosPaginados: [] as any[],
    productosCategoriaPaginados: [] as any[],

    currentPagePaginados: 1 as number,
    currentPageCategoria: 1 as number,

    hasMorePaginados: true,
    hasMoreCategoria: true,

    pageSize: 5,
    loading: false
  }),

  actions: {
    async AllProducts() {
      try {
        const response = await fetch(`${baseUrl}/Producto`, {
          method: 'GET',
          headers: {}
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al llamar a  los productos.')
        }
        const data = await response.json()

        this.productos = data
      } catch (error) {
        console.log(error)
      }
    },
    async GetProductoCategoriaPaginados(categoriaIds: number[]) {
      if (this.loading) return

      this.loading = true
      try {
        const queryParams = new URLSearchParams({
          pageNumber: this.currentPageCategoria.toString(),
          pageSize: this.pageSize.toString()
        })

        categoriaIds.forEach((id) => queryParams.append('categoriaIds', id.toString()))

        const response = await fetch(
          `${baseUrl}/Producto/paginados/categorias?${queryParams.toString()}`,
          {
            method: 'GET',
            headers: {}
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          console.log('Error Response Text:', errorText)
          throw new Error('Error al obtener los productos.')
        }

        const data = await response.json()

        if (data.length < this.pageSize) {
          this.hasMoreCategoria = false
        }

        this.productosCategoriaPaginados = [...this.productosCategoriaPaginados, ...data]
        this.currentPageCategoria += 1
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async GetProductosPaginados() {
      if (this.loading) return

      this.loading = true
      try {
        const queryParams = new URLSearchParams({
          pageNumber: this.currentPagePaginados.toString(),
          pageSize: this.pageSize.toString()
        })

        const response = await fetch(`${baseUrl}/Producto/paginados?${queryParams.toString()}`, {
          method: 'GET',
          headers: {}
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.log('Error Response Text:', errorText)
          throw new Error('Error al obtener los productos.')
        }

        const data = await response.json()

        if (data.length < this.pageSize) {
          this.hasMorePaginados = false
        }

        this.productosPaginados = [...this.productosPaginados, ...data]
        this.currentPagePaginados += 1
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async GetProducto(idProducto: number) {
      try {
        const response = await fetch(`${baseUrl}/Producto/${idProducto}`, {
          method: 'GET',
          headers: {}
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener el producto.')
        }

        const data = await response.json()

        this.producto = data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async CrearProducto(producto: any, token: string) {
      try {
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

        this.producto = data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async UpdateDatosProducto(datos: any, token: string) {
      try {
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
          throw new Error(errorData.message || 'error al actualizar los datos del producto.')
        }

        console.log('Datos del producto actualizados correctamente')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async EliminarProducto(idProducto: number, token: string) {
      try {
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
    },
    resetCurrentPageCategoria() {
      this.currentPageCategoria = 1
      this.productosCategoriaPaginados = []
      this.hasMoreCategoria = true
    },
    resetCurrentPagePaginados() {
      this.currentPagePaginados = 1
      this.productosPaginados = []
      this.hasMorePaginados = true
    }
  }
})
