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
  NSpace,
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
    NSpace,
  },
  emits: ["showTaskDetails"],
  props: {
    task: Object,
  },
  setup(props) {
    const taskActions = [];
    const taskActionsIsShown = ref(false);
    const common = useCommonStore();
    const descriptionIsShown = ref(false);
    const mq = useMq();
    return {
      taskActions,
      taskActionsIsShown,
      common,
      descriptionIsShown,
      mq,
      onMouseEnter() {
        taskActionsIsShown.value = true;
      },
      onMouseLeave() {
        taskActionsIsShown.value = false;
      },
      handleTaskFinish() {
        console.log(props.task.id)
      }
    };
  },
};
</script>

<template>
  <div
    :class="common.currentTheme == 'light' ? 'task' : 'task-dark'"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @contextmenu.prevent="$emit('showTaskDetails')"
  >
    <div class="task-title">
      <n-checkbox @click="handleTaskFinish" :checked="task.isDone" size="large">
        <h3 :class="task.isDone ? 'title__done': ''">{{ task.name }}</h3>
      </n-checkbox>
      <Transition>
        <div class="task-actions" v-show="taskActionsIsShown">
          <n-dropdown trigger="click" :options="taskActions">
            <n-button text style="font-size: 1rem">
              <n-icon>
                <ellipsis-vertical-outline />
              </n-icon>
            </n-button>
          </n-dropdown>
        </div>
      </Transition>
    </div>

    <!-- <n-ellipsis id="description" expand-trigger="click" line-clamp="1" :tooltip="false">
      {{todo.description}}
    </n-ellipsis> -->

    <Transition>
    <p
      v-if="task.description"
      class="description"
      @click="descriptionIsShown = !descriptionIsShown"
      v-show="!descriptionIsShown"
    >
      {{ task.description.slice(0, 15) }}...
    </p>
    </Transition>
    <n-collapse-transition
      class="description"
      @click="descriptionIsShown = !descriptionIsShown"
      :show="descriptionIsShown"
    >
      {{ task.description }}</n-collapse-transition
    >
    <n-space id="task-tags">
      <n-tag
        size="small"
        v-for="tag in task.tags"
        :key="tag.title"
        :type="tag.type"
      >
        {{ tag.title }}
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
.task {
  outline: 1px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1% 2% 0.5% 2%;
  width: 75vw;
  background-color: #dfcabd;
  margin: 5px;

  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
}
.task-dark {
  outline: 1px solid transparent;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 1% 2% 0.5% 2%;
  width: 75vw;
  margin: 5px;
  border: 1px solid rgba(128, 128, 128, 0.2);

  transition: all 0.3s ease-in-out;
  background-color: #18181c;
}
.task:hover,
.task-dark:hover {
  cursor: pointer;
  outline: 1px solid #e28163ff;
  transform: scale(1.03) !important;
}
.task-actions {
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
.task-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.task-title .n-checkbox-box {
  border-radius: 50%;
}
.task-title .n-checkbox {
  align-items: center;
}
.description {
  padding: 0% 3%;
}
.task-title .n-checkbox .n-checkbox-box-wrapper {
  height: 60%;
}
#task-tags {
  padding-left: 4%;
}
.title__done {
  text-decoration: line-through;
}
</style>
