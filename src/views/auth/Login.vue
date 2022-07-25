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
import { useAuthStore } from "../../stores/auth";
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
    const auth = useAuthStore()
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
      auth,
      handleEmail(value) {
        loginModel.value.email = value;
      },
      handlePassword(value) {
        loginModel.value.password = value;
      },
      handleSignIn() {
        auth.signIn(loginModel.value.email, loginModel.value.password)
      }
    };
  },
};
</script>
<template>
  <main>
    <div class="wrapper">
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
            <n-space justify="end" @click="handleSignIn">
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
  height: 95vh;
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
