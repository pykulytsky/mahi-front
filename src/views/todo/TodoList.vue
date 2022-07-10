<script>
import { ref } from "vue";
import {
  NPageHeader,
  NBreadcrumb,
  NBreadcrumbItem,
  NDivider,
  NDropdown,
  NButton,
  NIcon,
  NSpace,
  NDrawer,
  NDrawerContent,
  NTooltip,
  NModal
} from "naive-ui";
import { VuemojiPicker } from "vuemoji-picker";
import { EllipsisHorizontalCircle, Star, StarOutline } from "@vicons/ionicons5";
import { Pin, PinnedOff } from "@vicons/tabler";
import { useTodoStore } from "../../stores/todo";
import { useCommonStore } from "../../stores/common";
import TodoItem from "../../components/todo/TodoItem.vue";
import Empty1 from "../../assets/lottie/empty1.json";
import Empty2 from "../../assets/lottie/empty2.json";
import Empty3 from "../../assets/lottie/empty3.json";
import draggable from "vuedraggable";
export default {
  components: {
    NPageHeader,
    NBreadcrumb,
    NBreadcrumbItem,
    NDivider,
    VuemojiPicker,
    NDropdown,
    NButton,
    NIcon,
    EllipsisHorizontalCircle,
    NSpace,
    TodoItem,
    NDrawer,
    NDrawerContent,
    Star,
    StarOutline,
    NTooltip,
    draggable,
    Pin,
    PinnedOff,
    NModal
  },
  setup() {
    const emoji = ref(null);
    const todo = useTodoStore();
    const common = useCommonStore()
    const todoDetailIsShown = ref(false);
    const placement = ref("right");
    const isFavorite = ref(false);
    const isPinned = ref(false);
    const emojiPickerIsShown = ref(false)
    const activate = (place) => {
      todoDetailIsShown.value = true;
      placement.value = place;
    };
    const todos = ref([
      {
        id: 1,
        title: "Stoner is a 1965 novel by the American writer John Williams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: true,
      },
      {
        id: 2,
        title: "Stoner is a 19r John Williams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: false,
      },
      {
        id: 3,
        title: "Stoner iams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: true,
      },
      {
        id: 4,
        title:
          "Stoner is a 1965 novel by the American writer John Williams. Stoner is a 1965 novel by the American writer John Williams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: false,
      },
      {
        id: 5,
        title: "Stoner is a 1965 novel by the American writer John Williams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: false,
      },
      {
        id: 6,
        title: "1965 American writer John Williams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: false,
      },
    ]);
    return {
      emoji,
      todo,
      common,
      todoDetailIsShown,
      placement,
      activate,
      Empty1,
      Empty2,
      Empty3,
      todos,
      isFavorite,
      isPinned,
      emojiPickerIsShown,
      handleBack() {},
      handleEmojiClick(em) {
        emoji.value = em.unicode;
      },
      showTodoDetails() {
        todoDetailIsShown.value = true;
      },
      onActionSelect(key) {
        switch(key) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            emojiPickerIsShown.value = true
            break;
          case 6:
            break;
          case 7:
            break;
        }
      }
    };
  },
};
</script>
<template>
  <main>
    <n-page-header @back="handleBack">

      <template #title>
        <h1 id="todolist-title">Lorem ipsum dolor sit.</h1>
      </template>
      <template #header>
        <n-breadcrumb>
          <n-breadcrumb-item>Todo lists</n-breadcrumb-item>
          <n-breadcrumb-item>Lorem ipsum dolor sit.</n-breadcrumb-item>
        </n-breadcrumb>
      </template>
      <template #avatar>
        {{ emoji }}
      </template>
      <template #extra>
        <n-space>
          <n-tooltip>
            <template #trigger>
              <n-button
                @click="isPinned = !isPinned"
                text
                style="font-size: 1.5rem"
              >
                <n-icon>
                  <pinned-off v-if="isPinned" />
                  <pin v-else />
                </n-icon>
              </n-button>
            </template>
            <p v-if="isPinned">Unpin from sidebar</p>
            <p v-else>Pin to sidebar</p>
          </n-tooltip>
          <n-tooltip>
            <template #trigger>
              <n-button
                @click="isFavorite = !isFavorite"
                text
                style="font-size: 1.3rem"
              >
                <n-icon>
                  <star-outline v-if="!isFavorite" />
                  <star v-else />
                </n-icon>
              </n-button>
            </template>
            <p v-if="isFavorite">Remove from favorites</p>
            <p v-else>Add to favorites</p>
          </n-tooltip>
          <n-dropdown trigger="click" :options="todo.todoListOptions" @select="onActionSelect">
            <n-button text style="font-size: 1.5rem">
              <n-icon>
                <ellipsis-horizontal-circle />
              </n-icon>
            </n-button>
          </n-dropdown>
        </n-space>
      </template>
    </n-page-header>
    <n-divider />
    <div class="todolist">
      <todo-item
        v-for="todo in todos"
        @show-todo-details="showTodoDetails"
        :todo="todo"
        v-motion-pop
        :delay="todo.id * 100"
        :key="todo.id"
      ></todo-item>

      <Vue3Lottie
        v-if="todos.length == 0"
        id="todolist-no-data"
        :animationData="Empty2"
        :width="500"
        :height="500"
      />
    </div>
    <n-drawer
      v-model:show="todoDetailIsShown"
      :width="752"
      :placement="placement"
      to="body"
      :height="100"
    >
      <n-drawer-content title="Stoner">
        Stoner is a 1965 novel by the American writer John Williams.
      </n-drawer-content>
    </n-drawer>
    <n-modal v-model:show="emojiPickerIsShown">
      <VuemojiPicker :is-dark="common.currentTheme == 'dark'" @emojiClick="handleEmojiClick" />
    </n-modal>
  </main>
</template>
<style>
.todolist {
  margin-bottom: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.n-page-header .n-page-header__avatar {
  font-size: 3rem;
}
.n-page-header-wrapper {
  padding: 2% 5% 0% 5%;
}
#todolist-title {
  font-weight: bold;
}
.n-drawer.n-drawer--right-placement {
  height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
