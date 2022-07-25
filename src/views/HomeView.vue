<script>
import { NGradientText, NButton, NSpace } from "naive-ui";
import hand from "../assets/lottie/hand.json";
import { onMounted, onUnmounted } from "vue";
import VVanta from "vue-vanta/src/Vanta.vue";
import { useElementVisibility } from '@vueuse/core'
import { ref } from "vue";
import {useCommonStore} from "../stores/common"
export default {
  components: {
    NGradientText,
    VVanta,
    NButton,
    NSpace
  },
  setup() {
    const common = useCommonStore()
    const scrollTimeout = ref(null);
    const isScrolling = ref(false);
    const pauseAnimation = ref(true);
    const arrowRef = ref(null)
    const arrowIsVisible = useElementVisibility(arrowRef)
    const arrowRotageDeg = ref(0)
    const direction = ref("forward");
    const lastScrollTop = ref(0);
    const handleScroll = (event) => {

      if (arrowIsVisible.value) {
      arrowRef.value.style.transform = `rotate(${window.scrollY/2}deg)`
      }
      else {
        clearTimeout(scrollTimeout.value);
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop.value) {
          // downscroll code
          direction.value = "forward";
        } else {
          // upscroll code
          direction.value = "reverse";
        }
        arrowRef.value.style.transform = `rotate(${2*arrowRotageDeg.value}deg)`
        lastScrollTop.value = st <= 0 ? 0 : st;
        if (!isScrolling.value) {
          isScrolling.value = true;

          pauseAnimation.value = false;
        }
        scrollTimeout.value = setTimeout(() => {
          isScrolling.value = false;
          pauseAnimation.value = true;
        }, 100);
      }
    };
    onMounted(() => {
      common.setTheme("light")
      window.addEventListener("scroll", handleScroll);
      document.documentElement.style.overflow = "auto";
    });
    onUnmounted(() => {
      common.setTheme("dark")
      document.documentElement.style.overflow = "hidden";
    });
    const vantaOptions = {
      mouseControls: true,
      touchControls: true,
      minHeight: 750.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      blurFactor: 0.73,
      highlightColor: 0x965a04,
      midtoneColor: 0xca832e,
      lowlightColor: 0x7f3811,
      speed: 2.0,
      zoom: 1.1,
    };
    const featuresIsVisible = ref(false);
    return {
      featuresIsVisible,
      vantaOptions,
      pauseAnimation,
      direction,
      hand,
      arrowRef,
      arrowRotageDeg,
      viewHandler(state) {},
      visibilityChanged(isVisible, entry) {
        featuresIsVisible.value = !isVisible;
      },
    };
  },
};
</script>

