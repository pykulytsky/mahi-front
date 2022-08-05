<script>
import { NSpace, NButton, NIcon, NModal } from "naive-ui";
import { computed, ref } from "vue";
import { AddCircleOutline } from "@vicons/ionicons5";
import { VuemojiPicker } from "vuemoji-picker";
import {useCommonStore} from "../../stores/common"
export default {
  components: {
    NSpace,
    NButton,
    NIcon,
    VuemojiPicker,
    AddCircleOutline,
    NModal,
  },
  props: {
    value: {
      type: String,
      default: () => null,
    },
    emojiList: {
      type: Array,
      default: () => ["🏅", "🛒", "🧳", "🧑🏿‍🎓", "🐶", "🔥"],
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const common = useCommonStore()
    const emojiPickerIsShown = ref(false)
    const pickedEmoji = computed({
      get: () => props.value,
      set: (value) => emit("update:value", value),
    });
    return {
      common,
      pickedEmoji,
      emojiPickerIsShown,
      emojiList: props.emojiList,
      handleSelectEmoji(emoji) {
        if (pickedEmoji.value == emoji) {
          pickedEmoji.value = null;
        } else {
          pickedEmoji.value = emoji;
        }
      },
      handleEmojiClick(emoji) {
        if (!props.emojiList.includes(emoji.unicode)) {
          props.emojiList.push(emoji.unicode)
        }
        emojiPickerIsShown.value = false
        pickedEmoji.value = emoji.unicode
      }
    };
  },
};
</script>
<template>
  <div id="emoji-picker">
    <n-space align="center">
      <p
        @click="handleSelectEmoji(emoji)"
        :class="pickedEmoji == emoji ? 'emoji-item-picked' : 'emoji-item'"
        v-for="(emoji, i) in emojiList"
        :key="i"
      >
        {{ emoji }}
      </p>
      <n-button @click="emojiPickerIsShown = true" text style="font-size: 1.5rem; margin-top: 10px">
        <n-icon>
          <add-circle-outline />
        </n-icon>
      </n-button>
    </n-space>

    <n-modal v-model:show="emojiPickerIsShown">
      <VuemojiPicker
        :is-dark="common.currentTheme == 'dark'"
        @emojiClick="handleEmojiClick"
      />
    </n-modal>
  </div>
</template>
<style>
.emoji-item {
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  user-select: none;
  padding: 0 5px;
}
.emoji-item-picked {
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  user-select: none;
  padding: 0 5px;
  border-radius: 10px;
  background: var(--primary-color);
}
.emoji-item:hover {
  transform: scale(1.2);
}
</style>
