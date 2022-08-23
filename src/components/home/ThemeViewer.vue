<script>
import {ref} from "vue"
import { NIcon } from "naive-ui"
import { Sun } from "@vicons/tabler"
import { HalfMoonIcon } from "iconoir-vue";

export default {
  components: {
    NIcon,
    Sun,
    HalfMoonIcon
  },
  setup() {
    const selectedTheme = ref("light")
    return {
      selectedTheme,
      selectTheme(value) {
        selectedTheme.value = value
      }
    }
  }
}
</script>
<template>
  <div id="theme-viewer">
    <h1 id="theme-header" v-motion-slide-visible-once-bottom>Fully customizing task management tool 🛠️</h1>
    <div id="switch" v-motion-slide-visible-once-bottom :delay="300">
      <button @click="selectTheme('light')" :class="{'theme-switch': true, 'switch-selected': selectedTheme === 'light'}" id="switch-left">
        <n-icon>
          <sun />
        </n-icon>
        Light
      </button>
      <button @click="selectTheme('dark')" :class="{'theme-switch': true, 'switch-selected': selectedTheme === 'dark'}" id="switch-right">
        Dark
        <n-icon>
          <half-moon-icon />
        </n-icon>
      </button>
    </div>
    <div id="theme-preview" v-motion-slide-visible-once-bottom :delay="600">
      <img v-if="selectedTheme === 'dark'" v-motion-fade src="../../assets/dark.png" id="theme" alt="">
      <img v-else v-motion-fade src="../../assets/light.png" id="theme" alt="">
    </div>
  </div>
</template>
<style>
#theme-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(0, -45vh);
}
#theme {
  width: 60vw;
  border-radius: 10px;
}
.theme-switch {
  backdrop-filter: blur(25px);
  background: none;
  border: none;
  font-size: 1.2rem;
  padding: 5px 15px;
  cursor: pointer;
  background: rgba(87, 84, 94, 0.4);
  transition: all .2s linear;
}
#switch {
  margin-bottom: 10px;
}
.switch-selected {
  background: #ffa;
}

#switch-left {
  border-radius: 15px 0 0 15px;
}
#switch-right {
  border-radius: 0 15px 15px 0;
}
#theme-header {
  margin-bottom: 5vh;
  font-family: "Avenir";
  font-size: 2.5rem;
}
</style>