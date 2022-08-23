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
import {
  EllipsisVerticalOutline,
  CalendarClearOutline,
  AlarmOutline
} from "@vicons/ionicons5";
import { ExclamationMark } from "@vicons/tabler";
import { useCommonStore } from "../../stores/common";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
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
    CalendarClearOutline,
    ExclamationMark,
    AlarmOutline
  },
  emits: ["showTaskDetails", "changeTaskStatus"],
  props: {
    task: Object,
  },
  setup(props) {
    const taskActions = [];
    const themeOverrides = {
      common: {
        primaryColor: "#ff7373",
      },
    };
    const taskActionsIsShown = ref(false);
    const common = useCommonStore();
    const descriptionIsShown = ref(false);
    const mq = useMq();
    const router = useRouter();
    const route = useRoute()
    const taskPriorityType = computed(() => {
      switch (props.task.priority) {
        case "VERY HIGH":
          return "error";
        case "HIGH":
          return "warning";
        default:
          return "default";
      }
    });
    return {
      taskActions,
      taskActionsIsShown,
      common,
      descriptionIsShown,
      mq,
      router,
      route,
      taskPriorityType,
      themeOverrides,
      CalendarClearOutline,
      AlarmOutline,
      onMouseEnter() {
        taskActionsIsShown.value = true;
      },
      onMouseLeave() {
        taskActionsIsShown.value = false;
      },
      handleTaskFinish() {},
      getOutlineColor() {
        if (props.task.is_important) {
          return '#e88080'
        }
        else {
          if (props.task.color !== null) {
            return props.task.color
          }
          else {
            return 'var(--primary-color)'
          }
        }
      },
    };
  },
};
</script>

<template>
  <div
    :class="{
      task: common.currentTheme == 'light',
      'task-dark': common.currentTheme == 'dark',
      'task-important': task.is_important
    }"
    :style="{
      '--outline-color': getOutlineColor()
    }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @contextmenu.prevent="$emit('showTaskDetails', task)"
  >
    <div class="task-title">
      <n-checkbox
        :style="{
          '--checkbox-color': getOutlineColor(),
          '--n-color-checked': getOutlineColor(),
          '--n-border-checked':
            task.color !== null
              ? `1px solid ${task.color}`
              : '1px solid var(--primary-color)',
          '--n-border-focus':
            task.color !== null
              ? `1px solid ${task.color}`
              : '1px solid var(--primary-color)',
        }"
        @click="$emit('changeTaskStatus', task)"
        :checked="task.is_done"
        size="large"
      >
        <h3 :class="task.is_done ? 'title__done' : ''">{{ task.name }}</h3>
      </n-checkbox>
      <!-- <Transition>
        <div class="task-actions" v-show="taskActionsIsShown">
          <n-dropdown trigger="click" :options="taskActions">
            <n-button text style="font-size: 1rem">
              <n-icon>
                <ellipsis-vertical-outline />
              </n-icon>
            </n-button>
          </n-dropdown>
        </div>
      </Transition> -->
    </div>
    <!-- <n-ellipsis id="description" expand-trigger="click" line-clamp="1" :tooltip="false">
      {{task.description}}{{task.description}}
    </n-ellipsis> -->
    <div
      v-if="task.description"
      class="description"
      id="collapsed-description"
      @click="descriptionIsShown = !descriptionIsShown"
      v-show="!descriptionIsShown"
    >
      {{ task.description }}
    </div>
    <n-collapse-transition
      class="description"
      @click="descriptionIsShown = !descriptionIsShown"
      :show="descriptionIsShown"
    >
      {{ task.description }}</n-collapse-transition
    >
    <n-space id="task-tags">
      <n-tag
        v-if="task.priority"
        size="small"
        :type="taskPriorityType"
        :bordered="false"
      >
        <n-icon :size="15">
          <exclamation-mark></exclamation-mark>
        </n-icon>
      </n-tag>

      <n-tag
        size="small"
        :type="new Date(task.remind_at) >= new Date()? 'default': 'error'"
        bordered
        v-if="task.remind_at"
        :style="{
          fontFamily: 'Josefin Sans',
        }"
      >
        {{ task.remind_at }}
        <template #icon>
          <n-icon :component="AlarmOutline" />
        </template>
      </n-tag>
      <n-tag
        class="detail-tag"
        @click="router.push('/app/day/' + task.deadline)"
        size="small"
        :type="new Date(task.deadline) >= new Date()? 'default': 'error'"
        bordered
        v-if="task.deadline && route.name !== 'day'"
        :style="{
          fontFamily: 'Josefin Sans',
        }"
      >
        {{ task.deadline }}
        <template #icon>
          <n-icon :component="CalendarClearOutline" />
        </template>
      </n-tag>
      <n-tag
        class="detail-tag"
        @click="router.push('/app/tags/' + tag.name)"
        size="small"
        v-for="tag in task.tags"
        :key="tag.name"
        :type="tag.color"
      >
        {{ tag.name }}
      </n-tag>
    </n-space>
    <!-- <n-collapse>
      <n-collapse-item title="Description">
        {{task.description}}
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
.task-important {
  border: 1px solid #e88080;
}
.task:hover,
.task-dark:hover {
  cursor: pointer;
  outline: 1px solid var(--outline-color);
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
  align-items: baseline;
  transition: .3s all linear;
}
.task-title .n-checkbox:active {
  transform: scale(1.11);
}
.task-title .n-checkbox .n-checkbox-box .n-checkbox-box__border {
  border: 2px solid var(--checkbox-color);
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
.detail-tag {
  transition: all 0.2s linear;
}
.detail-tag:hover {
  cursor: pointer;
  transform: scale(1.1);
}
#collapsed-description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 95%;
  display: inline-block;
}
@media screen and (max-width: 720px) {
  .task,
  .task-dark {
    width: 95vw;
  }
}
</style>
