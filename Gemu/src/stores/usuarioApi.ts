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
  idCarrito: number
  idBiblioteca: number
}

interface JwtPayloadConRol {
  role: string
  nameid: number
}

export const UsuarioApi = defineStore('usuario', {
  state: () => ({
    token: localStorage.getItem('jwtToken') as string | null,
    usuarioId: JSON.parse(localStorage.getItem('usuarioData') || 'null') as Usuario | null,
    listaUsuarios: [] as Usuario[],
    saldoActual: 0 as number
  }),

  actions: {
    async getAllUsuario() {
      try {
        const token = this.getToken()

        const response = await fetch(`${baseUrl}/Usuario`, {
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

        this.listaUsuarios = data
      } catch (error) {
        console.error('Error al obtener los usuarios:', error)
        throw error
      }
    },
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
          saldoActual: data.saldoActual,
          idCarrito: data.idCarrito,
          idBiblioteca: data.idBiblioteca
        }
        this.actualizarSaldoActual(data.saldoActual)
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
    async updateDireccion(DatosUser: any) {
      try {
        const token = this.getToken()

        const newDatos = {
          idUsuario: DatosUser.idUsuario,
          direccion: DatosUser.direccion,
          codigoPostal: DatosUser.codigoPostal
        }

        const usuarioActual = this.usuarioId
        if (!usuarioActual) {
          throw new Error('No se encontró ningún usuario almacenado en el localStorage.')
        }
        usuarioActual.direccion = DatosUser.direccion
        usuarioActual.codigoPostal = DatosUser.codigoPostal

        const response = await fetch(`${baseUrl}/Usuario/${DatosUser.idUsuario}/direccion`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newDatos)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al actualizar datos.')
        }

        this.setUsuarioId(usuarioActual)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async updateRol(DatosUser: any) {
      try {
        const token = this.getToken()

        const newDatos = {
          idUsuario: DatosUser.idUsuario,
          idRol: DatosUser.idRol
        }

        const response = await fetch(`${baseUrl}/Usuario/${DatosUser.idUsuario}/rol`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newDatos)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al actualizar el rol.')
        }
      } catch (error) {
        console.log('error al actualizar el rol. ' + error)
        throw error
      }
    },
    async updateDatos(DatosUser: any) {
      try {
        const token = this.getToken()

        const newDatos = {
          idUsuario: DatosUser.idUsuario,
          nombre: DatosUser.nombre,
          correo: DatosUser.correo
        }

        const usuarioActual = this.usuarioId
        if (!usuarioActual) {
          throw new Error('No se encontró ningún usuario almacenado en el localStorage.')
        }
        usuarioActual.nombre = DatosUser.nombre
        usuarioActual.correo = DatosUser.correo

        const response = await fetch(`${baseUrl}/Usuario/${DatosUser.idUsuario}/datos`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newDatos)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al actualizar datos.')
        }

        this.setUsuarioId(usuarioActual)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async EliminarUsuario(idUsuario: number) {
      try {
        const token = this.getToken()

        const response = await fetch(`${baseUrl}/Usuario?id=${idUsuario} `, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(idUsuario)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al eliminar el usuario.')
        }

        console.log('se elimino el usuario')
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    setUsuarioId(usuario: Usuario) {
      this.usuarioId = usuario
      localStorage.setItem('usuarioData', JSON.stringify(usuario))
    },
    actualizarSaldoActual(nuevoSaldo: number) {
      this.saldoActual = nuevoSaldo
    },
    getSaldoActual(): number | 0 {
      return this.saldoActual
    },
    removeUsuarioid() {
      this.usuarioId = null
      localStorage.removeItem('usuarioData')
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
    isAuthenticated: (state) => state.usuarioId !== null,
    isAdmin: (state) => {
      if (!state.token) {
        return false
      }
      try {
        const decoded = jwtDecode<JwtPayloadConRol>(state.token)

        return decoded.role === 'Admin'
      } catch (error) {
        return false
      }
    }
  }
})
