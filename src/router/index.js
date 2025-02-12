import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CyberWar from '../views/projects/CyberWar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects/cyberwar',
      name: 'cyberwar',
      component: CyberWar,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" }; // Smooth scroll only for anchors
    }
    return { top: 0 }; // Instant scroll to top when switching pages
  }
})

export default router
