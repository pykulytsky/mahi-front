import { defineStore } from "pinia";
import http from "../api/axios";
import { h } from "vue";
import { NAvatar, NText, NIcon } from "naive-ui";
import {ChartLine, Settings} from "@vicons/tabler"
import { LogOutOutline } from "@vicons/ionicons5"

function renderCustomHeader() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;",
    },
    [
      h(NAvatar, {
        round: true,
        style: "margin-right: 12px;",
        src: new URL('../assets/avatars/66.svg', import.meta.url).href,
      }),
      h("div", null, [
        h("div", null, [
          h(
            NText,
            { depth: 2 },
            { default: () => "Oleh Pykulytsky" }
          ),
        ]),
        h("div", { style: "font-size: 12px;" }, [
          h(NText, { depth: 3 }, { default: () => "pykulytsky@gmail.com" }),
        ]),
      ]),
    ]
  );
}

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    _user: null,
    _token: null,
    _userDropdownMenuOptions: [
          {
            key: "header",
            type: "render",
            render: renderCustomHeader,
          },
          {
            key: "header-divider",
            type: "divider",
          },
          {
            label: "Timeline",
            key: "timeline",
            icon: renderIcon(ChartLine)
          },
          {
            label: "Settings",
            key: "settings",
            icon: renderIcon(Settings)
          },
          {
            label: "Log out",
            key: "logout",
            icon: renderIcon(LogOutOutline)
          },
        ],
  }),
  getters: {
    isAuthenticated: (state) => {
      if (state._user == null) {
        return false;
      }
      return true;
    },
    user: (state) => state._user,
    token: (state) => state._token,
    userDropdownMenuOptions: (state) => state._userDropdownMenuOptions,
  },
  actions: {
    setUser(userData) {
      this._user = userData;
    },
    setToken(token) {
      this._token = token;
      localStorage.setItem("token", token);
    },
    signIn(email, password) {
      let formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      http
        .post("/access-token", formData, {
          "Content-Type": "application/x-www-form-urlencoded",
        })
        .then((response) => {
          this.setToken(response.data.access_token);
          this.loadCurrentUser();
        });
    },
    loadCurrentUser() {
      http.get("/users/me/").then((userData) => {
        this.setUser(userData.data);
      });
    },
  },
});
