import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import ResetPassword from "../views/auth/ResetPassword.vue"
import Project from "../views/tasks/Project.vue"
import Tags from "../views/tasks/Tags.vue"
import Today from "../views/tasks/Today.vue"
import Calendar from "../views/tasks/Calendar.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPassword
    },
    {
      path: '/project/:id',
      component: Project,
      name: 'project'
    },
    {
      path: '/tags',
      component: Tags,
      name: 'tags'
    },
    {
      path: '/today',
      component: Today,
      name: 'today'
    },
    {
      path: '/calendar',
      component: Calendar,
      name: 'calendar'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})




export default router
