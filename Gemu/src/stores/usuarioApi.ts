import { defineStore } from 'pinia'
import { TokenStore } from '@/stores/token'
import { jwtDecode } from 'jwt-decode'
import type { Router } from 'vue-router'
import urlStore from '@/stores/baseUrl'

const tokenStore = TokenStore()
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

interface JwtPayloadConRol {
  role: string
}

export const UsuarioApi = defineStore('usuario', {
  state: () => ({
    usuarioId: null as Usuario | null
  }),

  actions: {
    async loginUsuario(login: any, router: Router) {
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

        const data = await response.json()
        const token = data.token

        // Guarda el token usando `TokenStore`
        tokenStore.setToken(token)

        // Decodifica el token para obtener el payload
        const decoded = jwtDecode<JwtPayloadConRol>(token)

        if (decoded.role === 'Admin') {
          router.push('/user-menu')
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        throw error
      }
    },
    async registrarse(User: any, router: Router) {
      try {
        const response = await fetch(`${baseUrl}/Usuario/registrar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(User)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al Crear al usuario.')
        }

        const data = await response.json()
        const token = data.token

        tokenStore.setToken(token)

        const decoded = jwtDecode<JwtPayloadConRol>(token)

        if (decoded.role === 'Admin') {
          router.push('/user-menu')
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
})
