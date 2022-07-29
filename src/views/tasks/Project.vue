<script>
import { ref, onBeforeMount, watch, onUpdated, onMounted, computed } from "vue";
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
  useLoadingBar,
  useMessage,
  useDialog,
  NSkeleton
} from "naive-ui";
import { VuemojiPicker } from "vuemoji-picker";
import {
  EllipsisHorizontalCircle,
  Star,
  StarOutline,
  AddCircle,
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
import TaskEdit from "../../components/tasks/TaskEdit.vue";
import { storeToRefs } from "pinia";
import { updateTask, deleteTask } from "../../api/tasks.api";
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";
import { updateProject, deleteProject } from "../../api/projects.api";
import { useElementVisibility } from '@vueuse/core'
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
    TaskEdit,
    AddCircle,
    NSkeleton
  },
  setup() {
    const emoji = ref(null);
    const task = useTaskStore();
    const currentTask = ref(null);
    const common = useCommonStore();
    const taskDetailIsShown = ref(false);
    const placement = ref("right");
    const isFavorite = ref(false);
    const isPinned = ref(false);
    const emojiPickerIsShown = ref(false);
    const taskFormIsShown = ref(false);
    const { currentProject, currentTasks } = storeToRefs(task);
    const loadingBar = useLoadingBar();
    const tasksLoaded = ref(false);
    const route = useRoute();
    const router = useRouter();
    const message = useMessage();
    const dialog = useDialog();
    const addBtnRef = ref(null)
    const addBtnIsVisible = useElementVisibility(addBtnRef)

    const filler = computed(() => {
      let choices = [Empty1, Empty2, Empty3];
      let index = Math.floor(Math.random() * choices.length);
      return choices[index];
    });

    onBeforeMount(() => {
      task.fetchProject(route.params.id);
    });

    onBeforeRouteUpdate(() => {
      setTimeout(() => {
        task.fetchProject(route.params.id);
      }, 1);
    });
    onMounted(() => {});
    onUpdated(() => {});

    watch(currentProject, (state) => {
      if (state == null) {
        loadingBar.start();
      } else {
        tasksLoaded.value = true;
        loadingBar.finish();
      }
    });

    const activate = (place) => {
      taskDetailIsShown.value = true;
      placement.value = place;
    };

    const handleUpdateProject = () => {
      common.setLoading(true);
      updateProject(
        currentProject.value.id,
        currentProject.value.name,
        currentProject.value.description,
        currentProject.value.icon,
        currentProject.value.accent_color,
        currentProject.value.is_favorite,
        currentProject.value.is_pinned,
        currentProject.value.is_editable
      ).then(() => {
        task.fetchProject(route.params.id);
        common.setLoading(false);
      });
    };

    const handleDeleteProject = () => {
      dialog.warning({
        title: "Are you sure?",
        content: "Are you sure you want to delete this project?",
        positiveText: "Yes",
        negativeText: "No",
        onPositiveClick: () => {
          common.setLoading(true);
          deleteProject(currentProject.value.id).then(() => {
            message.success(
              "Project " +
                currentProject.value.name +
                " was successfully deleted"
            );
            task.fetchProjects();
            router.push("/today");
            common.setLoading(true);
          });
        },
        onNegativeClick: () => {},
      });
    };

    return {
      emoji,
      task,
      currentTask,
      currentTasks,
      common,
      taskDetailIsShown,
      placement,
      activate,
      filler,
      isFavorite,
      isPinned,
      tasksLoaded,
      emojiPickerIsShown,
      taskFormIsShown,
      currentProject,
      route,
      handleUpdateProject,
      handleDeleteProject,
      addBtnRef,
      addBtnIsVisible,
      handleBack() {},
      showTaskDetails(task) {
        currentTask.value = task;
        taskDetailIsShown.value = true;
      },

      handleEmojiClick(em) {
        currentProject.value.icon = em.unicode;
        handleUpdateProject();
      },
      changeTaskStatus(currentTask) {
        common.setLoading(true);
        updateTask(
          currentTask.id,
          currentTask.name,
          currentTask.description,
          currentTask.deadline,
          !currentTask.is_done
        ).then(() => {
          task.fetchProject(route.params.id);
          if (!currentTask.is_done) {
            message.success("1 task completed");
          }
          common.setLoading(false);
        });
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
          case 8:
            handleDeleteProject()
            break;
          case "lock":
            currentProject.value.is_editable = false;
            handleUpdateProject();
            break;
          case "unlock":
            currentProject.value.is_editable = true;
            handleUpdateProject();
            break;
        }
      },
      addItem() {
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
      handleUpdateTask() {
        common.setLoading(true);
        updateTask(
          currentTask.value.id,
          currentTask.value.name,
          currentTask.value.description,
          currentTask.value.deadline,
          currentTask.value.is_done
        ).then(() => {
          task.fetchProject(route.params.id);
          taskDetailIsShown.value = false;
          message.info("1 task updated");
          common.setLoading(false);
        });
      },
      handleDeleteTask() {
        common.setLoading(true);
        deleteTask(currentTask.value.id).then(() => {
          task.fetchProject(route.params.id);
          taskDetailIsShown.value = false;
          message.error("1 task deleted");
          common.setLoading(false);
        });
      },
      handleButtonScroll(event) {
        console.log(event)
      }
    };
  },
};
</script>
<template>
  <main v-if="task.currentProject && currentTasks">
    <n-page-header @back="handleBack">
      <template #title>
        <h1 v-if="task.currentProject !== null" id="project-title">
          {{ task.currentProject.name }}
        </h1>
        <n-skeleton height="40px" v-else></n-skeleton>
      </template>
      <template #header>
        <n-breadcrumb>
          <n-breadcrumb-item>Projects</n-breadcrumb-item>
          <n-breadcrumb-item v-if="task.currentProject.is_favorite"
            >Favorites</n-breadcrumb-item
          >
          <n-breadcrumb-item v-if="task.currentProject.is_pinned"
            >Pinned</n-breadcrumb-item
          >
          <n-breadcrumb-item>{{ task.currentProject.name }}</n-breadcrumb-item>
        </n-breadcrumb>
      </template>
      <template #avatar v-if="task.currentProject">
        {{ task.currentProject.icon }}
      </template>
      <template #extra>
        <n-space>
          <n-tooltip>
            <template #trigger>
              <n-button
                @click="
                  () => {
                    currentProject.is_pinned = !currentProject.is_pinned;
                    handleUpdateProject();
                  }
                "
                text
                style="font-size: 1.5rem"
              >
                <n-icon>
                  <pinned-off v-if="currentProject.is_pinned" />
                  <pin v-else />
                </n-icon>
              </n-button>
            </template>
            <p v-if="currentProject.is_pinned">Unpin from sidebar</p>
            <p v-else>Pin to sidebar</p>
          </n-tooltip>
          <n-tooltip>
            <template #trigger>
              <n-button
                @click="
                  () => {
                    currentProject.is_favorite = !currentProject.is_favorite;
                    handleUpdateProject();
                  }
                "
                text
                style="font-size: 1.3rem"
              >
                <n-icon>
                  <star-outline v-if="!currentProject.is_favorite" />
                  <star v-else />
                </n-icon>
              </n-button>
            </template>
            <p v-if="currentProject.is_favorite">Remove from favorites</p>
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
        ref="addBtnRef"
        v-motion-slide-top
        v-if="currentProject.is_editable && !taskFormIsShown"
        @click="taskFormIsShown = true"
        @scroll="handleButtonScroll"
        :style="{
          marginBottom: '15px',
        }"
        strong
        secondary
        round
        type="primary"
      >
        <template #icon>
          <n-icon size="20">
            <add-circle />
          </n-icon>
        </template>
        Add task
      </n-button>
      <todo-create-form
        @updateProject="task.fetchProject(route.params.id)"
        @close-task-form="taskFormIsShown = false"
        v-motion-slide-bottom
        v-if="taskFormIsShown"
      />
      <task-item
        v-for="(task, i) in currentTasks"
        @show-task-details="showTaskDetails"
        @changeTaskStatus="changeTaskStatus"
        :task="task"
        v-motion-pop
        :delay="i * 100"
        :key="i"
      ></task-item>

      <Vue3Lottie
        v-if="currentTasks.length == 0"
        id="project-no-data"
        :animationData="filler"
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
      <n-drawer-content title="Edit task" id="edit-task-drawer">
        <task-edit :task="currentTask" />
        <template #footer>
          <n-space>
            <n-button @click="handleDeleteTask" type="error"
              >Delete Task</n-button
            >
          </n-space>
          <n-space>
            <n-button
              @click="taskDetailIsShown = false"
              strong
              secondary
              type="error"
              >Cancel</n-button
            >
            <n-button @click="handleUpdateTask" strong secondary type="success"
              >Save</n-button
            >
          </n-space>
        </template>
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
#edit-task-drawer .n-drawer-footer {
  justify-content: space-between;
}
</style>
