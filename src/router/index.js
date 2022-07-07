import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import ResetPassword from "../views/auth/ResetPassword.vue"
import TodoList from "../views/todo/TodoList.vue"

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
      path: '/todo/:id',
      component: TodoList,
      name: 'todolist'
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
