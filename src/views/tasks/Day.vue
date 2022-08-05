<script>
import { NPageHeader, NIcon, NDivider, NButton } from "naive-ui";
import { CalendarOutline, ArrowForward } from "@vicons/ionicons5"
import { useRoute } from "vue-router"
import { ref } from "vue"
export default {
  components: {
    NPageHeader,
    NIcon,
    CalendarOutline,
    NDivider,
    NButton,
    ArrowForward
  },
  setup() {
    const route = useRoute()
    const tasks = ref(null)
    return {
      route,
      toPreviousDate() {},
    };
  },
};
</script>
<template>
  <main>
    <n-page-header @back="toPreviousDate">
      <template #title>
        <h1 id="day-title">
          {{ route.params.date }}
        </h1>
      </template>
      <template #avatar>
        <n-icon>
          <calendar-outline />
        </n-icon>
      </template>
      <template #subtitle>
        <n-button text style="font-size: 1.3rem; margin-top: 7px;">
          <n-icon>
            <arrow-forward />
          </n-icon>
        </n-button>
      </template>
    </n-page-header>
    <n-divider />
  </main>
</template>
<style>
#day-title {
  font-family: "Josefin Sans";
  margin-top: 7px;
}
</style>
