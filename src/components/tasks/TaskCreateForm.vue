<script>
import { ref, computed } from "vue";
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
  NDatePicker
} from "naive-ui";
import { CalendarOutline, AlarmOutline, PricetagOutline } from "@vicons/ionicons5";
import { storeToRefs } from "pinia";
import { addTask } from "../../api/tasks.api";
import { useTaskStore } from "../../stores/task";
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
    NDatePicker
  },
  emits: ["closeTaskForm", "updateProject"],
  setup(props, ctx) {
    const task = useTaskStore()
    const {tags} = storeToRefs(task)
    const autoCompleteInstRef = ref(null);
    const inputValueRef = ref("");
    const message = useMessage();
    const datePickerIsShown = ref(false)
    const newTask = ref({
      name: null,
      description: null,
      tags: [],
      deadline: null,
    });
    return {
      autoCompleteInstRef,
      newTask,
      task,
      tags,
      datePickerIsShown,
      inputValue: inputValueRef,
      options: computed(() => {
        if (inputValueRef.value === "") {
          return tags.value.map(tag => {
            return tag.name
          });
        }
        return tags.value.filter((option) =>
          option.name.includes(inputValueRef.value)
        ).map(tag => {
          return tag.name
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
          console.log(newTask.value);
          addTask(
            newTask.value.name,
            task.currentProject.id,
            newTask.value.description,
            newTask.value.deadline
          )
          .then(() => {
            ctx.emit("updateProject")
            ctx.emit("closeTaskForm")
          })
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
            <n-button @click="datePickerIsShown = true" strong secondary circle >
              <template #icon>
                <n-icon>
                  <calendar-outline />
                </n-icon>
              </template>
            </n-button>
          </template>
          Add deadline
        </n-tooltip>
        <n-date-picker v-motion-slide-bottom size="small" v-if="datePickerIsShown" v-model:formatted-value="newTask.deadline" type="date" value-format="yyyy-MM-dd" />
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
          <n-button :disabled="newTask.name == '' || newTask.name == null" @click="handleAddTask" strong secondary type="success"
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
  border: 1px solid #e28163ff;
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
