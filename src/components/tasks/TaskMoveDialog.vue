<script>
import { NCard, NMenu, NInput, useMessage } from "naive-ui"
import { ref, watch } from "vue"
import { useTaskStore } from "../../stores/task"
import { moveTask } from "../../api/tasks.api"
export default {
  components: {
    NCard,
    NMenu,
    NInput
  },
  emits: ["closeModal"],
  props: {
    task: Object
  },
  setup(props, {emit}) {
    const task = useTaskStore()
    const projectName = ref(null)
    const projects = ref([])
    const message = useMessage()

    watch(projectName, (value) => {
      if (projectName.value == null || projectName.value == "") {
        projects.value = []
      } else {
        let activeProjects = task.projects.filter(project => project.name.toLowerCase().includes(projectName.value))
        let menuOptions = []
        activeProjects.forEach(project => {
          menuOptions.push({
            label: project.name,
            key: project.id,
            icon: () => (project.icon !== null ? project.icon : "🥥"),
          })
        })
        projects.value = menuOptions
      }
    })

    return {
      task,
      projects,
      projectName,
      handleMoveTask(projectID) {
        moveTask(props.task.id, projectID).then(() => {
          message.success(`Task moved to project #${projectID}`)
          emit("closeModal")
        })
      }
    }
  },
}
</script>
<template>
  <n-card id="task-move">
    <n-input
      v-model:value="projectName"
      placeholder="Search projects"
    />
    <n-menu
      :options="projects"
      @update:value="handleMoveTask"
    >

    </n-menu>
  </n-card>
</template>
<style>
#task-move {
  width: 30vw;
}
@media screen and (max-width: 720px) {
  #task-move {
    width: 70vw;
  }
}
</style>
