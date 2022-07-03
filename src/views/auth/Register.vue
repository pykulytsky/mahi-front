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
  NSteps,
  NStep,
  NIcon,
} from "naive-ui";
import { ref, computed } from "vue";
import { KeyOutline, MailOutline, PersonOutline } from "@vicons/ionicons5";
export default {
  components: {
    NCard,
    NForm,
    NInput,
    NAutoComplete,
    NFormItem,
    NButton,
    NSpace,
    NSteps,
    NStep,
    NIcon,
  },
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const currentStep = ref(1);
    const registerModel = ref({
      email: "",
      username: "",
      password: "",
      reenteredPassword: "",
    });

    const rules = {
      email: [
        {
          validator(rule, value) {
            const pattert =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!value.includes("@")) {
              return new Error("Email should contains '@'");
            } else if (!pattert.test(value)) {
              return new Error("Email doesn't match to email pattern.");
            } else {
              return true;
            }
          },
          required: true,
          trigger: ["input", "blur"],
        },
      ],
      username: [
        {
          validator(rule, value) {
            const pattern = /^[a-z0-9_-]{6,16}$/;
            if (!pattern.test(value)) {
              return new Error(
                "Username should contain 6-16 charachters, no special symbols."
              );
            }
            return true;
          },
          required: true,
          trigger: ["input", "blur"],
        },
      ],
      password: [
        {
          validator(rule, value) {
            const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,26}$/;
            if (value.length < 7) {
              return new Error("At least 6 charachters");
            } else if (value.length > 27) {
              return new Error("Maximum 26 charachters");
            } else if (!pattern.test(value)) {
              return new Error(
                "Password should contain at least 1 digit and uppercase letter. Password can't contain special charachters, spaces etc."
              );
            }

            return true;
          },
          required: true,
          trigger: ["input", "blur"],
        },
      ],
      reenteredPassword: [
        {
          validator(rule, value) {
            if (value !== registerModel.value.password) {
              return new Error("Password doesn't match.");
            }
            return true;
          },
          required: true,
          trigger: ["input", "blur"],
        },
      ],
    };

    return {
      formRef,
      registerModel,
      rules,
      MailOutline,
      KeyOutline,
      PersonOutline,
      currentStep,
      emailValidationStatus: computed(() => {
        if (validateEmail(registerModel.value.email)) {
          return void 0;
        } else {
          return "error";
        }
      }),
      emailFeedback: computed(() => {
        if (validateEmail(registerModel.value.email)) {
          return void 0;
        } else {
          return "Email should contain '@''";
        }
      }),
      handleValidateButtonClick() {
        formRef.value?.validate((errors) => {
          if (!errors) {
            return true;
          } else {
            message.error("Some fields are invalid.");
            return false;
          }
        });
      },
      next() {
        if (currentStep.value === null) currentStep.value = 1;
        else if (currentStep.value >= 4) currentStep.value = null;
        else if (currentStep.value == 1) {
          try {
            formRef.value?.validate((errors) => {
              if (!errors) {
                currentStep.value++;
              } else {
                message.error("Some fields are invalid.");
              }
            });
          } catch {
            message.error("Invalid");
          }
        } else currentStep.value++;
      },
      prev() {
        if (currentStep.value === 0) currentStep.value = null;
        else if (currentStep.value === null) currentStep.value = 4;
        else currentStep.value--;
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
      <div class="register">
        <n-card title="Create an account">
          <n-steps :current="currentStep">
            <n-step title="Fill your credentials"> </n-step>
            <n-step title="Fill personal data"> </n-step>
            <n-step title="Verify your email"> </n-step>
          </n-steps>

          <n-form
            v-if="currentStep == 1"
            ref="formRef"
            :model="registerModel"
            :rules="rules"
          >
            <n-form-item label="Email" path="email">
              <n-input
                type="email"
                v-model:value="registerModel.email"
                :validation-status="false"
                :feedback="'sdfdfd'"
              >
                <template #prefix>
                  <n-icon :component="MailOutline" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="Username" path="username">
              <n-input v-model:value="registerModel.username">
                <template #prefix>
                  <n-icon :component="PersonOutline" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="Password" path="password">
              <n-input
                type="password"
                show-password-on="mousedown"
                v-model:value="registerModel.password"
              >
                <template #prefix>
                  <n-icon :component="KeyOutline" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="Confirm Password" path="reenteredPassword">
              <n-input
                type="password"
                show-password-on="mousedown"
                v-model:value="registerModel.reenteredPassword"
              >
                <template #prefix>
                  <n-icon :component="KeyOutline" />
                </template>
              </n-input>
            </n-form-item>
          </n-form>

          <n-space :justify="currentStep == 1 ? 'end' : 'space-between'">
            <n-button @click="prev" v-if="currentStep !== 1">Previous</n-button>
            <n-button v-if="currentStep !== 3" @click="next">Next</n-button>
            <n-button v-else @click="finish">Finish</n-button>
          </n-space>
        </n-card>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  height: 100vh;
}
.register {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
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
  left: -70%;
  top: -50%;
}
</style>
