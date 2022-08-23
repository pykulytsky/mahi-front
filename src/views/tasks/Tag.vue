<script>
import { NPageHeader, NIcon, NDivider, NButton } from "naive-ui";
import { CalendarOutline, ArrowForward, AddCircle } from "@vicons/ionicons5";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";
import { updateTask } from "../../api/tasks.api";
import { useCommonStore } from "../../stores/common";
import { useTaskStore } from "../../stores/task";
import { fetchTag } from "../../api/tags.api";
import Task from "../../components/tasks/Task.vue";
import draggable from "vuedraggable";
export default {
  components: {
    NPageHeader,
    NIcon,
    CalendarOutline,
    NDivider,
    NButton,
    ArrowForward,
    AddCircle,
    Task,
    draggable,
  },
  setup() {
    const common = useCommonStore();
    const route = useRoute();
    const task = useTaskStore();
    const router = useRouter();
    const currentTask = ref(null);
    const taskDetailIsShown = ref(false);
    const tag = ref(null);

    onBeforeMount(() => {
      fetchTag(route.params.id).then((response) => {
        tag.value = response.data;
      });
    });

    onBeforeRouteUpdate(() => {
      setTimeout(() => {
        fetchTag(route.params.id).then((response) => {
          tag.value = response.data;
        });
      }, 1);
    });

    return {
      common,
      router,
      route,
      tag,
      showTaskDetails(task) {
        currentTask.value = task;
        taskDetailIsShown.value = true;
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
          updateDay();
          if (!currentTask.is_done) {
            message.success("1 task completed");
          }
          common.setLoading(false);
        });
      },
    };
  },
};
</script>
<template>
  <main v-if="tag !== null">
    <n-page-header>
      <template #title>
        <h1>
          {{ tag.name }}
        </h1>
      </template>
      <template #avatar>
        <n-icon>
          <calendar-outline />
        </n-icon>
      </template>
    </n-page-header>
    <n-divider />
    <div id="day">
      <task
        v-for="(task, i) in tag.tasks"
        @show-task-details="showTaskDetails"
        @changeTaskStatus="changeTaskStatus"
        :task="task"
        v-motion-pop
        :delay="i * 100"
        :key="i"
      ></task>
    </div>
  </main>
</template>
<style>
#day-title {
  font-family: "Josefin Sans";
  margin-top: 7px;
}
#day {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
