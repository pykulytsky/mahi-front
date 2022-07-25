import http from "./axios"


const fetchTags = () => http.get("/tags")

const fetchUserTags = () => http.get("/tags/user/")

const addTag = (tagID, taskID) => http.post("/tag_items", {
    tag_id: tagID,
    task_id: taskID
})

export {
    fetchTags,
    fetchUserTags,
    addTag
}
