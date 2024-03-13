import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: 'jobs',
          name: 'jobs',
          component: () => import('../views/JobsView.vue')
          //children: []
        },
        {
          path: 'jobs/:id',
          name: 'id',
          component: () => import('../views/PostDetailsView.vue')
        },
        {
          path: 'post-job',
          name: 'post-job',
          component: () => import('../views/PostJobView.vue')
        }
      ]
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignIn.vue')
    }
  ]
})

export default router
