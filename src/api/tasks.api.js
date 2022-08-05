import http from "./axios"

const addTask = (name, projectID, description, deadline, priority, color) => http.post("/tasks/", {
    name,
    project_id: projectID,
    description,
    deadline,
    priority,
    color
})

const getTasksByProject = (
  projectID,
  skip = 0,
  limit = 100,
  order_by = "is_done",
  desc = false
) => http.get("/projects/" + projectID + "/tasks", {
  params: {
    skip,
    limit,
    order_by,
    desc
  }
})

const updateTask = (
  ID,
  name,
  description,
  deadline,
  isDone,
  color

) => http.patch("/tasks/" + ID, {
  description,
  deadline,
  name,
  is_done: isDone,
  color
})

const deleteTask = (ID) => http.delete("/tasks/" + ID)

const moveTask = (ID, projectID) => http.post(`/tasks/${ID}/move/${projectID}`)

export {
  addTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  moveTask
}
