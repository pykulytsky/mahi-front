<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Vue3Lottie } from "vue3-lottie";
import loader from "../assets/lottie/loader.json";
import { useCommonStore } from "../stores/common";
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";
export default {
  components: {
    Vue3Lottie,
  },
  setup() {
    const loaded = ref(false);
    const router = useRouter();
    const common = useCommonStore();
    const task = useTaskStore();
    const { isLoading } = storeToRefs(common);
    const { projects, tags, pinned, favorites } = storeToRefs(task);
    onMounted(() => {
      if (
        !isLoading.value &&
        projects.value !== null &&
        tags.value !== null &&
        pinned.value !== null &&
        favorites !== null
      ) {
        router.push("/app/today");
      } else {
        setTimeout(() => {
          if (
            !isLoading.value &&
            projects.value !== null &&
            tags.value !== null &&
            pinned.value !== null &&
            favorites !== null
          ) {
            router.push("/app/today");
          }
        }, 500);
      }
    });

    return {
      loader,
      common,
      task,
    };
  },
};
</script>
<template>
  <main>
    <Vue3Lottie :animationData="loader" :height="750" :width="750" />
    <h3 style="text-align: center">Preparing some stuff...</h3>
  </main>
</template>
<style>
#loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
