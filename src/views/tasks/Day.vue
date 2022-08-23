<script>
import { NPageHeader, NIcon, NDivider, NButton, useMessage } from "naive-ui";
import { CalendarOutline, ArrowForward, AddCircle } from "@vicons/ionicons5";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";
import { fetchTasksByDate, updateTask } from "../../api/tasks.api";
import { useCommonStore } from "../../stores/common";
import Task from "../../components/tasks/Task.vue";
import TaskCreateForm from "../../components/tasks/TaskCreateForm.vue";
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
    TaskCreateForm,
  },
  setup() {
    const common = useCommonStore();
    const tasks = ref(null);
    const route = useRoute();
    const router = useRouter();
    const addBtnRef = ref(null);
    const taskFormIsShown = ref(false);
    const currentTask = ref(null);
    const taskDetailIsShown = ref(false);
    const message = useMessage()

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formatedDate = computed(() => {
      let date = new Date(route.params.date)
      return `${date.getDate()} ${months[date.getMonth()]}`
    })

    const updateDay = () => {
      fetchTasksByDate(route.params.date).then((response) => {
        tasks.value = response.data;
      });
    };

    onBeforeMount(() => {
      updateDay();
    });

    onBeforeRouteUpdate(() => {
      setTimeout(() => {
        updateDay();
      }, 1);
    });

    const getPreviousDay = () => {
      const date = new Date(route.params.date);
      const previous = new Date(date);
      previous.setDate(date.getDate() - 1);

      return previous.toISOString().split("T")[0];
    };
    const getNextDay = () => {
      const date = new Date(route.params.date);
      const next = new Date(date);
      next.setDate(date.getDate() + 1);

      return next.toISOString().split("T")[0];
    };

    return {
      common,
      router,
      route,
      tasks,
      addBtnRef,
      taskFormIsShown,
      updateDay,
      months,
      formatedDate,
      toPreviousDate() {
        const previousDate = getPreviousDay();
        router.push({
          name: "day",
          params: {
            date: previousDate,
          },
        });
      },
      toNextDate() {
        const nextDate = getNextDay();
        router.push({
          name: "day",
          params: {
            date: nextDate,
          },
        });
      },
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
  <main>
    <n-page-header @back="toPreviousDate">
      <template #title>
        <h1 id="day-title">
          {{ formatedDate }}
        </h1>
      </template>
      <template #avatar>
        <n-icon>
          <calendar-outline />
        </n-icon>
      </template>
      <template #subtitle>
        <n-button
          @click="toNextDate"
          text
          style="font-size: 1.3rem; margin-top: 7px"
        >
          <n-icon>
            <arrow-forward />
          </n-icon>
        </n-button>
      </template>
    </n-page-header>
    <n-divider />
    <div id="day">
      <n-button
        ref="addBtnRef"
        v-motion-slide-top
        v-if="new Date(route.params.date) >= new Date() && !taskFormIsShown"
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
          <n-icon size="20">
            <add-circle />
          </n-icon>
        </template>
        Add task
      </n-button>
      <task-create-form
        @updateProject="updateDay"
        @close-task-form="taskFormIsShown = false"
        v-motion-slide-bottom
        v-if="taskFormIsShown"
      />
      <task
        v-for="(task, i) in tasks"
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
