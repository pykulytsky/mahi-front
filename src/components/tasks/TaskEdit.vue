<script>
import { NForm, NFormItem, NInput} from 'naive-ui'
import { ref } from 'vue'
export default {
  components: {
    NForm,
    NFormItem,
    NInput,
  },
  props: {
    task: Object
  },
  setup(props) {
    const formRef = ref(null)
    return {
      formRef,
      task: props.task
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
  </n-form>
</template>
