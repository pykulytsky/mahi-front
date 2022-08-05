<script>
import { ref } from "vue";
import {
  NCard,
  NForm,
  NInput,
  NFormItem,
  NSpace,
  NButton,
  NIcon,
  NTooltip,
  NModal,
  NDivider,
  NSwitch,
  useMessage,
} from "naive-ui";
import { HappyOutline } from "@vicons/ionicons5";
import ColorPicker from "../core/ColorPicker.vue";
import EmojiPicker from "../core/EmojiPicker.vue";
import { Star, StarOutline } from "@vicons/ionicons5";
import { Pin, PinnedOff } from "@vicons/tabler";
import { createProject } from "../../api/projects.api";
import { useRouter } from "vue-router";
import { useTaskStore } from "../../stores/task";
export default {
  components: {
    NCard,
    NInput,
    NSpace,
    NButton,
    NIcon,
    NTooltip,
    NModal,
    HappyOutline,
    ColorPicker,
    NDivider,
    EmojiPicker,
    NForm,
    NFormItem,
    NSwitch,
    Star,
    StarOutline,
    Pin,
    PinnedOff,
  },
  emits: ["closeModal"],
  setup(props, {emit}) {
    const message = useMessage();
    const router = useRouter();
    const task = useTaskStore();
    const project = ref({
      name: null,
      description: null,
      color: null,
      icon: null,
      isFavorite: false,
      isPinned: false,
    });
    return {
      emojiPicker: ref(false),
      project,
      Star,
      StarOutline,
      Pin,
      PinnedOff,
      handleCreateProject() {
        createProject(project.value)
          .then((response) => {
            message.success("Project was successfuly created");
            task.fetchProjects();
            router.push("/app/project/" + response.data.id);
            emit("closeModal")
          })
          .catch(() => {
            message.error("An error occured while creating new project");
          });
      },
    };
  },
};
</script>
<template>
  <n-card id="project-create" title="Add new project">
    <n-form>
      <n-form-item path="name" label="Project name">
        <n-input
          v-model:value="project.name"
          placeholder=""
          id="project-name"
        ></n-input>
      </n-form-item>
      <n-form-item path="description" label="Description">
        <n-input
          v-model:value="project.description"
          id="project-desc-input"
          type="textarea"
          placeholder=""
          :autosize="{
            minRows: 2,
            maxRows: 3,
          }"
        ></n-input>
      </n-form-item>

      <n-divider title-placement="left">Add accent color</n-divider>
      <n-space justify="center">
        <color-picker v-model:value="project.color" />
      </n-space>
      <n-divider title-placement="left">Add icon</n-divider>
      <n-space justify="center">
        <emoji-picker v-model:value="project.icon" />
      </n-space>
      <n-divider />
      <n-space justify="space-between" id="additional-options">
        <n-space align="center">
          <n-switch v-model:value="project.isFavorite" size="large">
            <template #checked-icon>
              <n-icon :component="Star" />
            </template>
            <template #unchecked-icon>
              <n-icon :component="StarOutline" />
            </template>
          </n-switch>
          Add to favorites
        </n-space>
        <n-space align="center">
          <n-switch v-model:value="project.isPinned" size="large">
            <template #checked-icon>
              <n-icon :component="Pin" />
            </template>
            <template #unchecked-icon>
              <n-icon :component="PinnedOff" />
            </template>
          </n-switch>
          Pin to sidebar
        </n-space>
      </n-space>
    </n-form>
    <template #action>
      <n-space justify="end">
        <n-button @click="$emit('closeModal')" type="error">Cancel</n-button>
        <n-button
          @click="handleCreateProject"
          :disabled="project.name == null || project.name.length < 1"
          type="success"
          >Add</n-button
        >
      </n-space>
    </template>
  </n-card>
</template>
<style>
#project-create {
  width: 35vw;
  font-family: "Comfortaa";
}
@media screen and (max-width: 720px) {
  #project-create {
    width: 85vw;
  }
}
#name-input {
  display: flex;
  align-items: center;
}
#additional-options {
  margin-top: 20px;
}
</style>
