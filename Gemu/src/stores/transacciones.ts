import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

interface Transaccion {
  idUsuario: number
  total: number
  cantidad: number
  nota: string
  fecha: Date
}

export const transaccionApi = defineStore('transaccion', {
  state: () => ({
    transaccion: JSON.parse(localStorage.getItem('usuarioData') || 'null') as Transaccion | null
  }),

  actions: {
    async añadirFondos(Transaccion: any) {
      try {
        const token = usarioAPi.getToken()

        const fechaActual = new Date().toISOString()

        const transaccion = {
          idUsuario: Transaccion.idUsuario,
          total: 0,
          cantidad: Transaccion.cantidad,
          nota: Transaccion.nota,
          fecha: fechaActual
        }

        const response = await fetch(`${baseUrl}/Transaccion/anadir-fondos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(transaccion)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al añadir fondos response.')
        }
      } catch (error) {
        console.error('Error con la api:', error)
        throw error
      }
    },
    async restarFondos(Transaccion: any) {
      try {
        const token = usarioAPi.getToken()

        const fechaActual = new Date().toISOString()

        const transaccion = {
          idUsuario: Transaccion.idUsuario,
          total: 0,
          cantidad: Transaccion.cantidad,
          nota: Transaccion.nota,
          fecha: fechaActual
        }

        const response = await fetch(`${baseUrl}/Transaccion/restar-fondos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(transaccion)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'error al restar fondos response.')
        }
      } catch (error) {
        console.error('Error con la api:', error)
        throw error
      }
    }
  }
})
