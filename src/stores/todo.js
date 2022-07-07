import { defineStore } from "pinia";
import { h } from "vue";
import { NIcon } from "naive-ui";
import {
  CreateOutline,
  ShareOutline,
  TrashOutline,
  ArchiveOutline,
  GridOutline,
  HappyOutline,
  ContrastOutline
} from "@vicons/ionicons5";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    _todoListOptions: [
      {
        label: "Edit",
        key: 1,
        icon: renderIcon(CreateOutline),
      },
      {
        label: "Share",
        key: 2,
        icon: renderIcon(ShareOutline),
      },
      {
        label: "Archive",
        key: 3,
        icon: renderIcon(ArchiveOutline),
      },
      {
        label: "Display settings",
        key: 4,
        icon: renderIcon(GridOutline),
      },
      {
        label: "Edit icon",
        key: 5,
        icon: renderIcon(HappyOutline),
      },
      {
        label: "Switch accent color",
        key: 6,
        icon: renderIcon(ContrastOutline),
      },
      {
        label: "Delete",
        key: 7,
        icon: renderIcon(TrashOutline),
      },
    ],
  }),
  getters: {
    todoListOptions: (state) => state._todoListOptions,
  },
});
