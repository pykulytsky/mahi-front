import http from "./axios";

const updateProject = ({
  id,
  name,
  description,
  icon,
  accent_color,
  is_favorite,
  is_pinned,
  is_editable,
  show_completed_tasks,
}) =>
  http.patch("/projects/" + id, {
    name,
    description,
    icon,
    accent_color,
    is_favorite,
    is_pinned,
    is_editable,
    show_completed_tasks,
  });

const deleteProject = (ID) => http.delete("/projects/" + ID);

const fetchActivity = () => http.get("/users/me/activities");

const createProject = ({
  name,
  description,
  color,
  icon,
  isFavorite,
  isPinned,
}) =>
  http.post("/projects", {
    name,
    description,
    accent_color: color,
    icon,
    is_favorite: isFavorite,
    is_pinned: isPinned,
  });

export { updateProject, deleteProject, fetchActivity, createProject };
