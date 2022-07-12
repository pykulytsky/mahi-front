<script>
import {ref, watch, nextTick} from "vue"
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NDynamicTags,
  NAutoComplete,
  NIcon,
  NSpace
} from "naive-ui";
import { AddOutline } from "@vicons/ionicons5";
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
    NSpace
  },
  setup() {
    const autoCompleteInstRef = ref(null);
    const inputValueRef = ref("");
    const options = [
      "shop",
      "grocery",
      "sport",
      "family",
      "Kate"
    ]
    return {
      autoCompleteInstRef,
      tags: ref(["Teacher", "Programmer"]),
      inputValue: inputValueRef,
      options
    }
  },
};
</script>
<template>
  <div class="todo-form">
    <n-input id="todo-title-input"></n-input>
    <n-input
      id="todo-desc-input"
      type="textarea"
      :autosize="{
        minRows: 2,
      }"
    ></n-input>
    <div id="todo-input-bottom">
      <div id="todo-input-bottom-left">
        <n-dynamic-tags>
          <template #input="{ submit, deactivate }">
            <n-auto-complete
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
              @click="activate()"
            >
              <template #icon>
                <n-icon>
                  <add-outline />
                </n-icon>
              </template>
              New Tag
            </n-button>
          </template>
        </n-dynamic-tags>
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
</style>
