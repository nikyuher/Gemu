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
      path: '/registrarse',
      name: 'registrarse',
      component: () => import('../views/RegistrarseView.vue')
    },
    {
      path: '/iniciarSesion',
      name: 'iniciarSesion',
      component: () => import('../views/IniciarSesionView.vue')
    },
    {
      path: '/ofertas',
      name: 'ofertas',
      component: () => import('../views/OfertasView.vue')
    },
    {
      path: '/juegos/:tipo',
      name: 'juegosTipo',
      component: () => import('../views/JuegosTipoView.vue')
    },
    {
      path: '/:producto/:id',
      name: 'producto',
      component: () => import('../views/ProductoView.vue')
    },
    {
      path: '/user-menu/:opcion?',
      name: 'user-menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/carritoCompra',
      name: 'carrito-Compra',
      component: () => import('../views/CarritoCompra.vue')
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: () => import('../views/MarketplaceView.vue')
    },
    {
      path: '/filtro/:opcion/:categoria/:id?',
      name: 'filtro',
      component: () => import('../views/FiltroView.vue')
    },
    {
      path: '/resenas',
      name: 'resenas',
      component: () => import('../views/ReseñasJuegoView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/ErrorUrlView.vue')
    }
  ]
})

export default router
