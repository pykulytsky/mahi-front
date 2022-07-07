<script>
import {
  NCard,
  NForm,
  NInput,
  useMessage,
  NAutoComplete,
  NFormItem,
  NButton,
  NSpace,
  NIcon
} from "naive-ui";
import { ref } from "vue";
import { KeyOutline, MailOutline} from "@vicons/ionicons5";
import { useMq } from "vue3-mq";
export default {
  components: {
    NCard,
    NForm,
    NInput,
    NAutoComplete,
    NFormItem,
    NButton,
    NSpace,
    NIcon
  },
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const mq = useMq()
    const loginModel = ref({
      email: "",
      password: "",
    });

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    return {
      formRef,
      loginModel,
      MailOutline,
      KeyOutline,
      mq,
      handleEmail(value) {
        loginModel.value.email = value;
      },
      handlePassword(value) {
        loginModel.value.password = value;
      },
    };
  },
};
</script>
<template>
  <main>
    <div class="wrapper">
      <div class="blobs">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="150%"
          id="login-blob"
          style="opacity: 1"
          filter="blur(4.2px)"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: rgb(238, 205, 163)"></stop>
              <stop offset="100%" style="stop-color: rgb(121, 50, 11)"></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient)" style="opacity: 1">
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="M390.7302,319.10952Q360.37524,388.21905,284.62068,409.39959Q208.86612,430.58014,161.11156,373.20082Q113.35701,315.8215,88.46857,238.04463Q63.58014,160.26776,136.76776,117.04463Q209.95537,73.8215,303.79007,69.52027Q397.62476,65.21905,409.35497,157.60952Q421.08517,250,390.7302,319.10952Z;M429.79847,339.54154Q392.67727,429.08308,294.97368,455.00137Q197.27008,480.91966,143.94598,403.56786Q90.62188,326.21607,83.52769,246.22992Q76.43351,166.24376,136.8518,92.77008Q197.27008,19.29641,287.1482,55Q377.02632,90.70359,421.97299,170.3518Q466.91966,250,429.79847,339.54154Z;M451.77435,331.68776Q380.0333,413.37552,297.8522,408.1811Q215.67111,402.98668,163.20108,360.14446Q110.73105,317.30225,116.40549,253.17111Q122.07993,189.03996,169.7144,146.88551Q217.34887,104.73105,314.55328,76.47669Q411.75769,48.22232,467.63654,149.11116Q523.51539,250,451.77435,331.68776Z;M390.7302,319.10952Q360.37524,388.21905,284.62068,409.39959Q208.86612,430.58014,161.11156,373.20082Q113.35701,315.8215,88.46857,238.04463Q63.58014,160.26776,136.76776,117.04463Q209.95537,73.8215,303.79007,69.52027Q397.62476,65.21905,409.35497,157.60952Q421.08517,250,390.7302,319.10952Z"
            ></animate>
          </path>
        </svg>
      </div>
      <div :class="mq.mdPlus? 'login': 'login-small'">
        <n-card title="Login">
          <n-form ref="formRef" :model="loginModel">
            <n-form-item label="Email" path="email">
              <n-input
                size="large"
                type="email"
                v-model:value="loginModel.email"
              >
                <template #prefix>
                  <n-icon :component="MailOutline" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="Password" path="password">
              <n-input
                size="large"
                type="password"
                v-model:value="loginModel.password"
                show-password-on="mousedown"
              >
                <template #prefix>
                  <n-icon :component="KeyOutline" />
                </template>
              </n-input>
            </n-form-item>
            <n-space justify="end">
              <n-button type="primary">Login</n-button>
            </n-space>
          </n-form>

        </n-card>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  height: 100vh;
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
}
.login-small {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 85vw;
}
.blobs {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;

  overflow-x: hidden;
}
.blobs svg {
  overflow-y: hidden;
  overflow-x: hidden;
}
#login-blob {
  position: absolute;
  right: -70%;
  top: -50%;
}
</style>
