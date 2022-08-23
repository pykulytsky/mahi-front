<script>
import { RouterView, useRoute, useRouter } from "vue-router";
import { ref, h, watch, computed, onMounted, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import {
  darkTheme,
  NConfigProvider,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutFooter,
  NText,
  NMenu,
  NAutoComplete,
  NPopover,
  NButton,
  NSwitch,
  NScrollbar,
  NGlobalStyle,
  NLayoutSider,
  NIcon,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  createDiscreteApi,
  NSpace,
  NAvatar,
  NDivider,
  NDropdown,
  NModal,
  lightTheme,
} from "naive-ui";
import {
  HomeOutline as HomeIcon,
  MenuOutline,
  Menu,
  SearchOutline,
  NotificationsOutline,
  PricetagOutline,
} from "@vicons/ionicons5";
import { useNativeNotifications } from "vue3-native-notification"
import { User as UserIcon, Sun } from "@vicons/tabler";
import { useCommonStore } from "./stores/common";
import { useTaskStore } from "./stores/task";
import { useAuthStore } from "./stores/auth";
import AppProvider from "./app.provider.vue";
import Settings from "./components/core/Settings.vue";
import ProjectCreateForm from "./components/tasks/ProjectCreateForm.vue";
import notificationSound from "./assets/notification.wav"
import {
  SearchIcon,
  HalfMoonIcon,
  SidebarCollapseIcon,
  SidebarExpandIcon,
} from "iconoir-vue";

const configProviderPropsRef = computed(() => ({
  theme: localStorage.getItem("theme") === "light" ? lightTheme : darkTheme,
}));

const { loadingBar, notification } = createDiscreteApi(
  ["loadingBar", "notification"],
  {
    configProviderProps: configProviderPropsRef,
  }
);

export default {
  components: {
    NConfigProvider,
    NLayoutContent,
    NLayout,
    NLayoutHeader,
    NLayoutFooter,
    NText,
    NMenu,
    NAutoComplete,
    NPopover,
    NButton,
    NSwitch,
    NScrollbar,
    NGlobalStyle,
    NLayoutSider,
    NIcon,
    NLoadingBarProvider,
    NMessageProvider,
    NNotificationProvider,
    AppProvider,
    RouterView,
    HomeIcon,
    menuFilled: Menu,
    MenuOutline,
    NSpace,
    NotificationsOutline,
    NAvatar,
    UserIcon,
    NDivider,
    Sun,
    NDropdown,
    NModal,
    Settings,
    ProjectCreateForm,
    SearchIcon,
    HalfMoonIcon,
    SidebarCollapseIcon,
    SidebarExpandIcon,
  },

  setup() {
    const nativeNotification = useNativeNotifications()
    const sound = new Audio(notificationSound)
    const route = useRoute();
    const path = computed(() => route.path);
    const common = useCommonStore();
    const auth = useAuthStore();
    const task = useTaskStore();
    const { isLoading, currentTheme } = storeToRefs(common);
    const { projects } = storeToRefs(task);
    const searchInputEnabled = ref(false);
    const searchInput = ref(null);
    const router = useRouter();
    const avatar = new URL("./assets/avatars/55.svg", import.meta.url).href;
    const showSettings = ref(false);
    const showNewProject = ref(false);

    const theme = ref(null);
    router.beforeEach(function (to, from, next) {
      if (!from || to.path !== from.path) {
        loadingBar.start();
      }
      next();
    });
    router.afterEach((to, from, failture) => {
      loadingBar.finish();
    });

    const isDarkTheme = ref(false);

    watch(projects, (value, oldValue) => {
      if (value !== null && value !== oldValue) {
        task.loadMenuProjects();
      }
    });
    onBeforeMount(() => {
      // auth.setToken(localStorage.getItem("token"))
      // auth.setExp(localStorage.getItem("exp"))
      auth.loadCurrentUser();
      task.fetchProjects();
      task.fetchTags();
    });

    onMounted(() => {
      const token = localStorage.getItem("token");
      const generalChanel = new EventSource(
        "http://localhost:8000/sse/general/" + token,
        { withCredentials: false }
      );
      generalChanel.addEventListener("new_message", function (event) {
        sound.play()
        notification.info({
          title: "General Message",
          content: event.data,
          duration: 1e4,
          placement: "top-left"
        });
        nativeNotification.show(
          'Notification',
          {
            body: 'This is a simple notification',
          },
          {},
        )
      });
      const personalChanel = new EventSource(
        "http://localhost:8000/sse/personal/" + token,
        { withCredentials: false }
      );

      personalChanel.addEventListener("new_message", function (event) {
        sound.play()
        notification.info({
          title: "Personal message",
          content: event.data,
          duration: 1e4,
          placement: "top-left",
        });
        nativeNotification.show(
          'Notification',
          {
            body: 'This is a simple notification',
          },
          {},
        )
      });

      common.setTheme(localStorage.getItem("theme"));
      const sider = localStorage.getItem("siderIsShown");
      if (sider) {
        if (sider == "true") {
          common.setSiderVisability(true);
        }
      }
      if (common.currentTheme == "dark") {
        theme.value = darkTheme;
        isDarkTheme.value = true;
      }
    });

    watch(isLoading, (state) => {
      if (state == true) {
        loadingBar.start();
      } else {
        loadingBar.finish();
      }
    });

    function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    }

    const themeOverrides = {
      common: {
        primaryColor: "#ffa",
        primaryColorHover: "#EED180",
        primaryColorPressed: "#EED180",
        invertedColor: "#EED180",
      },
      Switch: {
        railColorActive: "#ffa",
      },
      Slider: {
        fillColor: "#ffa",
        fillColorHover: "#EED180",
      },
    };

    return {
      darkTheme,
      theme,
      themeOverrides,
      path,
      auth,
      common,
      router,
      searchInput,
      searchInputEnabled,
      collapsed: ref(true),
      showSider: ref(true),
      isDarkTheme,
      task,
      PricetagOutline,
      SearchOutline,
      avatar,
      showSettings,
      showNewProject,
      handleChange(value) {
        if (value) {
          theme.value = darkTheme;
          common.setTheme("dark");
        } else {
          theme.value = null;
          common.setTheme("light");
        }
      },
      onScroll(event) {},
      focusSearchInput() {
        searchInputEnabled.value = true;
        setTimeout(() => {
          searchInput.value?.focus();
        }, 0);
      },
      onFocusOut() {
        searchInputEnabled.value = false;
      },
      handleSiderRoute(key, item) {
        if (Number.isInteger(key)) {
          router.push("/app/project/" + key);
        } else {
          if (key == "add-project") {
            showNewProject.value = true;
          } else {
            router.push("/app/" + key);
          }
        }
      },
      handleUserMenuSelect(key) {
        switch (key) {
          case "settings":
            showSettings.value = true;
            break;
        }
      },
    };
  },
};
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <app-provider>
      <n-layout id="layout" has-sider>
        <n-layout-sider
          :native-scrollbar="false"
          bordered
          collapse-mode="width"
          :collapsed-width="0"
          :collapsed="common.siderIsExpanded"
          @collapse="common.setSiderVisability(true)"
          @expand="common.setSiderVisability(false)"
          v-if="showSider && !common.disableSidebar.includes(path)"
        >
          <n-menu
            :default-expanded-keys="['favorites', 'projects']"
            @update:value="handleSiderRoute"
            :options="task.menuOptions"
          />
        </n-layout-sider>
        <n-layout>
          <n-layout-header
            v-if="!common.disableHeader.includes(path) && path !== '/'"
            id="navbar"
            :position="'fixed'"
            :bordered="true"
          >
            <div id="home-navbar-menu">
              <n-button text style="font-size: 1.5rem">
                <n-icon
                  @click="common.setSiderVisability(!common.siderIsExpanded)"
                >
                  <sidebar-collapse-icon
                    v-motion-fade
                    v-if="!common.siderIsExpanded"
                  />
                  <sidebar-expand-icon v-motion-fade v-else />
                </n-icon>
              </n-button>
            </div>
            <div id="navbar-right">
              <n-button
                v-motion-slide-bottom
                @click="focusSearchInput"
                text
                style="font-size: 1.5rem"
                v-if="!searchInputEnabled"
              >
                <n-icon size="28">
                  <search-icon />
                </n-icon>
              </n-button>
              <n-auto-complete
                ref="searchInput"
                v-if="searchInputEnabled"
                v-motion-slide-right
                @focusout="onFocusOut"
                placeholder="Search projects, tasks, tags, etc..."
              >
                <template #prefix>
                  <!--                  <n-icon :component="SearchOutline" />-->
                  <n-icon size="25">
                    <search-icon />
                  </n-icon>
                </template>
              </n-auto-complete>

              <n-button
                class="hvr-buzz"
                text
                style="font-size: 1.5rem; margin: 0 15px"
              >
                <n-icon>
                  <notifications-outline />
                </n-icon>
              </n-button>
              <n-button
                @click="handleChange(common.currentTheme == 'light')"
                text
                style="font-size: 1.5rem; margin-right: 15px"
              >
                <n-icon>
                  <sun
                    v-motion-slide-top
                    v-if="common.currentTheme == 'light'"
                  />
                  <half-moon-icon v-motion-slide-top v-else />
                </n-icon>
              </n-button>
              <n-dropdown
                @select="handleUserMenuSelect"
                trigger="click"
                :options="auth.userDropdownMenuOptions"
              >
                <n-avatar
                  :src="avatar"
                  color="#ffa"
                  id="navbar-avatar"
                  round
                  :size="30"
                >
                </n-avatar>
              </n-dropdown>
            </div>
          </n-layout-header>
          <n-scrollbar
            v-if="
              !['/', '/login', '/register', '/reset-password', '/app'].includes(
                path
              )
            "
            @scroll="onScroll"
            trigger="hover"
            style="max-height: 95vh"
          >
            <n-layout-content>
              <RouterView v-slot="{ Component }">
                <Transition name="fade">
                  <component :is="Component" />
                </Transition>
              </RouterView>
            </n-layout-content>
          </n-scrollbar>
          <!-- <n-layout-header
            v-if="path == '/'"
            id="navbar"
            :position="'fixed'"
            :bordered="true"
          >
            <n-switch
              v-model:value="isDarkTheme"
              @update:value="handleChange"
            />
          </n-layout-header> -->

          <n-layout-content
            v-if="
              ['/', '/login', '/register', '/reset-password', '/app'].includes(
                path
              )
            "
            @on-scroll="onScroll"
          >
            <RouterView v-slot="{ Component }">
              <Transition name="fade">
                <component :is="Component" />
              </Transition>
            </RouterView>
          </n-layout-content>
          <n-layout-footer v-if="path == '/'">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
            debitis expedita esse saepe quod officia deleniti minus aliquid
            tempore, maxime dolore cupiditate eaque tempora quidem at nemo, >
          </n-layout-footer>
        </n-layout>
      </n-layout>

      <n-modal :mask-closable="false" v-model:show="showSettings">
        <settings />
      </n-modal>
      <n-modal v-model:show="showNewProject">
        <project-create-form @closeModal="showNewProject = false" />
      </n-modal>

      <n-global-style />
    </app-provider>
  </n-config-provider>
