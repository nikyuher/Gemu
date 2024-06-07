import { reactive } from 'vue'

interface UrlState {
  baseUrl: string
}

const state: UrlState = reactive({
  baseUrl: 'http://a1940c6436b7d4f71baeb21b81461958-2062407066.us-east-1.elb.amazonaws.com'
})

export default state
