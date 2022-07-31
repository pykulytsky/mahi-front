import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import ResetPassword from "../views/auth/ResetPassword.vue"
import Project from "../views/tasks/Project.vue"
import Tags from "../views/tasks/Tags.vue"
import Today from "../views/tasks/Today.vue"
import Calendar from "../views/tasks/Calendar.vue"
import AppHome from "../views/AppHome.vue"
import Timeline from "../views/Timeline.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPassword,
      meta: { requiresAuth: false }
    },
    {
      path: '/app',
      component: AppHome,
      name: "app-home",
      meta: { requiresAuth: true }
    },
    {
      path: '/app/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },

    {
      path: '/app/project/:id',
      component: Project,
      name: 'project',
      meta: { requiresAuth: true }
    },
    {
      path: '/app/tags',
      component: Tags,
      name: 'tags',
      meta: { requiresAuth: true }
    },
    {
      path: '/app/today',
      component: Today,
      name: 'today',
      meta: { requiresAuth: true }
    },
    {
      path: '/app/calendar',
      component: Calendar,
      name: 'calendar',
      meta: { requiresAuth: true }
    },
    {
      path: "/app/timeline",
      component: Timeline,
      name: "timeline",
      meta: { requiresAuth: true}
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: false }
    }
  ]
})




export default router
