<script>
import { NForm, NFormItem, NInput} from 'naive-ui'
import { ref } from 'vue'
import TagInput from "../../components/tasks/TagInput.vue"
import ColorPicker from "../../components/core/ColorPicker.vue"
export default {
  components: {
    NForm,
    NFormItem,
    NInput,
    TagInput,
    ColorPicker
  },
  props: {
    task: Object,
    tags: Array
  },
  setup(props) {
    const formRef = ref(null)
    return {
      formRef,
      task: props.task,
      tags: props.tags
    }
  },
}
</script>
<template>
  <n-form ref="formRef" :model="task">
    <n-form-item path="name" label="Name">
      <n-input v-model:value="task.name"></n-input>
    </n-form-item>
    <n-form-item label="Description" path="description">
      <n-input
        v-model:value="task.description"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 9
        }"
      ></n-input>
    </n-form-item>
    <n-form-item label="Edit tags" path="tags">
      <tag-input v-model:value="tags" :existedTags="task.tags" />
      {{tags}}
    </n-form-item>
    <n-form-item label="Edit color" path="color">
      <color-picker v-model:value="task.color" />
    </n-form-item>
  </n-form>
</template>
