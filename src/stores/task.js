import { defineStore } from "pinia";
import { h } from "vue";
import { NIcon } from "naive-ui";
import http from "../api/axios";
import { getTasksByProject } from "../api/tasks.api";
import { fetchUserTags } from "../api/tags.api";
import { useCommonStore } from "./common";
import {
  CreateOutline,
  ShareOutline,
  TrashOutline,
  ArchiveOutline,
  GridOutline,
  HappyOutline,
  ContrastOutline,
  FunnelOutline,
  TextOutline,
  TimeOutline,
  CheckmarkDoneOutline,
  HomeOutline as HomeIcon,
  CalendarNumberOutline,
  CalendarOutline,
  PricetagOutline,
} from "@vicons/ionicons5";
import { Lock, LockOpen } from "@vicons/tabler";
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    _pinned: [],
    _favorites: [],
    _projects: [],
    _tags: [],
    _currentProject: null,
    _currentTasks: null,
    _projectOptions: [
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
        type: "divider",
        key: "d1",
      },
      {
        label: "Sort by",
        key: 4,
        icon: renderIcon(FunnelOutline),
        children: [
          {
            label: "Title",
            key: "title",
            icon: renderIcon(TextOutline),
          },
          {
            label: "Date",
            key: "date",
            icon: renderIcon(TimeOutline),
          },
          {
            label: "Status",
            key: "status",
            icon: renderIcon(CheckmarkDoneOutline),
          },
        ],
      },
      {
        label: "Display settings",
        key: 5,
        icon: renderIcon(GridOutline),
      },
      {
        label: "Edit icon",
        key: 6,
        icon: renderIcon(HappyOutline),
      },
      {
        label: "Switch accent color",
        key: 7,
        icon: renderIcon(ContrastOutline),
      },
      {
        type: "divider",
        key: "d2",
      },
      {
        label: "Delete",
        key: 8,
        icon: renderIcon(TrashOutline),
      },
    ],
    _menuOptions: [
      {
        label: "Dashboard",
        key: "dashboard",
        icon: renderIcon(HomeIcon),
      },
      {
        label: "Today",
        key: "today",
        icon: renderIcon(CalendarNumberOutline),
      },
      {
        label: "Calendar",
        key: "calendar",
        icon: renderIcon(CalendarOutline),
      },
      {
        label: "Tags",
        key: "tags",
        icon: renderIcon(PricetagOutline),
      },
      {
        key: "divider-1",
        type: "divider",
        props: {
          style: {
            marginLeft: "32px",
          },
        },
      },
    ],
  }),
  getters: {
    projectOptions: (state) => {
      if (
        state._projectOptions.filter((option) =>
          ["lock", "unlock"].includes(option.key)
        ).length == 0
      ) {
        if (state._currentProject.is_editable) {
          state._projectOptions.splice(2, 0, {
            label: "Lock",
            key: "lock",
            icon: renderIcon(Lock),
          });
        } else {
          state._projectOptions.splice(2, 0, {
            label: "Unlock",
            key: "unlock",
            icon: renderIcon(LockOpen),
          });
        }
      }
      return state._projectOptions;
    },
    pinned: (state) => state._pinned,
    favorites: (state) => state._favorites,
    projects: (state) => state._projects,
    currentProject: (state) => state._currentProject,
    currentTasks: (state) => state._currentTasks,
    tags: (state) => state._tags,
    menuOptions: (state) => state._menuOptions,
  },
  actions: {
    setPinned(pinnedProjects) {
      this._pinned = pinnedProjects;
    },
    setFavorites(favoriteProjects) {
      this._favorites = favoriteProjects;
    },
    setProjects(projects) {
      this._projects = projects;
    },
    setCurrentProject(project) {
      this._currentProject = project;
    },
    setCurrentTasks(tasks) {
      this._currentTasks = tasks;
    },
    setTags(tags) {
      this._tags = tags;
    },
    fetchProjects() {
      const common = useCommonStore();
      common.setLoading(true);
      http
        .get("/projects/user/")
        .then((response) => {
          this.setProjects(response.data);
          let pinned = [];
          let favorites = [];
          response.data.forEach((project) => {
            if (project.is_pinned) {
              pinned.push(project);
            }
            if (project.is_favorite) {
              favorites.push(project);
            }
          });
          this.setPinned(pinned);
          this.setFavorites(favorites);
          common.setLoading(false);
        })
        .catch((err) => {
          common.setLoading(false);
          throw new Error(err);
        });
    },
    fetchProject(projectID) {
      const common = useCommonStore();
      common.setLoading(true);
      http.get("/projects/" + projectID).then((response) => {
        this._currentProject = response.data;
        getTasksByProject(response.data.id).then((resp) => {
          this.setCurrentTasks(resp.data);
          common.setLoading(false);
        });
      });
    },
    fetchTags() {
      const common = useCommonStore();
      common.setLoading(true);
      fetchUserTags().then((response) => {
        this.setTags(response.data);
        common.setLoading(false);
      });
    },
    getTagIDByName(tagName) {
      this.tags.forEach((tag) => {
        if (tag.name == tagName) {
          return tag.id;
        }
      });
    },
  loadMenuProjects() {
    if (this._menuOptions.length > 5) {
      this._menuOptions.splice(0, 5);
    }

    this.pinned.forEach((project) => {
      this._menuOptions.push({
        label: project.name,
        key: project.id,
        icon: () => (project.icon !== null ? project.icon : "????"),
      });
    });
    this._menuOptions.push({
      key: "divider-2",
      type: "divider",
      props: {
        style: {
          marginLeft: "32px",
        },
      },
    });
    let favoritesGroup = {
      label: "Favorites",
      key: "favorites",
      children: [],
    };
    this.favorites.forEach((project) => {
      favoritesGroup.children.push({
        label: project.name,
        key: project.id,
        icon: () => (project.icon !== null ? project.icon : "????"),
      });
    });
    this._menuOptions.push(favoritesGroup);
    let projectsGroup = {
      label: "Projects",
      key: "projects",
      children: [],
    };
    this.projects.forEach((project) => {
      projectsGroup.children.push({
        label: project.name,
        key: project.id,
        icon: () => (project.icon !== null ? project.icon : "????"),
      });
    });
    this._menuOptions.push(projectsGroup);
  },
  },

});
