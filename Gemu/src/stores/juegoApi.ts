import { defineStore } from 'pinia'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl

interface Juego {
  idJuego: number
  titulo: string
  descripcion: string
  precio: number
  precioFinal: number
  plataforma: string
  descuento: number
  fecha: string
  codigoJuego: string
  calificacionPromedio: number
}
export const JuegoApi = defineStore('juego', {
  state: () => ({
    juego: null as Juego | null,

    JuegosCategoriaPaginado: [] as any[],
    JuegosGratisPaginado: [] as any[],
    JuegosOfertasPaginado: [] as any[],
    JuegosBaratosPaginado: [] as any[],
    JuegosPaginados: [] as any[],

    currentPageCategoria: 1 as number,
    currentPageGratis: 1 as number,
    currentPageOfertas: 1 as number,
    currentPageBaratos: 1 as number,
    currentPagePaginados: 1 as number,

    hasMoreCategoria: true,
    hasMoreGratis: true,
    hasMoreBaratos: true,
    hasMoreOfertas: true,
    hasMorePaginados: true,

    pageSize: 5,
    loading: false,
    loadingPaginados: false,
    precioBarato: 15
  }),

  actions: {
    async GetJuego(idJuego: number) {
      try {
        const response = await fetch(`${baseUrl}/Juego/${idJuego}`, {
          method: 'GET',
          headers: {}
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
    async GetJuegosBaratosPaginados() {
      if (this.loading) return

      this.loading = true
      try {
        const queryParams = new URLSearchParams({
          pageNumber: this.currentPageBaratos.toString(),
          pageSize: this.pageSize.toString(),
          precioBarato: this.precioBarato.toString()
        })

        const response = await fetch(
          `${baseUrl}/Juego/paginados/baratos?${queryParams.toString()}`,
          {
            method: 'GET',
            headers: {}
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          console.log('Error Response Text:', errorText)
          throw new Error('Error al obtener los juegos baratos.')
        }

        const data = await response.json()

        if (data.length < this.pageSize) {
          this.hasMoreBaratos = false
        }

        this.JuegosBaratosPaginado = [...this.JuegosBaratosPaginado, ...data]
        this.currentPageBaratos += 1
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async GetJuegosCategoriaPaginados(categoriaIds: number[]) {
      if (this.loading) return

      this.loading = true
      try {
        const queryParams = new URLSearchParams({
          pageNumber: this.currentPageCategoria.toString(),
          pageSize: this.pageSize.toString()
        })

        categoriaIds.forEach((id) => queryParams.append('categoriaIds', id.toString()))

        const response = await fetch(
          `${baseUrl}/Juego/paginados/categorias?${queryParams.toString()}`,
          {
            method: 'GET',
            headers: {}
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          console.log('Error Response Text:', errorText)
          throw new Error('Error al obtener los juegos.')
        }

        const data = await response.json()

        if (data.length < this.pageSize) {
          this.hasMoreCategoria = false
        }

        this.JuegosCategoriaPaginado = [...this.JuegosCategoriaPaginado, ...data]
        this.currentPageCategoria += 1
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async GetJuegosOfertasPaginados() {
      if (this.loading) return

      this.loading = true
      try {
        const queryParams = new URLSearchParams({
          pageNumber: this.currentPageOfertas.toString(),
          pageSize: this.pageSize.toString()
        })

        const response = await fetch(
          `${baseUrl}/Juego/paginados/ofertas?${queryParams.toString()}`,
          {
            method: 'GET',
            headers: {}
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          console.log('Error Response Text:', errorText)
          throw new Error('Error al obtener los juegos con ofertas.')
        }

        const data = await response.json()

        if (data.length < this.pageSize) {
          this.hasMoreOfertas = false
        }

        this.JuegosOfertasPaginado = [...this.JuegosOfertasPaginado, ...data]
        this.currentPageOfertas += 1
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async GetJuegosGratisPaginados() {
      if (this.loading) return

      this.loading = true
      try {
        const queryParams = new URLSearchParams({
          pageNumber: this.currentPageGratis.toString(),
          pageSize: this.pageSize.toString()
        })

        const response = await fetch(
          `${baseUrl}/Juego/paginados/gratis?${queryParams.toString()}`,
          {
            method: 'GET',
            headers: {}
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          console.log('Error Response Text:', errorText)
          throw new Error('Error al obtener los juegos.')
        }

        const data = await response.json()

        if (data.length < this.pageSize) {
          this.hasMoreGratis = false
        }

        this.JuegosGratisPaginado = [...this.JuegosGratisPaginado, ...data]
        this.currentPageGratis += 1
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async GetJuegosPaginados() {
      if (this.loadingPaginados) return

      this.loadingPaginados = true
      try {
        const queryParams = new URLSearchParams({
          pageNumber: this.currentPagePaginados.toString(),
          pageSize: this.pageSize.toString()
        })

        const response = await fetch(`${baseUrl}/Juego/paginados?${queryParams.toString()}`, {
          method: 'GET',
          headers: {}
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.log('Error Response Text:', errorText)
          throw new Error('Error al obtener los juegos.')
        }

        const data = await response.json()

        if (data.length < this.pageSize) {
          this.hasMorePaginados = false
        }

        this.JuegosPaginados = [...this.JuegosPaginados, ...data]
        this.currentPagePaginados += 1
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.loadingPaginados = false
      }
    },
    async CrearDatosJuego(datos: any, token: string) {
      try {
        const newJuego = {
          titulo: datos.titulo,
          descripcion: datos.descripcion,
          precio: datos.precio,
          descuento: datos.descuento,
          plataforma: datos.plataforma
        }

        const response = await fetch(`${baseUrl}/Juego/crear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newJuego)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al crear el juego.')
        }
        const data = await response.json()

        this.juego = data
        console.log('Juego creados correctamente')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async UpdateDatosJuego(datos: any, token: string) {
      try {
        const newJuego = {
          idJuego: datos.idJuego,
          titulo: datos.titulo,
          descripcion: datos.descripcion,
          precio: datos.precio,
          descuento: datos.descuento,
          plataforma: datos.plataforma
        }

        const response = await fetch(`${baseUrl}/Juego/${datos.idJuego}/datos `, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newJuego)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al actualizar los datos del juego.')
        }

        console.log('Datos del juego actualizados correctamente')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async EliminarJuego(idJuego: number, token: string) {
      try {
        const response = await fetch(`${baseUrl}/Juego/${idJuego} `, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(idJuego)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al eliminar el juego.')
        }

        console.log('se elimino el juego')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    resetCurrentPageOfertas() {
      this.currentPageOfertas = 1
      this.JuegosOfertasPaginado = []
      this.hasMoreOfertas = true
    },
    resetCurrentPageCategoria() {
      this.currentPageCategoria = 1
      this.JuegosCategoriaPaginado = []
      this.hasMoreCategoria = true
    },
    resetCurrentPageGratis() {
      this.currentPageGratis = 1
      this.JuegosGratisPaginado = []
      this.hasMoreGratis = true
    },
    resetCurrentPageBarato() {
      this.currentPageBaratos = 1
      this.JuegosBaratosPaginado = []
      this.hasMoreBaratos = true
    }
  }
})
