import { defineStore } from 'pinia'

export const TokenStore = defineStore({
  id: 'token',
  state: () => ({
    token: localStorage.getItem('jwtToken') as string | null
  }),
  actions: {
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
  }
})
