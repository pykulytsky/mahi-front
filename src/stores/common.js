import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
  id: 'common',
  state: () => ({
    _isLoading: false,
    _siderIsShown: false,
    _errorMessage: null,
    _currentTheme: null,
    _disableHeader: ['/login', '/register', '/reset-password'],
    _disableSidebar: ['/', '/login', '/register', '/reset-password'],
    _disableFooter: ['']
  }),
  getters: {
    isLoading: (state) => state._isLoading,
    errorMessage: (state) => state._errorMessage,
    currentTheme: (state) => state._currentTheme,
    disableHeader: (state) => state._disableHeader,
    disableSidebar: (state) => state._disableSidebar,
    siderIsShown: (state) => state._siderIsShown
  },
  actions: {
    setLoading(currentState) {
      this._isLoading = currentState
    },
    setError(message) {
      this._errorMessage = message
    },
    setTheme(theme) {
      this._currentTheme = theme
      localStorage.setItem("theme", theme)
    },
    setSiderVisability(siderState) {
      this._siderIsShown = siderState
      localStorage.setItem("siderIsShown", siderState)
    }
  }
})
