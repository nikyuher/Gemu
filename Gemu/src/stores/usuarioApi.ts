import { defineStore } from 'pinia'
import { TokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'
import urlStore from '@/stores/baseUrl'

const tokenStore = TokenStore()
const router = useRouter()
const baseUrl: string = urlStore.baseUrl

interface Usuario {
  idUsuario: number
  idRol: number
  rol: string
  fotoPerfil: string
  nombre: string
  correo: string
  direccion: string
  codigoPostal: number
  saldoActual: number
}

export const UsuarioApi = defineStore({
  id: 'usuario',

  state: () => ({
    usuarioId: null as Usuario | null
  }),

  actions: {
    async loginUsuario(login: any) {
      try {
        const response = await fetch(`${baseUrl}/Usuario/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(login)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Error al iniciar sesión.')
        }

        // Procesa la respuesta
        const data = await response.json()
        const token = data.token

        // Guarda el token usando `TokenStore`
        tokenStore.setToken(token)
      } catch (error) {
        console.error('Error al obtener la obra:', error)
        throw error
      }
    }
  }
})
