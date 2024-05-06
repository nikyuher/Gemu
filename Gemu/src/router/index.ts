import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/ErrorUrlView.vue'), 
    },
    {
      path: '/registrarse',
      name: 'registrarse',
      component: () => import('../views/RegistrarseView.vue')
    },
    {
      path: '/iniciarSesion',
      name: 'iniciarSesion',
      component: () => import('../views/IniciarSesionView.vue')
    }
  ]
})

export default router
