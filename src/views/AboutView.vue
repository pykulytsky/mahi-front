<script>
import ColorPicker from "../components/core/ColorPicker.vue"
import {ref} from "vue"
export default {
  components: {
    ColorPicker
  },
  setup() {
    const color = ref("")
    return {
      color
    }
  },
}
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
      <h1>This is an about page</h1>
      <color-picker v-model:value="color" />
      {{color}}
  </div>
</template>

<style scoped>
.about {
  margin-bottom: 35px;
}
</style>
