import { defineStore } from 'pinia'
import http from "../api/axios"


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    _user: null,
    _token: null
  }),
  getters: {
    isAuthenticated: (state) => {
      if (state._user == null) {
        return false
      }
      return true
    },
    user: (state) => state._user,
    token: (state) => state._token
  },
  actions: {
    setUser(userData) {
      this._user = userData
    },
    setToken(token) {
      this._token = token
      localStorage.setItem("token", token)
    },
    signIn(email, password) {
      let formData = new FormData()
      formData.append("username", email)
      formData.append("password", password)

      http.post("/access-token", formData, {
        "Content-Type": "application/x-www-form-urlencoded"
      })
      .then(response => {
        this.setToken(response.data.access_token)
        http.get("/users/me/")
        .then(userData => {
          this.setUser(userData.data)
        })
      })
    }
  }
})
