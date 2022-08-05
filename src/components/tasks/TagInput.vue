<script>
import { ref, computed, watch, onMounted } from "vue";
import {
  NTag,
  NDynamicInput,
  NDynamicTags,
  NButton,
  NIcon,
  NAutoComplete,
} from "naive-ui";
import { useTaskStore } from "../../stores/task";
import { PricetagOutline } from "@vicons/ionicons5";
export default {
  components: {
    NTag,
    NDynamicInput,
    NDynamicTags,
    NButton,
    NIcon,
    PricetagOutline,
    NAutoComplete,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    existedTags: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const task = useTaskStore();
    const autoCompleteInstRef = ref(null);
    const inputValueRef = ref("");
    const tags = ref(props.existedTags.map((tag) => tag.name));

    onMounted(() => {
      emit("update:value", tags)
    })

    watch(tags, (value) => {
      emit("update:value", value)
    })

    return {
      inputValue: inputValueRef,
      task,
      tags,
      options: computed(() => {
        if (inputValueRef.value === "") {
          return task.tags.map((tag) => {
            return tag.name;
          });
        }
        return task.tags
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
    };
  },
};
</script>
<template>
  <n-dynamic-tags v-model:value="tags">
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
</template>
