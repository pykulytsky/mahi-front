<script>
import { NRadio, NH2, NDropdown, NButton, NIcon } from "naive-ui";
import { EllipsisVerticalOutline } from "@vicons/ionicons5";
import { useCommonStore } from "../../stores/common";
import { ref } from "vue";
import {useMq} from "vue3-mq"
export default {
  components: {
    NRadio,
    NH2,
    NDropdown,
    NButton,
    NIcon,
    EllipsisVerticalOutline,
  },

  setup() {
    const todoActions = [];
    const todoActionsIsShown = ref(false);
    const common = useCommonStore()
    const mq = useMq()
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
  <main>
    <div
      :class="common.currentTheme == 'light'? 'todo-item': 'todo-item-dark'"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <n-radio>
        <h2>Lorem ipsum dolor sit.</h2>
      </n-radio>
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
  </main>
</template>

<style>
.todo-item {
  outline: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2% 5%;
  width: 75vw;
  background-color: #c9bbb2;
  margin: 5px;

  transition: all 0.3s ease-in-out;
}
.todo-item-dark {
  outline: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2% 5%;
  width: 75vw;
  margin: 5px;

  transition: all 0.3s ease-in-out;
  background-color: #18181c;
}
.todo-item:hover, .todo-item-dark:hover {
  cursor: pointer;
  outline: 1px solid #e28163ff;
  transform: scale(1.03);
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
</style>
