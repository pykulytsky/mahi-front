<script>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import {useRouter} from "vue-router"
import { signIn } from "../../api/auth.api"
import * as jose from 'jose'
import { useTaskStore } from "../../stores/task";
import {
  NForm,
  NInput,
  useMessage,
  NFormItem,
  NButton,
  NSpace,
  NIcon,
  NCheckbox
} from "naive-ui";
import { KeyOutline, MailOutline, LogoGoogle, LogoFacebook, LogoGithub} from "@vicons/ionicons5";
export default {
  components: {
    NForm,
    NInput,
    NFormItem,
    NButton,
    NSpace,
    NIcon,
    NCheckbox,
    LogoGoogle,
    LogoFacebook,
    LogoGithub
  },
  setup() {

    const formRef = ref(null);
    const message = useMessage();
    const router = useRouter()
    const auth = useAuthStore()
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
      KeyOutline,
      MailOutline,
      formRef,
      loginModel,
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
    }
  }
}
</script>

<template>
  <main>
    <div id="login">
      <div id="illustration-section">
        <img src="../../assets/humanities/8.png" id="login-illustration" width="750" height="750" alt="">
      </div>
      <div id="form-section">


      </div>

      <div id="login-form-wrapper">
        <h1 id="login-header">Welcome back to Mahi</h1>
          <n-form id="login-form" ref="formRef" :model="loginModel" >
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
          <p style="color: #282828">or continue with</p>
          <n-space id="social">
            <n-button secondary circle size="large">
              <n-icon>
                <logo-google />
              </n-icon>
            </n-button>
            <n-button secondary circle size="large">
              <n-icon>
                <logo-facebook />
              </n-icon>
            </n-button>
            <n-button secondary circle size="large">
              <n-icon>
                <logo-github />
              </n-icon>
            </n-button>
          </n-space>
      </div>
    </div>
  </main>
</template>
<style>
#login {
  height: 100vh;
  width: 100vw;
  display: flex;
}
#illustration-section {
  width: 65vw;
  height: 100vw;
}
#illustration-section {
  background: url("../../assets/Frame.svg");
  background-size: cover;
}
#login-illustration {
  position: absolute;
}
#login-form-wrapper {
  position: absolute;
  padding: 10px 20px;
  background: var(--n-color);
  border-radius: 25px;
  right: 20%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  transform: translate(0, -50%);
}
#login-header {
  margin: 5vh 0;
}
#login-form {
  width: 80%;
}
#login-submit-btn {
  width: 100%;
  margin: 5vh 0;
}
#social {
  margin-top: 2vh;
  margin-bottom: 5vh;
}
</style>