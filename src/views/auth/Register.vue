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
    NSteps,
    NStep,
    NIcon,
  },
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const currentStep = ref(1);
    const mq = useMq()
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
      mq,
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
      finish() {},
    };
  },
};
</script>
<template>
  <main>
    <div class="wrapper">
      <img id="register-blob1" src="../../assets/abstract/abstract1.png" alt="" width="500" height="500">
      <img id="register-blob2" src="../../assets/abstract/abstract2.png" alt="" width="500" height="500">
      <img id="register-blob3" src="../../assets/abstract/abstract3.png" alt="" width="500" height="500">
      <div :class="mq.lgPlus? 'register': 'register-small'">
        <n-card title="Create an account">
          <n-steps
            :current="currentStep"
            :size="mq.current == 'xxl'? 'medium': 'small'"
            :vertical="mq.smPlus? false: true"
          >
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
              <n-input type="email" v-model:value="registerModel.email">
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
            <n-button type="primary" v-else @click="finish">Finish</n-button>
          </n-space>
        </n-card>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  height: 95vh;
}
.register {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
}
.register-small {
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
  left: -70%;
  top: -50%;
}
</style>
