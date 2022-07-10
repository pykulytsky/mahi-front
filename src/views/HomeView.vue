<script>
import { NGradientText } from "naive-ui";
import Todo1 from "../assets/lottie/todo1.json";
import Todo2 from "../assets/lottie/todo2.json";
import Todo3 from "../assets/lottie/todo3.json";
import Brain from "../assets/lottie/brain.json";
import Time1 from "../assets/lottie/time1.json";
import { onMounted, onUnmounted } from "vue";
import VVanta from "vue-vanta/src/Vanta.vue";
import { ref } from "vue";
export default {
  components: {
    NGradientText,
    VVanta,
  },
  setup() {
    onMounted(() => {
      document.documentElement.style.overflow = "auto";
    });
    onUnmounted(() => {
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
      Todo1,
      Todo2,
      Todo3,
      Brain,
      Time1,
      featuresIsVisible,
      vantaOptions,
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
    <div class="svgs" id="svgs">
      <!-- <v-vanta effect="fog" :options="vantaOptions"> -->

      <scroll-parallax direction="y" :speed="0.3">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="60%"
          id="blob1"
          transform="rotate(0)"
          style="opacity: 1"
          filter="blur(8.6px)"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: rgb(254, 129, 22)"></stop>
              <stop offset="100%" style="stop-color: rgb(236, 171, 111)"></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient)" style="opacity: 1">
            <animate
              attributeName="d"
              dur="23500ms"
              repeatCount="indefinite"
              values="M436.87032,349.05548Q408.4258,448.11097,306.06935,451.62968Q203.7129,455.14839,157.4258,385.87516Q111.13871,316.60194,93.22677,241.12968Q75.31484,165.65742,135.48613,87.80097Q195.65742,9.94452,281.80097,56.34258Q367.94452,102.74064,416.62968,176.37032Q465.31484,250,436.87032,349.05548Z;M400,314Q352,378,277,420Q202,462,143,396Q84,330,66.5,241.5Q49,153,125.5,97.5Q202,42,298.5,55Q395,68,421.5,159Q448,250,400,314Z;M451.77435,331.68776Q380.0333,413.37552,297.8522,408.1811Q215.67111,402.98668,163.20108,360.14446Q110.73105,317.30225,116.40549,253.17111Q122.07993,189.03996,169.7144,146.88551Q217.34887,104.73105,314.55328,76.47669Q411.75769,48.22232,467.63654,149.11116Q523.51539,250,451.77435,331.68776Z;M436.87032,349.05548Q408.4258,448.11097,306.06935,451.62968Q203.7129,455.14839,157.4258,385.87516Q111.13871,316.60194,93.22677,241.12968Q75.31484,165.65742,135.48613,87.80097Q195.65742,9.94452,281.80097,56.34258Q367.94452,102.74064,416.62968,176.37032Q465.31484,250,436.87032,349.05548Z"
            ></animate>
          </path>
        </svg>
      </scroll-parallax>

      <scroll-parallax direction="y" :speed="0.1">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="40%"
          id="blob2"
          transform="rotate(0)"
          style="opacity: 1"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: rgb(254, 129, 22)"></stop>
              <stop offset="100%" style="stop-color: rgb(236, 171, 111)"></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient)" style="opacity: 1">
            <animate
              attributeName="d"
              dur="19200ms"
              repeatCount="indefinite"
              values="M429,328Q437,406,362,433Q287,460,218,442Q149,424,122.5,365Q96,306,74.5,242Q53,178,94.5,115Q136,52,206.5,73Q277,94,347.5,101.5Q418,109,419.5,179.5Q421,250,429,328Z;M404.21696,312.89783Q400.5999,375.79567,344.18719,420.60848Q287.77447,465.42129,222.25959,438.51488Q156.7447,411.60848,114.36806,363.06382Q71.99143,314.51917,65.98083,247.80853Q59.97023,181.09788,105.72982,130.10217Q151.4894,79.10645,216.18088,77.25959Q280.87235,75.41272,335.88295,103.82341Q390.89355,132.2341,399.36378,191.11705Q407.83401,250,404.21696,312.89783Z;M419.06254,317.79517Q411.11118,385.59033,349.66843,425.59894Q288.22568,465.60755,228.34547,428.45831Q168.46526,391.30906,120.24124,353.19622Q72.01722,315.08338,69.86103,249.40801Q67.70483,183.73263,103.47221,120.73263Q139.23958,57.73263,215.36631,36.75347Q291.49305,15.77432,346.41495,69.35242Q401.33686,122.93051,414.17538,186.46526Q427.0139,250,419.06254,317.79517Z;M414.53769,321.38989Q420.37096,392.77979,350.00938,405.59743Q279.64779,418.41507,213.62261,422.99375Q147.59743,427.57242,94.94338,376.434Q42.28934,325.29559,42.19191,249.67298Q42.09448,174.05036,91.48437,117.78308Q140.87426,61.5158,214.61636,47.15422Q288.35846,32.79263,348.05974,75.5158Q407.76103,118.23897,408.23272,184.11949Q408.70441,250,414.53769,321.38989Z;M425.57934,323.79599Q426.22734,397.59197,355.10104,419.41516Q283.97474,441.23834,222.29242,423.00907Q160.6101,404.77979,95.49644,367.33031Q30.38277,329.88083,44.58128,255.13536Q58.77979,180.3899,99.7419,120.41159Q140.70401,60.43329,214.57221,45.49287Q288.44042,30.55246,350.61367,72.29792Q412.78692,114.04339,418.85914,182.0217Q424.93135,250,425.57934,323.79599Z;M443.46373,322.92581Q424.06453,395.85162,352.29275,408.54192Q280.52096,421.23222,209.43547,432.55323Q138.34998,443.87423,108.93547,378.01696Q79.52096,312.15968,50.50966,239.62741Q21.49835,167.09515,80.22256,112.52096Q138.94677,57.94677,211.78709,57.03792Q284.62741,56.12906,342.97339,89.43146Q401.31936,122.73387,432.09114,186.36693Q462.86293,250,443.46373,322.92581Z;M402.96858,305.89372Q383.43068,361.78743,330.92976,387.4658Q278.42884,413.14418,202.60721,438.39372Q126.78558,463.64325,93.53789,391.42791Q60.29021,319.21257,78.64603,256.64233Q97.00185,194.07209,128.64418,144.10813Q160.28651,94.14418,219.21534,92.06839Q278.14418,89.9926,343.5342,103.10536Q408.92421,116.21812,415.71534,183.10906Q422.50647,250,402.96858,305.89372Z;M429,328Q437,406,362,433Q287,460,218,442Q149,424,122.5,365Q96,306,74.5,242Q53,178,94.5,115Q136,52,206.5,73Q277,94,347.5,101.5Q418,109,419.5,179.5Q421,250,429,328Z"
            ></animate>
          </path>
          <path id="blob" fill="url(#gradient)" style="opacity: 1">
            <animate
              attributeName="d"
              dur="19200ms"
              repeatCount="indefinite"
              values="M425.57934,323.79599Q426.22734,397.59197,355.10104,419.41516Q283.97474,441.23834,222.29242,423.00907Q160.6101,404.77979,95.49644,367.33031Q30.38277,329.88083,44.58128,255.13536Q58.77979,180.3899,99.7419,120.41159Q140.70401,60.43329,214.57221,45.49287Q288.44042,30.55246,350.61367,72.29792Q412.78692,114.04339,418.85914,182.0217Q424.93135,250,425.57934,323.79599Z;M414.53769,321.38989Q420.37096,392.77979,350.00938,405.59743Q279.64779,418.41507,213.62261,422.99375Q147.59743,427.57242,94.94338,376.434Q42.28934,325.29559,42.19191,249.67298Q42.09448,174.05036,91.48437,117.78308Q140.87426,61.5158,214.61636,47.15422Q288.35846,32.79263,348.05974,75.5158Q407.76103,118.23897,408.23272,184.11949Q408.70441,250,414.53769,321.38989Z;M453.57191,328.53752Q437.08754,407.07503,364.57816,448.74386Q292.06878,490.41269,219.55628,459.1657Q147.04377,427.91871,108.99375,371.46874Q70.94372,315.01876,56.52814,244.52814Q42.11255,174.03752,86.02814,107.96874Q129.94372,41.89995,209.98749,31.84993Q290.03126,21.79991,346.01876,71.89683Q402.00625,121.99375,436.03126,185.99687Q470.05628,250,453.57191,328.53752Z;M419.06254,317.79517Q411.11118,385.59033,349.66843,425.59894Q288.22568,465.60755,228.34547,428.45831Q168.46526,391.30906,120.24124,353.19622Q72.01722,315.08338,69.86103,249.40801Q67.70483,183.73263,103.47221,120.73263Q139.23958,57.73263,215.36631,36.75347Q291.49305,15.77432,346.41495,69.35242Q401.33686,122.93051,414.17538,186.46526Q427.0139,250,419.06254,317.79517Z;M433.0232,309.9192Q393.01281,369.83841,338.3352,406.40881Q283.6576,442.97921,221.7752,424.49281Q159.8928,406.0064,119.2384,358.9864Q78.584,311.9664,70.5304,246.7752Q62.4768,181.584,97.7552,114.4464Q133.0336,47.3088,206.208,64.61119Q279.3824,81.91359,342.208,100.8192Q405.0336,119.7248,439.0336,184.8624Q473.0336,250,433.0232,309.9192Z;M428.39652,310.63781Q395.12039,371.27562,337.58607,396.3189Q280.05174,421.36219,204.00896,441.94775Q127.96619,462.5333,107.32787,385.81839Q86.68955,309.10348,96.33581,253.18955Q105.98207,197.27562,134.68904,148.26665Q163.396,99.25769,224.43929,74.05174Q285.48258,48.8458,334.83632,93.40548Q384.19006,137.96516,422.93135,193.98258Q461.67264,250,428.39652,310.63781Z;M443.46373,322.92581Q424.06453,395.85162,352.29275,408.54192Q280.52096,421.23222,209.43547,432.55323Q138.34998,443.87423,108.93547,378.01696Q79.52096,312.15968,50.50966,239.62741Q21.49835,167.09515,80.22256,112.52096Q138.94677,57.94677,211.78709,57.03792Q284.62741,56.12906,342.97339,89.43146Q401.31936,122.73387,432.09114,186.36693Q462.86293,250,443.46373,322.92581Z;M425.57934,323.79599Q426.22734,397.59197,355.10104,419.41516Q283.97474,441.23834,222.29242,423.00907Q160.6101,404.77979,95.49644,367.33031Q30.38277,329.88083,44.58128,255.13536Q58.77979,180.3899,99.7419,120.41159Q140.70401,60.43329,214.57221,45.49287Q288.44042,30.55246,350.61367,72.29792Q412.78692,114.04339,418.85914,182.0217Q424.93135,250,425.57934,323.79599Z"
            ></animate>
          </path>
        </svg>
      </scroll-parallax>

      <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        width="30%"
        id="blob3"
        filter="blur(12.6px)"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: rgb(155, 217, 192)"></stop>
            <stop offset="100%" style="stop-color: rgb(66, 192, 151)"></stop>
          </linearGradient>
        </defs>
        <path id="blob1" fill="url(#gradient)">
          <animate
            attributeName="d"
            dur="10000ms"
            repeatCount="indefinite"
            values="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;"
          ></animate>
        </path>
      </svg>
      <!-- </v-vanta> -->
    </div>
    <div class="header">
      <h1 class="header-caption" v-observe-visibility="visibilityChanged">
        Lorem
        <n-gradient-text
          :gradient="{
            from: 'rgb(254, 129, 22)',
            to: 'rgb(236, 171, 111)',
          }"
          id="header-gradient"
          >ipsum</n-gradient-text
        >
        dolor sit amet.
      </h1>
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
        <Vue3Lottie
          id="lottie1"
          :animationData="Time1"
          :width="200"
          :height="200"
        />
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

        <Vue3Lottie
          id="lottie2"
          :animationData="Brain"
          :width="200"
          :height="150"
        />
      </div>

      <div class="feature-item"
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
        <h3>Lorem, ipsum dolor.</h3>
        <h3>Lorem, ipsum dolor.</h3>
        <h3>Lorem, ipsum dolor.</h3>

        <Vue3Lottie
          id="lottie3"
          :animationData="Todo3"
          :width="200"
          :height="200"
        />
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
  top: 50%;
  right: 0%;
}
#blob2 {
  position: absolute;
  top: 5%;
  right: 10%;
}
#blob3 {
  position: absolute;
  top: 25%;
  left: 10%;
}
.header {
  padding-top: 35vh;
  padding-left: 10vw;
  margin-bottom: 35vh;
}
.header-caption {
  font-size: 4.5rem;
  font-weight: 900;
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
  border-radius: 25px;
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
</style>