<template>
  <main>
    <div id="home-navbar">
      <div id="navbar-left">
        <h1 style="font-family: 'Beatrice'; font-size: 2.5rem;">Mahi</h1>
      </div>
      <div id="navbar-center">
          <a data-replace="About us"><span>About us</span></a>
          <a data-replace="Blog"><span>Blog</span></a>
          <a data-replace="Contact us"><span>Contact us</span></a>
      </div>
      <div id="navbar-right">
        <n-space>
          <n-button ghost type="primary">Login</n-button>
          <n-button type="primary">Register</n-button>
        </n-space>
      </div>
    </div>
    <div class="header">
      <img src="../assets/abstract/abstract1.png" id="abstract1" width="350" height="350" class="abstract" alt="">
      <img src="../assets/abstract/abstract18.png" id="abstract2" width="700" height="700" class="abstract" alt="">
      <img src="../assets/abstract/abstract3.png" id="abstract3" width="500" height="500" class="abstract" alt="">
      <img src="../assets/abstract/abstract4.png" id="abstract4" width="200" height="200" class="abstract" alt="">
      <img src="../assets/abstract/abstract8.png" id="abstract5" width="600" height="600" class="abstract" alt="">
      <img src="../assets/abstract/abstract19.png" id="abstract6" width="150" height="150" class="abstract" alt="">
      <img src="../assets/abstract/abstract24.png" id="abstract7" width="200" height="200" class="abstract" alt="">
      <img src="../assets/abstract/abstract25.png" id="abstract8" width="300" height="300" class="abstract" alt="">
      <img src="../assets/abstract/abstract13.png" id="abstract9" width="300" height="300" class="abstract" alt="">
      <img src="../assets/abstract/abstract6.png" id="abstract10" width="300" height="300" class="abstract" alt="">
      <img src="../assets/abstract/abstract31.png" id="abstract11" width="300" height="300" class="abstract" alt="">
      <img src="../assets/abstract/abstract9.png" id="abstract12" width="300" height="300" class="abstract" alt="">
      <img src="../assets/abstract/planet.svg" id="planet" width="200" height="200" class="abstract" alt="">

      <img v-motion-pop :delay="600" src="../assets/abstract/arrow.svg" id="arrow" width="200" height="200" class="abstract" alt="">
      <img
      ref="arrowRef" v-motion-pop :delay="900" src="../assets/abstract/arrow1.svg" id="arrow1" width="100" height="100" class="abstract" alt="">
      <img
       v-motion-pop :delay="1300" src="../assets/abstract/arrow2.svg" id="arrow2" width="100" height="100" class="abstract" alt="">
      <div class="header-content">
        <div class="header-caption">
        <h1 id="header-title" v-motion-slide-bottom :delay="100" v-observe-visibility="visibilityChanged">
          <span id="span1">GROW AND </span><span id="span2">DEVELOP WITH </span>
          <span
            id="span3"
            >MAHI.</span
          >
        </h1>
        <n-button v-motion-slide-left :delay="1200" id="invite-life" color="#333639" size="large">
          Start organizing your life
        </n-button>
        </div>

        <img id="header-girl" v-motion-slide-right :delay="500" src="../assets/girl3.svg" alt="" width="550" height="550">
      </div>
    </div>
    <div class="features">
      <div
        class="feature-item"
        v-motion
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
        }"
      >
        <h3>Lorem, ipsum dolor.</h3>
        <h3>Lorem, ipsum dolor.</h3>
        <h3>Lorem, ipsum dolor.</h3>
      </div>

      <div
        class="feature-item"
        v-motion
        :initial="{
          opacity: 0,
          y: 200,
        }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
        }"
      >
        <h3>Lorem, ipsum dolor.</h3>
        <h3>Lorem, ipsum dolor.</h3>
        <h3>Lorem, ipsum dolor.</h3>

      </div>

      <div
        class="feature-item"
        v-motion
        :initial="{
          opacity: 0,
          y: 300,
        }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
        }"
      >
        {{ direction }}
        <h3>Lorem, ipsum dolor.</h3>
        <h3>Lorem, ipsum dolor.</h3>
        <h3>Lorem, ipsum dolor.</h3>
      </div>
    </div>
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nobis odio
      facere ducimus numquam nemo autem voluptatum velit dicta suscipit
      assumenda, ullam error fugit temporibus illum ex molestiae animi adipisci
      necessitatibus impedit aut. Repudiandae earum nesciunt dignissimos dicta!
      Fuga veniam fugiat beatae facilis dolorem delectus omnis ullam iusto
      accusamus repellat nihil, maiores distinctio molestiae eaque.
    </h1>
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nobis odio
      facere ducimus numquam nemo autem voluptatum velit dicta suscipit
      assumenda, ullam error fugit temporibus illum ex molestiae animi adipisci
      necessitatibus impedit aut. Repudiandae earum nesciunt dignissimos dicta!
      Fuga veniam fugiat beatae facilis dolorem delectus omnis ullam iusto
      accusamus repellat nihil, maiores distinctio molestiae eaque.
    </h1>
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nobis odio
      facere ducimus numquam nemo autem voluptatum velit dicta suscipit
      assumenda, ullam error fugit temporibus illum ex molestiae animi adipisci
      necessitatibus impedit aut. Repudiandae earum nesciunt dignissimos dicta!
      Fuga veniam fugiat beatae facilis dolorem delectus omnis ullam iusto
      accusamus repellat nihil, maiores distinctio molestiae eaque.
    </h1>
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nobis odio
      facere ducimus numquam nemo autem voluptatum velit dicta suscipit
      assumenda, ullam error fugit temporibus illum ex molestiae animi adipisci
      necessitatibus impedit aut. Repudiandae earum nesciunt dignissimos dicta!
      Fuga veniam fugiat beatae facilis dolorem delectus omnis ullam iusto
      accusamus repellat nihil, maiores distinctio molestiae eaque.
    </h1>
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nobis odio
      facere ducimus numquam nemo autem voluptatum velit dicta suscipit
      assumenda, ullam error fugit temporibus illum ex molestiae animi adipisci
      necessitatibus impedit aut. Repudiandae earum nesciunt dignissimos dicta!
      Fuga veniam fugiat beatae facilis dolorem delectus omnis ullam iusto
      accusamus repellat nihil, maiores distinctio molestiae eaque.
    </h1>
  </main>
