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
} from "naive-ui";
import { AddOutline, CalendarOutline, AlarmOutline } from "@vicons/ionicons5";
export default {
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NIcon,
    NDynamicTags,
    NAutoComplete,
    AddOutline,
    NSpace,
    CalendarOutline,
    AlarmOutline,
    NTooltip,
  },
  setup() {
    const autoCompleteInstRef = ref(null);
    const inputValueRef = ref("");
    const optionsDefault = ["shop", "grocery", "sport", "family", "Kate"];
    return {
      autoCompleteInstRef,
      tags: ref([]),
      inputValue: inputValueRef,
      options: computed(() => {
        if (inputValueRef.value === "") {
         return optionsDefault
        }
        return optionsDefault.filter((option) =>
          option.includes(inputValueRef.value)
        );
      }),
      activate() {
        setTimeout(() => {
          autoCompleteInstRef.value?.focus()
        }, 100)
      }
    };
  },
};
</script>
<template>
  <div class="todo-form">
    <n-input placeholder="Task name" id="todo-title-input"></n-input>
    <n-input
      id="todo-desc-input"
      type="textarea"
      placeholder="Description"
      :autosize="{
        minRows: 2,
        maxRows: 9
      }"
    ></n-input>
    <div id="todo-input-bottom">
      <div id="todo-input-bottom-left">
        <n-dynamic-tags>
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
                  <add-outline />
                </n-icon>
              </template>
              Add tags
            </n-button>
          </template>
        </n-dynamic-tags>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button strong secondary circle>
              <template #icon>
                <n-icon>
                  <calendar-outline />
                </n-icon>
              </template>
            </n-button>
          </template>
          Add deadline
        </n-tooltip>
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

      <div id="todo-input-bottom-right">
        <n-space>
          <n-button strong secondary type="error">Cancel</n-button>
          <n-button strong secondary type="success">Add task</n-button>
        </n-space>
      </div>
    </div>
  </div>
</template>
<style>
.todo-form {
  width: 75vw;
  padding: 1%;
  border: 1px solid #e28163ff;
  border-radius: 5px;
}
#todo-title-input,
#todo-desc-input {
  border-radius: 0;
  font-size: 1rem;
}
#todo-title-input {
  border-radius: 5px 5px 0 0;
}
#todo-desc-input {
  border-radius: 0 0 5px 5px;
}
#todo-input-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 1%;
}
#todo-input-bottom-left {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>
