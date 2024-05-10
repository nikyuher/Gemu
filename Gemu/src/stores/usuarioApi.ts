import { defineStore } from 'pinia'
import type { Router } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import urlStore from '@/stores/baseUrl'

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
  nameid: number
}

export const UsuarioApi = defineStore('usuario', {
  state: () => ({
    token: localStorage.getItem('jwtToken') as string | null,
    usuarioId: null as Usuario | null
  }),

  actions: {
    async getUsuarioId(idUsuario: number) {
      try {
        const token = this.getToken()

        const response = await fetch(`${baseUrl}/Usuario/${idUsuario}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al obtener al usuario.')
        }

        const data = await response.json()

        const usuario = {
          idUsuario: data.idUsuario,
          idRol: data.idRol,
          rol: data.rol,
          fotoPerfil: data.fotoPerfil,
          nombre: data.nombre,
          correo: data.correo,
          direccion: data.direccion,
          codigoPostal: data.codigoPostal,
          saldoActual: data.saldoActual
        }

        this.setUsuarioId(usuario)
      } catch (error) {
        throw new Error(`Error al obtner al usuario: ${error}`)
      }
    },
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

        this.setToken(token)

        // Decodifica el token para obtener el payload
        const decoded = jwtDecode<JwtPayloadConRol>(token)

        this.getUsuarioId(decoded.nameid)

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

        this.setToken(token)

        const decoded = jwtDecode<JwtPayloadConRol>(token)

        this.getUsuarioId(decoded.nameid)

        if (decoded.role === 'Admin') {
          router.push('/user-menu')
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    setUsuarioId(usuario: Usuario) {
      this.usuarioId = usuario
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('jwtToken', token)
    },

    getToken(): string | null {
      return this.token
    },
    removeToken() {
      this.token = null
      localStorage.removeItem('jwtToken')
    }
  },
  getters: {
    // Getter para verificar si un usuario está autenticado
    isAuthenticated: (state) => state.usuarioId !== null
  }
})
