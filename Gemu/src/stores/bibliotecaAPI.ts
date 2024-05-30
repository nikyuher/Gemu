import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const BibliotecaApi = defineStore('biblioteca', {
  state: () => ({
    listabiblioteca: [] as any[]
  }),

  actions: {
    async historialBiblioteca(idUsuario: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Biblioteca/usuario?id=${idUsuario}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener el historial.')
        }

        const data = await response.json()

        this.listabiblioteca = [data]
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async AñadirProductoBiblioteca(idUsuario: number, idProdcuto: number[]) {
      try {
        const token = usarioAPi.getToken()

        const idCarrito = usarioAPi.$state.usuarioId?.idBiblioteca

        const response = await fetch(
          `${baseUrl}/Biblioteca/${idCarrito}/usuario/${idUsuario}/añadir-producto`,
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
          throw new Error(errorData.message || 'error al comprar el producto.')
        }

        console.log('Comprado exitosamente')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async AñadirJuegosBiblioteca(idUsuario: number, idJuego: number[]) {
      try {
        const token = usarioAPi.getToken()

        const idCarrito = usarioAPi.$state.usuarioId?.idBiblioteca

        const response = await fetch(
          `${baseUrl}/Biblioteca/${idCarrito}/usuario/${idUsuario}/añadir-juego`,
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
          throw new Error(errorData.message || 'error al comprar el producto.')
        }

        console.log('Comprado exitosamente')
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
})
