import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vfonts/Inter.css'

import App from './App.vue'
import router from './router'

import ScrollParallax from 'vue3-parallax/src/components/ScrollParallax.vue';

import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import { vElementVisibility } from '@vueuse/components'
import VueObserveVisibility from 'vue-observe-visibility'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('scroll-parallax', ScrollParallax);
app.use(Vue3Lottie)
app.directive('element-visibility', vElementVisibility)
app.use(VueObserveVisibility)

app.mount('#app')
