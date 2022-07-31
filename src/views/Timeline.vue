<script>
import { ref, onMounted } from "vue";
import { NRadioGroup, NRadioButton, NTimeline, NTimelineItem } from "naive-ui";
import { fetchActivity } from "../api/projects.api";
export default {
  components: {
    NRadioGroup,
    NRadioButton,
    NTimeline,
    NTimelineItem,
  },
  setup() {
    const showBy = ref(5);
    const activities = ref(null);

    onMounted(() => {
      fetchActivity().then((response) => {
        activities.value = response.data;
        console.log(activities);
      });
    });

    return {
      showBy,
      activities,
      getActivityType(action) {
        switch (action) {
          case "created":
            return "success";
          case "updated":
            return "warning";
          case "deleted":
            return "error";
          default:
            return "info";
        }
      },
      getActivityTarget(activity) {
        if (activity.task_id !== null) {
          return `task #${activity.task_id}`
        }
        if (activity.tag_id !== null) {
          return `tag #${activity.tag_id}`
        }
        if (activity.project_id !== null) {
          return `project #${activity.project_id}`
        }
      }
    };
  },
};
</script>
<template>
  <main>
    <div id="timeline-header">
      <h1>Your activity</h1>
      <n-radio-group v-model:value="showBy" size="small">
        <n-radio-button :default-checked="true" value="5"> 5 </n-radio-button>
        <n-radio-button value="10"> 10 </n-radio-button>
        <n-radio-button value="25"> 25 </n-radio-button>
      </n-radio-group>
    </div>
    <div id="timeline">
      <n-timeline size="large">
        <n-timeline-item
          v-for="activity in activities"
          :key="activity.id"
          :type="getActivityType(activity.action)"
          content="success content"
          :time="activity.created"
        >
          <h3>{{ activity.actor.first_name }} {{ activity.actor.last_name }} {{activity.action}} {{getActivityTarget(activity)}}</h3>
        </n-timeline-item>
      </n-timeline>
    </div>
  </main>
</template>
<style>
#timeline-header {
  padding: 3vh 4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#timeline {
  padding-left: 5vw;
}
</style>
