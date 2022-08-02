<script>
import { ref, computed, watch } from "vue";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NDynamicTags,
  NAutoComplete,
  NIcon,
  NSpace,
  NTooltip,
  useMessage,
  NDatePicker,
  NPopconfirm,
  NSlider
} from "naive-ui";
import {
  CalendarOutline,
  AlarmOutline,
  PricetagOutline,
} from "@vicons/ionicons5";
import { ExclamationMark } from "@vicons/tabler";
import { storeToRefs } from "pinia";
import { addTask } from "../../api/tasks.api";
import { addTag } from "../../api/tags.api";
import { useTaskStore } from "../../stores/task";
import { useCommonStore } from "../../stores/common";
export default {
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NIcon,
    NDynamicTags,
    NAutoComplete,
    PricetagOutline,
    NSpace,
    CalendarOutline,
    AlarmOutline,
    NTooltip,
    NDatePicker,
    ExclamationMark,
    NPopconfirm,
    NSlider
  },
  emits: ["closeTaskForm", "updateProject"],
  setup(props, ctx) {
    const task = useTaskStore();
    const common = useCommonStore();
    const { tags } = storeToRefs(task);
    const autoCompleteInstRef = ref(null);
    const inputValueRef = ref("");
    const message = useMessage();
    const datePickerIsShown = ref(false);
    const priority = ref(null)
    const newTask = ref({
      name: null,
      description: null,
      tags: [],
      deadline: null,
      priority: null
    });

    watch(priority, (value) => {
      switch(value) {
        case 0:
          newTask.value.priority = "LOW"
          break;
        case 33:
          newTask.value.priority = "NORMAL"
          break;
        case 66:
          newTask.value.priority = "HIGH"
          break;
        case 100:
          newTask.value.priority = "VERY HIGH"
          break;
      }
    })

    return {
      autoCompleteInstRef,
      newTask,
      task,
      tags,
      datePickerIsShown,
      inputValue: inputValueRef,
      prioritySteps: {
        0: "Low",
        33: "Normal",
        66: "High",
        100: "Very high"
      },
      priority,
      options: computed(() => {
        if (inputValueRef.value === "") {
          return tags.value.map((tag) => {
            return tag.name;
          });
        }
        return tags.value
          .filter((option) => option.name.includes(inputValueRef.value))
          .map((tag) => {
            return tag.name;
          });
      }),
      activate() {
        setTimeout(() => {
          autoCompleteInstRef.value?.focus();
        }, 100);
      },
      handleAddTask() {
        if (newTask.value.name == null || newTask.value.name == null) {
          message.error("Fill the task name.");
        } else {
          common.setLoading(true);
          addTask(
            newTask.value.name,
            task.currentProject.id,
            newTask.value.description,
            newTask.value.deadline,
            newTask.value.priority,
          ).then((response) => {
            newTask.value.tags.forEach((tag) => {
              addTag(
                task.tags.filter((t) => t.name == tag)[0].id,
                response.data.id
              );
            });
            ctx.emit("updateProject");
            ctx.emit("closeTaskForm");
            common.setLoading(false);
          });
        }
      },
    };
  },
};
</script>
<template>
  <div class="task-form">
    <n-input
      :status="newTask.name == '' ? 'error' : 'success'"
      v-model:value="newTask.name"
      placeholder="Task name"
      id="task-title-input"
    ></n-input>

    <n-input
      v-model:value="newTask.description"
      id="task-desc-input"
      type="textarea"
      placeholder="Description"
      :autosize="{
        minRows: 2,
        maxRows: 9,
      }"
    ></n-input>
    <div id="task-input-bottom">
      <div id="task-input-bottom-left">
        <n-dynamic-tags v-model:value="newTask.tags">
          <template #input="{ submit, deactivate }">
            <n-auto-complete
              :get-show="() => true"
              ref="autoCompleteInstRef"
              v-model:value="inputValue"
              size="small"
              :options="options"
              placeholder="Search tags"
              :clear-after-select="true"
              @select="submit($event)"
              @blur="deactivate"
            />
          </template>
          <template #trigger="{ activate, disabled }">
            <n-button
              size="small"
              type="primary"
              dashed
              :disabled="disabled"
              @click="activate"
            >
              <template #icon>
                <n-icon>
                  <pricetag-outline />
                </n-icon>
              </template>
              Add tags
            </n-button>
          </template>
        </n-dynamic-tags>
        <n-tooltip trigger="hover" v-if="!datePickerIsShown">
          <template #trigger>
            <n-button @click="datePickerIsShown = true" strong secondary circle>
              <template #icon>
                <n-icon>
                  <calendar-outline />
                </n-icon>
              </template>
            </n-button>
          </template>
          Add deadline
        </n-tooltip>
        <n-date-picker
          v-motion-slide-bottom
          size="small"
          v-if="datePickerIsShown"
          v-model:formatted-value="newTask.deadline"
          type="date"
          value-format="yyyy-MM-dd"
        />
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button strong secondary circle>
              <template #icon>
                <n-icon>
                  <alarm-outline />
                </n-icon>
              </template>
            </n-button>
          </template>
          Add reminder
        </n-tooltip>
        <n-popconfirm :show-icon="false" :positive-text="null" :negative-text="null">
          <template #trigger>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button strong secondary circle>
              <template #icon>
                <n-icon>
                  <exclamation-mark />
                </n-icon>
              </template>
            </n-button>
          </template>
          Add priority
        </n-tooltip>
          </template>
            <n-space vertical style="width: 250px; margin-right: 10px">
              <n-slider step="mark" :tooltip="false" v-model:value="priority" :marks="prioritySteps" />
            </n-space>
        </n-popconfirm>

      </div>

      <div id="task-input-bottom-right">
        <n-space>
          <n-button
            @click="$emit('closeTaskForm')"
            strong
            secondary
            type="error"
            >Cancel</n-button
          >
          <n-button
            :disabled="newTask.name == '' || newTask.name == null"
            @click="handleAddTask"
            strong
            secondary
            type="success"
            >Add task</n-button
          >
        </n-space>
      </div>
    </div>
  </div>
</template>
<style>
.task-form {
  width: 75vw;
  padding: 1%;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
}
#task-title-input,
#task-desc-input {
  border-radius: 0;
  font-size: 1rem;
}
#task-title-input {
  border-radius: 5px 5px 0 0;
}
#task-desc-input {
  border-radius: 0 0 5px 5px;
}
#task-input-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 1%;
}
#task-input-bottom-left {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>
