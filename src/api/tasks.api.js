import http from "./axios"

const addTask = (name, projectID, description, deadline) => http.post("/tasks/", {
    name,
    project_id: projectID,
    description,
    deadline
})

const getTasksByProject = (
  projectID,
  skip = 0,
  limit = 100,
  order_by = "is_done",
  desc = false
) => http.get("/tasks/project/" + projectID, {
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
  isDone

) => http.patch("/tasks/" + ID, {
  description,
  deadline,
  name,
  is_done: isDone
})

const deleteTask = (ID) => http.delete("/tasks/" + ID)

export {
  addTask,
  getTasksByProject,
  updateTask,
  deleteTask
}