</template>

<style>
@import "@/assets/base.css";
@font-face {
  font-family: "Avenir";
  src: url("./assets/avenir/AvenirNextRoundedStd-Demi.ttf") format("truetype");
}
@font-face {
  font-family: "Beatrice";
  src: url("./assets/beatrice/Beatrice Display Black.ttf") format("truetype");
}
* {
  --primary-color: #ffa;
}
#navbar {
  backdrop-filter: blur(1px);
  height: 5vh;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
}
#app {
  font-family: "Comfortaa";
  /* font-family: "Josefin Sans"; */
  overflow-y: hidden;
}
.n-layout .n-layout-scroll-container {
  overflow-y: hidden;
}
.n-layout-content {
  min-height: 95vh;
}
::selection {
  background: #ffa;
}
#home-navbar-menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 5%;
}
#navbar .n-auto-complete {
  height: 75%;
  width: 350px;
  margin-right: 15px;
}
#navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
#navbar-avatar:hover {
  cursor: pointer;
}
#navbar-avatar .n-avatar__text {
  top: 55%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@-webkit-keyframes hvr-buzz {
  50% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  100% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
}
@keyframes hvr-buzz {
  50% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  100% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
}
.hvr-buzz {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-buzz:hover,
.hvr-buzz:focus,
.hvr-buzz:active {
  -webkit-animation-name: hvr-buzz;
  animation-name: hvr-buzz;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
.n-layout-sider .n-scrollbar {
  height: 100vh;
}
</style>
