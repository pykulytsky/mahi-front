<script>
import { RouterLink, RouterView, useRoute } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import { ref, h, watch, computed } from "vue";
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
  useLoadingBar,
  createDiscreteApi,
  NSpace,
  NAvatar,
} from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  HomeOutline as HomeIcon,
  MenuOutline,
  Menu,
  SearchOutline,
  NotificationsOutline,
  PricetagOutline,
  CalendarOutline,
  CalendarNumberOutline,
} from "@vicons/ionicons5";
import { User as UserIcon } from "@vicons/tabler";
import { onMounted } from "vue";
import { useCommonStore } from "./stores/common";
import { useTaskStore } from "./stores/task";
import router from "./router";
import AppProvider from "./app.provider.vue";

const { loadingBar } = createDiscreteApi(["loadingBar"]);

export default {
  components: {
    HelloWorld,
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
    SearchOutline,
    UserIcon,
  },

  setup() {
    const route = useRoute();
    const path = computed(() => route.path);
    const common = useCommonStore();
    const task = useTaskStore()
    const { isLoading } = storeToRefs(common);
    const searchInputEnabled = ref(false);
    const searchInput = ref(null);

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

    onMounted(() => {
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
        loadingBar.start()
      } else {
        loadingBar.finish()
      }
    })

    function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    }

    const themeOverrides = {
      common: {
        primaryColor: "#E28163FF",
        primaryColorHover: "#E28163FF",
        primaryColorPressed: "#E28163FF",
        invertedColor: "#A08278FF",
      },
    };

    const menuOptions = [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "home",
              },
            },
            { default: () => "Dashboard" }
          ),
        key: "go-back-home",
        icon: renderIcon(HomeIcon),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "today",
              },
            },
            { default: () => "Today" }
          ),
        key: "today",
        icon: renderIcon(CalendarNumberOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "calendar",
              },
            },
            { default: () => "Calendar" }
          ),
        key: "calendar",
        icon: renderIcon(CalendarOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "tags",
              },
            },
            { default: () => "Tags" }
          ),
        key: "tags",
        icon: renderIcon(PricetagOutline),
      },
      {
        key: "divider-1",
        type: "divider",
        props: {
          style: {
            marginLeft: "32px",
          },
        },
      },
      {
        label: "Dance Dance Dance",
        key: "Dance Dance Dance",
        icon: renderIcon(BookIcon),
        children: [
          {
            type: "group",
            label: "People",
            key: "people",
            children: [
              {
                label: "Narrator",
                key: "narrator",
                icon: () => "🥥",
              },
              {
                label: "Sheep Man",
                key: "sheep-man",
                icon: renderIcon(PersonIcon),
              },
            ],
          },
          {
            label: "Beverage",
            key: "beverage",
            icon: renderIcon(WineIcon),
            children: [
              {
                label: "Whisky",
                key: "whisky",
              },
            ],
          },
          {
            label: "Food",
            key: "food",
            children: [
              {
                label: "Sandwich",
                key: "sandwich",
              },
            ],
          },
          {
            label: "The past increases. The future recedes.",
            key: "the-past-increases-the-future-recedes",
          },
        ],
      },
    ];

    return {
      darkTheme,
      theme,
      menuOptions,
      themeOverrides,
      path,
      common,
      searchInput,
      searchInputEnabled,
      collapsed: ref(true),
      showSider: ref(true),
      isDarkTheme,
      task,
      PricetagOutline,
      SearchOutline,
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
    };
  },
};
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <app-provider>
      <n-layout id="layout" has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="0"
          :collapsed="common.siderIsExpanded"
          @collapse="common.setSiderVisability(true)"
          @expand="common.setSiderVisability(false)"
          v-if="showSider && !common.disableSidebar.includes(path)"
        >
          <n-menu :options="menuOptions" />
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
                <n-icon>
                  <menu-filled
                    @click="common.setSiderVisability(!common.siderIsExpanded)"
                  />
                </n-icon>
              </n-button>
              <n-button text style="font-size: 1.3rem">
                <n-icon>
                  <home-icon />
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
                <n-icon>
                  <search-outline />
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
                  <n-icon :component="SearchOutline" />
                </template>
              </n-auto-complete>

              <n-button class="hvr-buzz" text style="font-size: 1.5rem; margin: 0 15px">
                <n-icon>
                  <notifications-outline />
                </n-icon>
              </n-button>
              <n-avatar id="navbar-avatar" round :size="30">
                <n-icon :size="25">
                  <user-icon />
                </n-icon>
              </n-avatar>
            </div>
          </n-layout-header>
          <n-scrollbar
            v-if="path !== '/'"
            @scroll="onScroll"
            trigger="hover"
            style="max-height: 95vh"
          >
            <n-layout-content @on-scroll="onScroll">
              <RouterView v-slot="{ Component }">
                <Transition name="fade">
                  <component :is="Component" />
                </Transition>
              </RouterView>
            </n-layout-content>
          </n-scrollbar>
          <n-layout-header
            v-if="path == '/'"
            id="navbar"
            :position="'fixed'"
            :bordered="true"
          >
            <n-switch
              v-model:value="isDarkTheme"
              @update:value="handleChange"
            />
          </n-layout-header>

          <n-layout-content v-if="path == '/'" @on-scroll="onScroll">
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

      <n-global-style />
    </app-provider>
  </n-config-provider>
</template>

<style>
@import "@/assets/base.css";
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
  overflow-y: hidden;
}
.n-layout .n-layout-scroll-container {
  overflow-y: hidden;
}
.n-layout-content {
  min-height: 100vh;
}
::selection {
  background: #e28163ff;
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
.hvr-buzz:hover, .hvr-buzz:focus, .hvr-buzz:active {
  -webkit-animation-name: hvr-buzz;
  animation-name: hvr-buzz;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
</style>
