<script>
import {ref} from "vue"
import {
  NPageHeader,
  NBreadcrumb,
  NBreadcrumbItem,
  NDivider,
  NDropdown,
  NButton,
  NIcon,
  NSpace
} from "naive-ui";
import { VuemojiPicker} from 'vuemoji-picker'
import { EllipsisHorizontalCircle } from "@vicons/ionicons5";
export default {
  components: {
    NPageHeader,
    NBreadcrumb,
    NBreadcrumbItem,
    NDivider,
    VuemojiPicker,
    NDropdown,
    NButton,
    NIcon,
    EllipsisHorizontalCircle,
    NSpace
  },
  setup() {
    const emoji = ref(null)
    return {
      emoji,
      handleBack() {},
      handleEmojiClick(em) {
        emoji.value = em.unicode
      },
    };
  },
};
</script>
<template>
  <main>
    <n-page-header @back="handleBack">
      <template #title>
        <h1 class="todolist-title">Lorem ipsum dolor sit.</h1>
      </template>
      <template #header>
        <n-breadcrumb>
          <n-breadcrumb-item>Todo lists</n-breadcrumb-item>
          <n-breadcrumb-item>Lorem ipsum dolor sit.</n-breadcrumb-item>
        </n-breadcrumb>
      </template>
      <template #avatar>
        {{emoji}}
      </template>
      <template #extra>
        <n-space>
          <n-dropdown>
            <n-button text style="font-size: 1.5rem;">
              <n-icon>
                <ellipsis-horizontal-circle />
              </n-icon>
            </n-button>
          </n-dropdown>
        </n-space>
      </template>
    </n-page-header>
    <n-divider />
    <div class="todolist">
      <VuemojiPicker @emojiClick="handleEmojiClick" />
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h1>Lorem ipsum dolor sit amet.</h1>
    </div>
  </main>
</template>
<style>
.todolist {
  margin-bottom: 35px;
}
.n-page-header .n-page-header__avatar {
  font-size: 3rem;
}
.n-page-header-wrapper {
  padding: 2% 5%;
}
</style>
