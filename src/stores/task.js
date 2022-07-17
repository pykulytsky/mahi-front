import { defineStore } from "pinia";
import { h } from "vue";
import { NIcon } from "naive-ui";
import http from "../api/axios"
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
  CheckmarkDoneOutline
} from "@vicons/ionicons5";

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
    _currentProject: null,
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
            icon: renderIcon(TextOutline)
          },
          {
            label: "Date",
            key: "date",
            icon: renderIcon(TimeOutline)
          },
          {
            label: "Status",
            key: "status",
            icon: renderIcon(CheckmarkDoneOutline)
          }
        ]
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
  }),
  getters: {
    projectOptions: (state) => state._projectOptions,
    pinned: (state) => state._pinned,
    favorites: (state) => state._favorites,
    projects: (state) => state._projects,
    currentProject: (state) => state._currentProject
  },
  actions: {
    setPinned(pinnedProjects) {
      this._pinned = pinnedProjects
    },
    setFavorites(favoriteProjects) {
      this._favorites = favoriteProjects
    },
    setProjects(projects) {
      this._projects = projects
    },
    fetchProjects() {
      const common = useCommonStore()
      common.setLoading(true)
      http.get("/projects/user/")
      .then(response => {
        this.setProjects(response.data)
        let pinned = []
        let favorites = []
        response.data.forEach(project => {
          if (project.is_pinned) {
            pinned.push(project)
          }
          if(project.is_favorite) {
            favorites.push(project)
          }
        })
        this.setPinned(pinned)
        this.setFavorites(favorites)
        common.setLoading(false)
      })
      .catch(err => {
        common.setLoading(false)
        throw new Error(err)
      })
    },
    fetchProject(projectID) {
      const common = useCommonStore()
      common.setLoading(true)
      http.get("/projects/" + projectID)
      .then(response => {
        this._currentProject = response.data
        common.setLoading(false)
      })
    }
  }
});
