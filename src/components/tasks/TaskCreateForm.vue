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
  NSlider,
  NSelect,
  NPopselect,
  NPopover
} from "naive-ui";
import {
  CalendarOutline,
  AlarmOutline,
  PricetagOutline,
  ColorFilterOutline,
  Warning,
  WarningOutline,
  Star,
  StarOutline,
  Alarm
} from "@vicons/ionicons5";
import { ExclamationMark } from "@vicons/tabler";
import { storeToRefs } from "pinia";
import { addTask } from "../../api/tasks.api";
import { addTag } from "../../api/tags.api";
import { useTaskStore } from "../../stores/task";
import { useCommonStore } from "../../stores/common";
import { useRoute } from "vue-router";
import ColorPicker from "../core/ColorPicker.vue";
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
    NSlider,
    ColorPicker,
    ColorFilterOutline,
    NSelect,
    Warning,
    WarningOutline,
    Star,
    StarOutline,
    NPopselect,
    Alarm,
    NPopover
  },
  emits: ["closeTaskForm", "updateProject"],
  setup(props, ctx) {
    const task = useTaskStore();
    const route = useRoute();
    const common = useCommonStore();
    const { tags } = storeToRefs(task);
    const autoCompleteInstRef = ref(null);
    const inputValueRef = ref("");
    const message = useMessage();
    const datePickerIsShown = ref(false);
    const priority = ref(null);
    const reminder = ref(null)
    const customReminderPopover = ref(false)
    const newTask = ref({
      name: null,
      description: null,
      tags: [],
      deadline:
        route.name == "day"
          ? new Date(route.params.date).toISOString().split("T")[0]
          : null,
      priority: null,
      color: null,
      isImportant: false,
      remind_at: null
    });

    const projects = computed(() => {
      if (route.name == "day") {
        let existedProjects = [];
        task.projects.forEach((project) => {
          existedProjects.push({
            label: project.name,
            value: project.id,
          });
        });
        return existedProjects;
      } else {
        return null;
      }
    });
    const project = ref(null);

    function isValidDate(d) {
      if (Object.prototype.toString.call(d) === "[object Date]") {
        // it is a date
        return !isNaN(d);
      } else {
        return false
      }
    }

    watch(priority, (value) => {
      switch (value) {
        case 0:
          newTask.value.priority = "LOW";
          break;
        case 33:
          newTask.value.priority = "NORMAL";
          break;
        case 66:
          newTask.value.priority = "HIGH";
          break;
        case 100:
          newTask.value.priority = "VERY HIGH";
          break;
      }
    });
    watch(reminder, (value) => {
      const date = new Date(value)
      if (value !== null) {
        if (isValidDate(date)) {
          newTask.value.remind_at = date
        } else if(value == "custom") {
          customReminderPopover.value = true
        }
      }
    })

    return {
      autoCompleteInstRef,
      newTask,
      task,
      route,
      tags,
      projects,
      project,
      reminder,
      customReminderPopover,
      datePickerIsShown,
      inputValue: inputValueRef,
      prioritySteps: {
        0: "Low",
        33: "Normal",
        66: "High",
        100: "Very high",
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
          const projectID =
            route.name == "day" ? project.value : task.currentProject.id;
          console.log(projectID);
          addTask(
            newTask.value.name,
            projectID,
            newTask.value.description,
            newTask.value.deadline,
            newTask.value.priority,
            newTask.value.color,
            newTask.value.isImportant
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
      reminderDateDisabled(date) {
        const now = new Date()
        return new Date(date) < now
      },
      reminderTimeDisabled(time) {
        const now = new Date()
        const selected = new Date(time)
        return {
          isHourDisabled: (hour) => {
            return hour < now.getHours()
          },
          isMinuteDisabled: (minute) => {
            return minute <= now.getMinutes()
          }
        }
      }
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
        <n-tooltip
          trigger="hover"
          v-if="!datePickerIsShown && route.name !== 'day'"
        >
          <template #trigger>
            <n-button
              @click="datePickerIsShown = true"
              text
              style="font-size: 1.2rem"
            >
              <n-icon>
                <calendar-outline />
              </n-icon>
            </n-button>
          </template>
          Add deadline
        </n-tooltip>
        <n-date-picker
          style="width: 11vw"
          v-motion-slide-bottom
          size="small"
          v-if="datePickerIsShown"
          v-model:formatted-value="newTask.deadline"
          type="date"
          value-format="yyyy-MM-dd"
        />
        <n-select
          style="width: 10vw"
          v-model:value="project"
          :options="projects"
          placeholder="Select project"
          v-if="route.name == 'day'"
        />
        <n-popover trigger="manual" :show="customReminderPopover">
          <template #trigger>
          <n-popselect v-model:value="reminder" :options="task.reminderOptions" trigger="click">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button text style="font-size: 1.2rem">
                  <n-icon v-if="!newTask.remind_at">
                    <alarm-outline />
                  </n-icon>
                  <n-icon v-else>
                    <alarm />
                  </n-icon>
                </n-button>
              </template>
              Add reminder
            </n-tooltip>
          </n-popselect>
          </template>
          <n-date-picker
            v-click-outside="() => {
            customReminderPopover = false
            }"
            panel
            type="datetime"
            :is-date-disabled="reminderDateDisabled"
            :is-time-disabled="reminderTimeDisabled"
          />
        </n-popover>
        <n-tooltip>
          <template #trigger>
            <n-button @click="newTask.isImportant = !newTask.isImportant" text style="font-size: 1.2rem">
              <n-icon>
                <star-outline v-if="!newTask.isImportant" />
                <star v-else />
              </n-icon>
            </n-button>
          </template>
          Mark as important
        </n-tooltip>
        <n-popconfirm
          :show-icon="false"
          :positive-text="null"
          :negative-text="null"
        >
          <template #trigger>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button
                  text
                  style="font-size: 1.2rem"
                  v-if="newTask.color == null"
                >
                  <template #icon>
                    <n-icon>
                      <color-filter-outline />
                    </n-icon>
                  </template>
                </n-button>
                <div
                  v-else
                  :style="{
                    cursor: 'pointer',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: newTask.color,
                  }"
                ></div>
              </template>
              Set color
            </n-tooltip>
          </template>
          <color-picker v-model:value="newTask.color" />
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
@media screen and (max-width: 720px) {
  .task-form {
    width: 95vw;
  }
}
</style>
