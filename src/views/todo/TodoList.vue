<script>
import {ref} from "vue"
import {
  NPageHeader,
  NBreadcrumb,
  NBreadcrumbItem,
  NDivider,
  NDropdown,
  NButton,
  NIcon,
  NSpace
} from "naive-ui";
import { VuemojiPicker} from 'vuemoji-picker'
import { EllipsisHorizontalCircle } from "@vicons/ionicons5";
import { useTodoStore } from "../../stores/todo";
import TodoItem from "../../components/todo/TodoItem.vue";
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
    TodoItem
  },
  setup() {
    const emoji = ref(null)
    const todo = useTodoStore()
    return {
      emoji,
      todo,
      handleBack() {},
      handleEmojiClick(em) {
        emoji.value = em.unicode
      },
    };
  },
};
</script>
<template>
  <main>
    <n-page-header @back="handleBack">
      <template #title>
        <h1 class="todolist-title">Lorem ipsum dolor sit.</h1>
      </template>
      <template #header>
        <n-breadcrumb>
          <n-breadcrumb-item>Todo lists</n-breadcrumb-item>
          <n-breadcrumb-item>Lorem ipsum dolor sit.</n-breadcrumb-item>
        </n-breadcrumb>
      </template>
      <template #avatar>
        {{emoji}}
      </template>
      <template #extra>
        <n-space>
          <n-dropdown trigger="click" :options="todo.todoListOptions">
            <n-button text style="font-size: 1.5rem;">
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
      <todo-item></todo-item>
      <todo-item></todo-item>
      <todo-item></todo-item>
      <todo-item></todo-item>
      <todo-item></todo-item>
      <todo-item></todo-item>
      <todo-item></todo-item>
      <todo-item></todo-item>
      <todo-item></todo-item>
      <todo-item></todo-item>
    </div>
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
  padding: 2% 5%;
}
</style>
