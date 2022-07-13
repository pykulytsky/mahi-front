<script>
import {
  NRadio,
  NH2,
  NDropdown,
  NButton,
  NIcon,
  NEllipsis,
  NCollapseTransition,
  NCheckbox,
  NTag,
  NSpace
} from "naive-ui";
import { EllipsisVerticalOutline } from "@vicons/ionicons5";
import { useCommonStore } from "../../stores/common";
import { ref } from "vue";
import { useMq } from "vue3-mq";
export default {
  components: {
    NRadio,
    NH2,
    NDropdown,
    NButton,
    NIcon,
    EllipsisVerticalOutline,
    NCollapseTransition,
    NCheckbox,
    NEllipsis,
    NTag,
    NSpace
  },
  emits: ["showTodoDetails"],
  props: {
    todo: Object,
  },
  setup(props) {
    const todoActions = [];
    const todoActionsIsShown = ref(false);
    const common = useCommonStore();
    const mq = useMq();
    return {
      todoActions,
      todoActionsIsShown,
      common,
      mq,
      onMouseEnter() {
        todoActionsIsShown.value = true;
      },
      onMouseLeave() {
        todoActionsIsShown.value = false;
      },
    };
  },
};
</script>

<template>
  <div
    :class="common.currentTheme == 'light' ? 'todo-item' : 'todo-item-dark'"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @contextmenu.prevent="$emit('showTodoDetails')"
  >
    <div class="todo-item-title">
      <n-checkbox size="large">
        <h3 v-if="mq.lgPlus">{{ todo.title }}</h3>
        <h4 v-else>{{ todo.title }}</h4>
      </n-checkbox>
      <Transition>
        <div class="todo-item-actions" v-if="todoActionsIsShown">
          <n-dropdown trigger="click" :options="todoActions">
            <n-button text style="font-size: 1rem">
              <n-icon>
                <ellipsis-vertical-outline />
              </n-icon>
            </n-button>
          </n-dropdown>
        </div>
      </Transition>
    </div>
    <n-ellipsis id="description" expand-trigger="click" line-clamp="1" :tooltip="false">
      {{todo.description}}
    </n-ellipsis>
    <n-space id="todo-tags">
      <n-tag
        size="small"
        v-for="tag in todo.tags"
        :key="tag.title"
        :type="tag.type"
      >
        {{tag.title}}
      </n-tag>
    </n-space>
    <!-- <n-collapse>
      <n-collapse-item title="Description">
        {{todo.description}}
      </n-collapse-item>
    </n-collapse> -->
  </div>
</template>

<style>
.todo-item {
  outline: 1px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1% 2% .5% 2%;
  width: 75vw;
  background-color: #dfcabd;
  margin: 5px;

  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
}
.todo-item-dark {
  outline: 1px solid transparent;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 1% 2% .5% 2%;
  width: 75vw;
  margin: 5px;
  border: 1px solid rgba(128, 128, 128, 0.2);

  transition: all 0.3s ease-in-out;
  background-color: #18181c;
}
.todo-item:hover,
.todo-item-dark:hover {
  cursor: pointer;
  outline: 1px solid #e28163ff;
  transform: scale(1.03) !important;
}
.todo-item-actions {
  display: flex;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.todo-item-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.todo-item-title .n-checkbox-box {
  border-radius: 50%;
}
#description {
  padding: 0% 3%;
}
.todo-item-title .n-checkbox .n-checkbox-box-wrapper {
  height: 60%;
}
#todo-tags {
  padding-left: 4%;
}
</style>
