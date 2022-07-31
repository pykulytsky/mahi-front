import http from "./axios"


const updateProject = (
    projectID,
    name,
    description,
    icon,
    accentColor,
    isFavorite,
    isPinned,
    isEditable

) => http.patch("/projects/" + projectID, {
    name,
    description,
    icon,
    accent_color: accentColor,
    is_favorite: isFavorite,
    is_pinned: isPinned,
    is_editable: isEditable
})

const deleteProject = (ID) => http.delete("/projects/" + ID)

const fetchActivity = () => http.get("/users/me/activities")

export {
    updateProject,
    deleteProject,
    fetchActivity
}
