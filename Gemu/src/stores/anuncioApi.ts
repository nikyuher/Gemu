import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

export const AnuncioApi = defineStore('anuncio', {
  state: () => ({
    listaAnuncios: [] as any[]
  }),

  actions: {
    async crearAnuncio(idUsuario: number, idProducto: number) {
      try {
        const token = usarioAPi.getToken()

        const newAnuncio = {
          idUsuario: idUsuario,
          idProducto: idProducto
        }

        const response = await fetch(`${baseUrl}/Anuncio/crear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newAnuncio)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al crear el anuncio.')
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async GetAnunciosUsuario(idUsuario: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Anuncio/usuario?id=${idUsuario}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener los anuncios.')
        }

        const data = await response.json()

        this.listaAnuncios = data
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
})
