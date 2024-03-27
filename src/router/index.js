import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PathNotFound from '@/components/PathNotFound.vue'
import CandidatesView from '../views/CandidatesView.vue'
import { auth } from '@/config/firebase'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass : "active",
  routes: [
    { path: '/:pathMatch(.*)*', component: PathNotFound },

    {
      path: '/',
      component: HomeView,
      children: []
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
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/UserProfileView.vue'),
      meta: { auth: true }
    },
    {
      path: '/candidates',
      name: 'candidates',
      component: CandidatesView
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('../views/JobsView.vue'),
      props: true
    },
    {
      path: '/jobs/:id',
      name: 'id',
      component: () => import('../views/PostDetailsView.vue')
    },
    {
      path: '/post-job',
      name: 'post-job',
      component: () => import('../views/PostJobView.vue'),
      meta: { auth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    const user = auth.currentUser
    if (user) {
      next()
    } else {
      next('/signin')
    }
  } else {
    
    next()
  }
})
export default router
