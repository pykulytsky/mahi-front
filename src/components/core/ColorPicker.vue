<script>
import { NSpace } from "naive-ui";
import { computed } from "vue";
export default {
  components: {
    NSpace,
  },
  props: {
    value: {
      type: String,
      default: () => "",
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const colors = [
      "#ff7373",
      "#bada55",
      "#ffb6c1",
      "#666666",
      "#7fffd4",
      "#66cdaa",
      "#afeeee",
    ];
    const pickedColor = computed({
      get: () => props.value,
      set: (value) => emit("update:value", value),
    });
    return {
      colors,
      pickedColor,
      handleSelectColor(color) {
        if (pickedColor.value == color) {
          pickedColor.value = null
        } else {
          pickedColor.value = color
        }
      }
    };
  },
};
</script>
<template>
  <div id="color-picker">
    <n-space align="center">
      <div
        @click="handleSelectColor(color)"
        v-for="(color, i) in colors"
        :key="i"
        :class="pickedColor == color ? 'color-active' : 'color'"
        :style="{ backgroundColor: color }"
      ></div>
    </n-space>
  </div>
</template>
<style>
.color {
  border-radius: 50%;
  height: 25px;
  width: 25px;
  cursor: pointer;
  transition: outline 0.3s ease-in-out;
}
.color:hover {
  transform: scale(1.2);
}
.color-active {
  border-radius: 10px;
  height: 35px;
  width: 35px;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
  background: var(--primary-color);
}
</style>