</template>
<style scoped>
.svgs {
  width: 100%;
  height: 100%;
  position: absolute;
}
#blob1 {
  position: absolute;
  left: -15%;
  top: 20vh;
}
.header {
  padding: 10vh 7vw 35vh 10vw;
}
.header-caption {
  margin-top: 15vh;
}
#header-title {
  font-size: 4.5rem;
  font-weight: 900;
  font-family: "Beatrice";
}
#header-title span {
  background: #ff9e;
  padding: 10px 20px;
}
#span1 {
  border-radius: 50px 50px 0 0;
}
#span1::after {
  content: '';
  width: 50px;
  height: 50px;
  position: absolute;
  right: -50px;
  bottom: -13px;
  background-image: radial-gradient(circle at 37px -11px, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 38px, #ff9c 41px);
}
#span2 {
  border-radius: 0 50px 50px 0;
}
#span3 {
  border-radius: 0 0 50px 50px;
}
#span3::after {
  content: '';
  width: 50px;
  height: 50px;
  position: absolute;
  right: -50px;
  top: 0px;
  background-image: radial-gradient(circle at 41px 51px, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 38px, #ff9c 41px);
}
#header-gradient {
  font-weight: 900;
}
.features {
  display: flex;
  padding: 15% 10%;
  justify-content: space-around;
  align-items: center;
}
.feature-item {
  border-radius: 10px;
  backdrop-filter: blur(15px);
  background: rgba(58, 56, 56, 0.3);
  padding: 10% 5%;
}
#lottie1 {
  position: absolute;
  top: -25%;
  right: -25%;
}
#lottie2 {
  position: absolute;
  top: -25%;
  right: -25%;
}
#lottie3 {
  position: absolute;
  top: -25%;
  right: -25%;
}
.lottie-bg {
  position: absolute;
  left: 0;
  top: 0;
}
.header-content {
  display: flex;
}
#lottie-wave {
  position: absolute;
  width: 200%;
  height: 200%;
}
#header-blob {
  position: absolute;
  top: -50vh;
  right: -30vw;
}
#header-blob1 {
  position: absolute;
  left: -40vh;
  top: 20vh;
}
.abstract {
  position: absolute;
  pointer-events: none;
  user-select: none;
}
#abstract1 {
  left: -15vw;
  top: 50vh;
}
#abstract2 {
  right: -15vw;
  top: 30vh;
}
#abstract3 {
  left: 75vw;
  top: -20vh;
}
#abstract4 {
  left: 15vw;
  top: -15vh;
}
#arrow {
  left: 40vw;
  animation: floating 2s ease-in-out infinite;
}
@keyframes floating {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(30px);
  }
  100% {
    transform: translatey(0px);
  }
}
@keyframes astrogirl {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
#header-girl {
  animation: astrogirl 4s ease-in-out infinite;
  margin-top: 10vh;
  pointer-events: none;
  user-select: none;
}
#arrow1 {
  left: 45vw;
  top: 75vh;
  transform: rotate(0deg);
}
#abstract5 {
  top: 85vh;
  left: -1vw;
}
#abstract6 {
  top: 1vh;
  left: -5vw;
}
#abstract8{
  top: 65vh;
  left: 5vw;
}
#arrow2 {
  top: 5vh;
  right: 5vw;
}
#abstract9 {
  top: -5vh;
  right: 10vw;
}
#abstract10 {
  top: 60vh;
  right: 50vw;
}
#abstract11 {
  left: 40vw;
  top: -20vh;
}
#abstract12 {
  top: 75vh;
  right: 5vw;
}
#invite-life {
  font-size: 1rem;
  padding: 5% 10%;
  border-radius: 10px;
  margin-top: 5%;
}
#planet {
  right: 0vw;
  top: 25vh;
  animation: 60s planet ease-in-out infinite;
}
@keyframes planet {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#home-navbar {
  padding: .5% 3%;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  backdrop-filter: blur(10px);
  align-items: center;
  position: fixed;
  width: 100vw;
}
#navbar-center {
  display: flex;
  justify-content: space-around;
  gap: 3vw;
}
#navbar-center a {
  overflow: hidden;
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-size: 1rem;
}

#navbar-center a::before,
a::after {
 content: '';
  position: absolute;
  width: 100%;
  left: 0;
}
#navbar-center a::before {
  background-color: #E28163FF;
  height: 2px;
  bottom: 0;
  transform-origin: 100% 50%;
  transform: scaleX(0);
  transition: transform .3s cubic-bezier(0.76, 0, 0.24, 1);
}
#navbar-center a::after {
  content: attr(data-replace);
  height: 100%;
  top: 0;
  transform-origin: 100% 50%;
  transform: translate3d(200%, 0, 0);
  transition: transform .3s cubic-bezier(0.76, 0, 0.24, 1);
  color: #E28163FF;
}

#navbar-center a:hover::before {
  transform-origin: 0% 50%;
  transform: scaleX(1);
}
#navbar-center a:hover::after {
  transform: translate3d(0, 0, 0);
}

#navbar-center a span {
  display: inline-block;
  transition: transform .3s cubic-bezier(0.76, 0, 0.24, 1);
}

#navbar-center a:hover span {
  transform: translate3d(-200%, 0, 0);
}
</style>
