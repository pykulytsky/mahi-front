<script>
import { NCard, NTabs, NTabPane, NSpace, NButton, NIcon } from "naive-ui"
import { UserCircle, ColorSwatch, Settings as SettingsIcon} from "@vicons/tabler"
import {useAuthStore} from "../../stores/auth"
export default {
  components: {
    NCard,
    NTabs,
    NTabPane,
    NSpace,
    NButton,
    NIcon,
    UserCircle,
    ColorSwatch,
    SettingsIcon
  },
  setup() {
    const auth = useAuthStore()
    return {
      auth
    }
  },
}
</script>
<template>
  <n-card id="settings">
    <n-tabs type="segment" animated>
      <n-tab-pane name="account">
        <template #tab>
          <n-icon size="20">
            <user-circle></user-circle>
          </n-icon>
          Account
        </template>
        {{auth.user}}
      </n-tab-pane>
      <n-tab-pane name="appereance">
        <template #tab>
          <n-icon size="20">
            <color-swatch />
          </n-icon>
          Appearance
        </template>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam aliquid sed possimus voluptatem eaque qui ipsam et quae assumenda incidunt. Amet, vero expedita suscipit dolorem rem modi facilis asperiores officiis eligendi, obcaecati nesciunt culpa, impedit ea delectus minus doloremque itaque accusantium porro accusamus error magnam repudiandae. Voluptates provident nobis distinctio animi expedita! Fugiat, eos iure?
      </n-tab-pane>
      <n-tab-pane name="general">
        <template #tab>
          <n-icon size="20">
            <settings-icon />
          </n-icon>
          General
        </template>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ipsa tempora sequi error quia velit, non harum eum temporibus esse, magnam accusamus consequatur doloribus voluptates maiores! Ipsam, voluptate, numquam officia a quaerat architecto dicta suscipit non qui veritatis omnis eaque provident hic iure quis perspiciatis. Explicabo illum totam dolorem minima doloremque, perspiciatis, laborum, a dolor omnis veniam dolores quia sapiente nesciunt necessitatibus neque nostrum debitis iusto magni obcaecati voluptate ut recusandae earum. Laborum numquam, suscipit asperiores voluptate accusamus ea molestiae aperiam labore reiciendis dicta nostrum ratione voluptas? Illo debitis, maiores, neque rerum ipsum cumque quisquam, cupiditate excepturi ab asperiores velit.
      </n-tab-pane>
    </n-tabs>
    <template #action>
      <n-space justify="end">
        <n-button primary type="error">Close</n-button>
      </n-space>
    </template>
  </n-card>
</template>
<style>
#settings {
  width: 75vw;
}

@media screen  and (max-width: 720px) {
  #settings {
    width: 100vw;
  }
}
</style>
