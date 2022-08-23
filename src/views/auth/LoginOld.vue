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
  NIcon,
  NCheckbox
} from "naive-ui";
import { ref } from "vue";
import { KeyOutline, MailOutline} from "@vicons/ionicons5";
import { useMq } from "vue3-mq";
import { useAuthStore } from "../../stores/auth";
import {useRouter} from "vue-router"
import { signIn } from "../../api/auth.api"
import * as jose from 'jose'
import { useTaskStore } from "../../stores/task";
export default {
  components: {
    NCard,
    NForm,
    NInput,
    NAutoComplete,
    NFormItem,
    NButton,
    NSpace,
    NIcon,
    NCheckbox
  },
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const router = useRouter()
    const auth = useAuthStore()
    const mq = useMq()
    const task = useTaskStore()
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
        let formData = new FormData();
        formData.append("username", loginModel.value.email);
        formData.append("password", loginModel.value.password);
        signIn(formData).then(response => {
          auth.setToken(response.data.access_token);
          auth.setExp(jose.decodeJwt(response.data.access_token).exp)
          task.fetchProjects()
          auth.loadCurrentUser()
          router.push("/app/today")
        })
      }
    };
  },
};
</script>
<template>
  <main>
    <div class="wrapper">
      <div :class="mq.mdPlus? 'login': 'login-small'">
        <img src="../../assets/humanities/15.png" id="login-illustration" alt="">
        <n-card id="login-form">
          <h1 id="login-header">Login to Mahi</h1>
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
            <n-space justify="space-between" id="login-options">
              <n-checkbox>
                Remember me
              </n-checkbox>
              <n-button
                text
                tag="a"
                type="primary"
              >
                Forgot password ?
              </n-button>
            </n-space>
            <n-button size="large" @click="handleSignIn" id="login-submit-btn" type="primary">Login</n-button>
          </n-form>
        </n-card>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  background: url("../../assets/Frame.svg");
  background-size: cover;
}
.login {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-small {

}

#login-options {
  margin: 20px 10px;
}
#login-submit-btn {
  width: 95%;
  margin-left: 2.5%;
  margin-bottom: 10vh;
  margin-top: 5vh;
}
#login-form {
  margin-right: 5vw;
  border-radius: 15px;
  width: 30%;
}
#login-header {
  text-align: center;
  margin-bottom: 15vh;
  color: var(--primary-color);
}
#login-illustration {
  width: 50%;
}
</style>
