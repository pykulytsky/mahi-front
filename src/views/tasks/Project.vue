<script>
import { ref, onBeforeMount, watch } from "vue";
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
  NModal,
  useLoadingBar
} from "naive-ui";
import { VuemojiPicker } from "vuemoji-picker";
import {
  EllipsisHorizontalCircle,
  Star,
  StarOutline,
  AddOutline,
} from "@vicons/ionicons5";
import { Pin, PinnedOff } from "@vicons/tabler";
import { useTaskStore } from "../../stores/task";
import { useCommonStore } from "../../stores/common";
import Task from "../../components/tasks/Task.vue";
import Empty1 from "../../assets/lottie/empty1.json";
import Empty2 from "../../assets/lottie/empty2.json";
import Empty3 from "../../assets/lottie/empty3.json";
import draggable from "vuedraggable";
import TodoCreateForm from "../../components/tasks/TaskCreateForm.vue";
import { storeToRefs } from "pinia";
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
    TaskItem: Task,
    NDrawer,
    NDrawerContent,
    Star,
    StarOutline,
    NTooltip,
    draggable,
    Pin,
    PinnedOff,
    NModal,
    TodoCreateForm,
    AddOutline,
  },
  setup() {
    const emoji = ref(null);
    const task = useTaskStore();
    const common = useCommonStore();
    const taskDetailIsShown = ref(false);
    const placement = ref("right");
    const isFavorite = ref(false);
    const isPinned = ref(false);
    const emojiPickerIsShown = ref(false);
    const taskFormIsShown = ref(false);
    const {currentProject} = storeToRefs(task)
    const loadingBar = useLoadingBar()
    const tasksLoaded = ref(false)

    onBeforeMount(() => {
      task.fetchProject(1)
    })

    watch(currentProject, (state) => {
      if (state == null) {
        loadingBar.start()
      }
      else {
        tasksLoaded.value = true
        loadingBar.finish()
      }
    })

    const activate = (place) => {
      taskDetailIsShown.value = true;
      placement.value = place;
    };
    const tasks = ref([
      {
        id: 1,
        title: "cStoner is a 1965 novel by the American writer John Williams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots. Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots. Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: true,
        tags: [
          {
            type: "error",
            title: "important",
          },
          {
            type: "info",
            title: "grocery",
          },
          {
            type: "success",
            title: "sport",
          },
        ],
      },
      {
        id: 2,
        title: "hStoner is a 19r John Williams.",
        description: "",
        isDone: false,
        tags: [
          {
            type: "error",
            title: "important",
          },
        ],
      },
      {
        id: 3,
        title: "aStoner iams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: true,
        tags: [],
      },
      {
        id: 4,
        title:
          "dStoner is a 1965 novel by the American writer John Williams. Stoner is a 1965 novel by the American writer John Williams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: false,
        tags: [
          {
            type: "warning",
            title: "Kate",
          },
          {
            type: "error",
            title: "vacation",
          },
        ],
      },
      {
        id: 5,
        title: "eStoner is a 1965 novel by the American writer John Williams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: false,
        tags: [],
      },
      {
        id: 6,
        title: "1965 American writer John Williams.",
        description:
          'Set dot-type to change the style of the dots. You can use :show-dots="false" to hide the dots.',
        isDone: false,
        tags: [],
      },
    ]);
    return {
      emoji,
      task,
      common,
      taskDetailIsShown,
      placement,
      activate,
      Empty1,
      Empty2,
      Empty3,
      tasks,
      isFavorite,
      isPinned,
      tasksLoaded,
      emojiPickerIsShown,
      taskFormIsShown,
      currentProject,
      handleBack() {},
      handleEmojiClick(em) {
        emoji.value = em.unicode;
      },
      showTaskDetails() {
        taskDetailIsShown.value = true;
      },
      onActionSelect(key) {
        switch (key) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          case 6:
            emojiPickerIsShown.value = true;
            break;
          case 7:
            break;
        }
      },
      addItem() {
        task.fetchProjects()
        console.log(task.currentProject.tasks)
        tasks.value.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
      },
    };
  },
};
</script>
<template>
  <main>
    <n-page-header @back="handleBack">
      <template #title>
        <h1 id="project-title">Lorem ipsum dolor sit.</h1>
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
          <n-dropdown
            trigger="click"
            :options="task.projectOptions"
            @select="onActionSelect"
          >
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
    <div class="project" v-if="tasksLoaded">
      <n-button
        v-motion-slide-top
        v-if="!taskFormIsShown"
        @click="taskFormIsShown = true"
        :style="{
          marginBottom: '15px',
        }"
        strong
        secondary
        round
        type="primary"
      >
        <template #icon>
          <n-icon>
            <add-outline />
          </n-icon>
        </template>
        Add task
      </n-button>
      <todo-create-form
        @close-task-form="taskFormIsShown = false"
        v-motion-slide-bottom
        v-if="taskFormIsShown"
      />
      <TransitionGroup name="list" tag="div">
        <task-item
          v-for="task in currentProject.tasks"
          @show-task-details="showTaskDetails"
          :task="task"
          v-motion-pop
          :delay="task.id * 100"
          :key="task.id"
        ></task-item>
      </TransitionGroup>

      <n-button @click="addItem">Sort items</n-button>
      <Vue3Lottie
        v-if="tasks.length == 0"
        id="project-no-data"
        :animationData="Empty2"
        :width="500"
        :height="500"
      />
    </div>
    <n-drawer
      :style="{
        fontFamily: 'Comfortaa',
      }"
      v-model:show="taskDetailIsShown"
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
      <VuemojiPicker
        :is-dark="common.currentTheme == 'dark'"
        @emojiClick="handleEmojiClick"
      />
    </n-modal>
  </main>
</template>
<style>
.project {
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
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
