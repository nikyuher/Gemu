import { defineStore } from 'pinia'
import { UsuarioApi } from '@/stores/usuarioApi'
import urlStore from '@/stores/baseUrl'

const baseUrl: string = urlStore.baseUrl
const usarioAPi = UsuarioApi()

// interface Transaccion {
//   idUsuario: number
//   total: number
//   cantidad: number
//   nota: string
//   fecha: Date
// }

export const transaccionApi = defineStore('transaccion', {
  state: () => ({
    listaTransacciones: [] as any[]
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

        const nuevoSaldo = usarioAPi.$state.saldoActual + Transaccion.cantidad
        usarioAPi.actualizarSaldoActual(nuevoSaldo)
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

        const nuevoSaldo =
          usarioAPi.$state.saldoActual !== null
            ? usarioAPi.$state.saldoActual - Transaccion.cantidad
            : null
        if (nuevoSaldo !== null) {
          usarioAPi.actualizarSaldoActual(nuevoSaldo)
        } else {
          throw new Error('Ha superado el saldo de su cuenta')
        }
      } catch (error) {
        console.error('Error con la api:', error)
        throw error
      }
    },
    async historialTransacciones(idUsuario: number) {
      try {
        const token = usarioAPi.getToken()

        const response = await fetch(`${baseUrl}/Transaccion/usuario?idUsuario=${idUsuario}`, {
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

        this.listaTransacciones = data
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
})
