import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CyberWar from '../views/projects/CyberWar.vue'
// Lazy-load the C++ IDE view
const CppIDE = () => import('../views/CppIDE.vue')
const ResumeView = () => import('../views/ResumeView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cpp-ide',
      name: 'cpp-ide',
      component: CppIDE,
    },
    {
      path: '/projects/cyberwar',
      name: 'cyberwar',
      component: CyberWar,
    },
    {
      path: '/projects/two-worlds',
      name: 'two-worlds',
      component: () => import('../views/projects/TwoWorlds.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/blog/optimizing-game-performance',
      name: 'optimizing-game-performance',
      component: () => import('../views/blog/OptimizingGamePerformance.vue'),
    },
    {
      path: '/blog/unreal-engine-5',
      name: 'unreal-engine-5',
      component: () => import('../views/blog/UnrealEngine5.vue'),
    },
    {
      path: '/blog/character-animations',
      name: 'character-animations',
      component: () => import('../views/blog/CharacterAnimations.vue'),
    },
    {
      path: '/blog/xbox-development',
      name: 'xbox-development',
      component: () => import('../views/blog/XboxDevelopment.vue'),
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumeView,
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
