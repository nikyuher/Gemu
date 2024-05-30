import { reactive } from 'vue'

interface UrlState {
  baseUrl: string
}

const state: UrlState = reactive({
  baseUrl: 'https://localhost:7240'
})

export default state
