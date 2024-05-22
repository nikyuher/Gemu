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

    currentPageCategoria: 1 as number,
    currentPageGratis: 1 as number,

    hasMoreCategoria: true,
    hasMoreGratis: true,

    pageSize: 5,
    loading: false
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
    resetCurrentPageCategoria() {
      this.currentPageCategoria = 1
      this.JuegosCategoriaPaginado = []
      this.hasMoreCategoria = true
    },

    resetCurrentPageGratis() {
      this.currentPageGratis = 1
      this.JuegosGratisPaginado = []
      this.hasMoreGratis = true
    }
  }
})
