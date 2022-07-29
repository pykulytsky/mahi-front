import { defineStore } from 'pinia'
import { h } from "vue";
import { NIcon } from "naive-ui";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
}
export const useCommonStore = defineStore({
  id: 'common',
  state: () => ({
    _isLoading: false,
    _siderIsExpanded: false,
    _errorMessage: null,
    _currentTheme: null,
    _disableHeader: ['/login', '/register', '/reset-password'],
    _disableSidebar: ['/', '/login', '/register', '/reset-password'],
    _disableFooter: [''],
    _menuItems: [

    ]
  }),
  getters: {
    isLoading: (state) => state._isLoading,
    errorMessage: (state) => state._errorMessage,
    currentTheme: (state) => state._currentTheme,
    disableHeader: (state) => state._disableHeader,
    disableSidebar: (state) => state._disableSidebar,
    siderIsExpanded: (state) => state._siderIsExpanded
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
      this._siderIsExpanded = siderState
      localStorage.setItem("siderIsShown", siderState)
    },
    switchTheme() {
      if (this._currentTheme == 'light') {
        this.setTheme("dark")
      } else {
        this.setTheme("light")
      }
    }
  }
})
